import { Cache, DCAccordion } from './DCAccordion';
import { DCSelectedValues, DataCommons } from './DataCommons';
import { loggedMethod } from '../util/decorators';
import { TableAndChart } from './TableAndChart';
import { RootObject } from './types';
import { DC_API_VAR_GROUP_INFO, DC_STATS_VAR_SEARCH, DC_OBSERVATIONS_SERIES_ALL } from './DCUrls';

/**
 * Class representing a data fetch operation.
 */
export class DataCommonsFetch {
  cache: Cache;
  entities: string[] = ['geoId/5566000'];
  dcVariables: DCSelectedValues[] = [];
  tableAndChart: TableAndChart;
  dataCommons: DataCommons;


  constructor(tableAndChart: TableAndChart, dataCommons: DataCommons) {
    this.dataCommons = dataCommons;
    this.tableAndChart = tableAndChart;
    this.cache = new Cache();
  }

  @loggedMethod
  fetchDCData(dcid: string, variableName: string, accordion: DCAccordion, buttonType: 'folder' | 'file') {
    switch (buttonType) {
      case 'folder':
        this.fetchDataWithDcGroup(dcid, accordion);
        break;
      case 'file':
        this.fetchDataWithObservations(dcid, variableName);
        break;
      default:
        throw new Error('Invalid buttonType');
    }
  }

  //used for folders to get the next level of folders
  async fetchDataWithDcGroup(dcid: string, accordion: DCAccordion) {
    const lastDcidParts = this.getIdsFromDcid(dcid);
    const fetchPromises = lastDcidParts.map(async (dcid) => {
      const data = this.getDataForDcGroupRequest(dcid);
      const cacheKey = JSON.stringify(data);

      if (!this.cache.has(cacheKey)) {
        try {
          const requestResult = await this.makeDcGroupRequest(data, dcid);
          return requestResult;
        } catch (error) {
          console.log('There was an error fetching data.');
          console.log(error);
        }
      } else {
        return Promise.resolve(this.cache.get(cacheKey));
      }
    });

    Promise.all(fetchPromises).then((responses) => {
      const responseKey = dcid.split('/').slice(-1);
      accordion.generateAccordion({ ...responses[0][responseKey] });
    });
  }

  @loggedMethod
  async fetchDataWithQuery(variable: string, accordion: DCAccordion) {
    //make variable work with spaces
    variable = variable.replace(/ /g, '%20');

    const url = new URL(DC_STATS_VAR_SEARCH);

    const params = new URLSearchParams({
      query: variable,
      places: 'geoId/5566000',
    });

    url.search = params.toString();

    const response = await fetch(url.toString());
    const responseData = await response.json();

    accordion.generateAccordion({ ...responseData });
  }


  //used for file buttonTypes, leaf nodes
  fetchDataWithObservations(dcid: string, variableName: string): void {
    const url = this.getObservationsUrl(dcid);
    const cacheKey = url;

    /** @param data - the csv object returned from the fetch */
    const processDataAndVisualize = (data: RootObject) => {
      const processedData = this.processData(data, dcid, variableName);
      this.tableAndChart.createHeader(variableName);
      this.tableAndChart.createCSV(processedData.series);
      this.tableAndChart.createTable(processedData.series);
      this.tableAndChart.createQuorumGraph(variableName);
      this.tableAndChart.createAddToCSVFilterButton(variableName, processedData.series, dcid);
    };

    if (!this.cache.has(cacheKey)) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.cache.set(cacheKey, data);
          processDataAndVisualize(data as RootObject);
        });
    } else {
      const data = this.cache.get(cacheKey) as RootObject;
      processDataAndVisualize(data);
    }
  }


  getIdsFromDcid(dcid: string) {
    return dcid.split('/').slice(-1);
  }

  getDataForDcGroupRequest(dcid: string) {
    return {
      dcid: `dc/g/${dcid}`,
      entities: this.entities,
    };
  }

  async makeDcGroupRequest(data: { dcid: string, entities: string[] }, dcid: string) {
    // Create a URL object
    const url = new URL(DC_API_VAR_GROUP_INFO);

    // Initialize URLSearchParams object
    const params = new URLSearchParams({
      dcid: data.dcid,
    });

    // If you have an array, you can append multiple values with the same key (entities in this case)
    data.entities.forEach(entity => {
      params.append('entities', entity);
    });

    // Set the search parameters to the URL object
    url.search = params.toString();

    // Fetch data
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw response;
    }

    const json = await response.json();
    const data_1 = json;

    // Associate each response with its corresponding dcid
    const result_1 = { [dcid]: data_1 };

    // Store the result in the cache
    this.cache.set(JSON.stringify(data), result_1);

    return result_1;
  }

  getObservationsUrl(dcid: string) {
    const url = new URL(DC_OBSERVATIONS_SERIES_ALL);

    const params = new URLSearchParams({
      entities: 'geoId/5566000',
      variables: dcid,
    });

    url.search = params.toString();

    return url.toString();
  }

  @loggedMethod
  processData(data: RootObject, dcid: string, variableName: string): DCSelectedValues {
    const seriesArray = data.data[dcid]['geoId/5566000'];

    if (seriesArray.length === 0) {
      throw new Error('No data to process');
    }

    const firstSeries = seriesArray[0];
    const combinedData = firstSeries.series.reduce((acc: { [x: string]: any; date: string; }[], item) => {
      const existingItemIndex = acc.findIndex((accItem) => accItem.date === item.date);
      if (existingItemIndex > -1) {
        // If the date already exists in the accumulated array, add the current value to it
        acc[existingItemIndex][variableName] = item.value;
      } else {
        // If the date does not exist, create a new object with the date and current value
        acc.push({ date: item.date, [variableName]: item.value });
      }
      return acc;
    }, []);

    const url = new URL(DC_OBSERVATIONS_SERIES_ALL);

    const params = new URLSearchParams({
      entities: 'geoId/5566000',
      variables: dcid,
    });

    url.search = params.toString();

    const urlString = url.toString();
    console.log(urlString);

    const existingDataIndex = this.dcVariables.findIndex((dcVariable) => dcVariable.url === urlString);


    if (existingDataIndex === -1) {
      // If the data doesn't exist, add it and return it
      const newData = {
        url: urlString,
        variableName,
        dcid,
        series: combinedData,
      } as DCSelectedValues;
      this.dcVariables.push(newData);
      return newData;
    } else {
      this.dcVariables[existingDataIndex].series = combinedData;
      return this.dcVariables[existingDataIndex];
    }
  }
}

