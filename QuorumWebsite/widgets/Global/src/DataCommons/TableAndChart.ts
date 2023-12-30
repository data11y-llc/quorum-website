import { quorumChart } from "../AccessCharts/chartControls";
import { ChartTypes } from "../AccessCharts/globals";
import { loggedMethod } from "../util/decorators";
import { LinkCSS, LoadScript } from "../util/helper";
import { QUORUM_CHARTS_CSS, QUORUM_CHARTS_JS, QUORUM_LOAD, QUORUM_STANDARD_LIBRARY } from "../util/versionNumbers";
import { ChooseDateContainer } from "./ChooseVariableDate";
import { DC_BULK_OBSERVATIONS_SERIES } from "./DCUrls";
import { DCSelectedValues } from "./DataCommons";
import { CityGeoId, GEO_IDS } from "./geoIds";
import { BulkFetchResponse } from "./types";

const CHUNK_SIZE = 125;

export class TableAndChart {
  id: string;
  csvTableContainer: HTMLDivElement;
  csvVariableButtonContainer: HTMLDivElement;
  variableHeaderContainer: HTMLDivElement;
  quorumChart: quorumChart;
  editFlag: boolean = false;
  variableDateFormat: "YYYY" | "YYYY-MM" | "YYYY-MM-DD" = "YYYY";
  dateInputContainer: HTMLDivElement;

  dateInput: HTMLInputElement;

  constructor(id: string, csvTableContainer: HTMLDivElement, csvVariableButtonContainer: HTMLDivElement, variableHeaderContainer: HTMLDivElement, quorumChart: quorumChart) {
    this.id = id;
    this.variableHeaderContainer = variableHeaderContainer;
    this.csvTableContainer = csvTableContainer;
    this.csvVariableButtonContainer = csvVariableButtonContainer;
    this.quorumChart = quorumChart;
  }

  @loggedMethod
  createTable(formattedData: any[]) {
    const tableWrapperOld = document.querySelector('.datacommons-table-wrapper');
    if (tableWrapperOld)
      tableWrapperOld.innerHTML = '';

    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('datacommons-table-wrapper');
    tableWrapper.style.borderTop = '1px solid black';
    tableWrapper.style.borderBottom = '1px solid black';
    tableWrapper.style.borderRight = '1px solid black';
    tableWrapper.style.borderRadius = '8px';
    tableWrapper.setAttribute('role', 'region');
    tableWrapper.setAttribute('aria-label', 'Data Table');

    const table = document.createElement('table');
    table.classList.add('datacommons-table');
    table.style.borderLeft = '1px solid black';
    table.style.borderCollapse = 'collapse'; // Add this line
    table.setAttribute('role', 'table');

    // Adding a caption to the table
    const caption = table.createCaption();
    caption.textContent = "Summary of the data";
    caption.classList.add('visually-hidden'); // Assuming you have a utility class to hide elements visually

    tableWrapper.appendChild(table);

    const thead = document.createElement('thead');
    thead.setAttribute('role', 'rowgroup');
    const headerRow = document.createElement('tr');
    headerRow.setAttribute('role', 'row');

    const dateHeader = document.createElement('th');
    dateHeader.textContent = 'Date';
    dateHeader.setAttribute('role', 'columnheader');
    dateHeader.setAttribute('scope', 'col'); // New attribute
    dateHeader.classList.add('datacommons-table-header');
    dateHeader.style.borderRight = '1px solid black';
    headerRow.appendChild(dateHeader);

    const variableNames = Object.keys(formattedData[0]).filter(key => key !== 'date');
    variableNames.forEach((variableName, index) => {
      const variableHeader = document.createElement('th');
      variableHeader.textContent = variableName;
      variableHeader.setAttribute('scope', 'col'); // New attribute
      variableHeader.classList.add('datacommons-table-header');
      if (index === variableNames.length - 1) {
        variableHeader.classList.add('no-right-border');
      }
      headerRow.appendChild(variableHeader);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('role', 'rowgroup');
    tbody.style.maxHeight = '50px'; // set a max height

    tbody.style.overflowY = 'auto'; // add overflowY

    formattedData.forEach((dataRow, rowIndex) => {
      const row = document.createElement('tr');
      row.classList.add('datacommons-table-row');
      row.setAttribute('role', 'row');

      const dateCell = document.createElement('td');
      dateCell.textContent = dataRow.date;
      dateCell.classList.add('datacommons-table-cell');
      dateCell.style.border = '1px solid black'; // Set border for cells
      if (rowIndex === 0) {
        dateCell.classList.add('no-top-border');
      }
      if (rowIndex === formattedData.length - 1) {
        dateCell.classList.add('no-bottom-border');
      }
      row.appendChild(dateCell);

      variableNames.forEach((variableName, cellIndex) => {
        const valueCell = document.createElement('td');
        valueCell.textContent = dataRow[variableName] !== undefined ? dataRow[variableName] : '';
        valueCell.classList.add('datacommons-table-cell');
        valueCell.style.border = '1px solid black';
        if (cellIndex === variableNames.length - 1) {
          valueCell.classList.add('no-right-border');
        }

        if (rowIndex === 0) {
          valueCell.classList.add('no-top-border');
        }

        // If it's the last row, remove bottom border
        if (rowIndex === formattedData.length - 1) {
          valueCell.classList.add('no-bottom-border');
        }

        // If it's the last cell, remove right border
        if (cellIndex === variableNames.length - 1) {
          valueCell.classList.add('no-right-border');
        }

        row.appendChild(valueCell);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    this.csvTableContainer.innerHTML = '';
    this.csvTableContainer.appendChild(tableWrapper);
  }

  @loggedMethod
  async createQuorumGraph(valueX: string, valueY?: string, valueZ?: string, factor1: string = "Date") {
    //remove the outer quotes from the parameters
    this.quorumChart.chartTitle = valueX
    valueX = valueX.replace(/"/g, '');
    valueX = valueX.replace(/,/g, '_');  // replace commas with underscores

    if (valueY) {
      valueY = valueY.replace(/"/g, '');
      valueY = valueY.replace(/,/g, '_');  // replace commas with underscores
    }

    if (valueZ) {
      valueZ = valueZ.replace(/"/g, '');
      valueZ = valueZ.replace(/,/g, '_');  // replace commas with underscores
    }

    factor1 = factor1.replace(/"/g, '');

    try {
      await LoadScript(QUORUM_LOAD);
      await LoadScript(QUORUM_STANDARD_LIBRARY);
      await LinkCSS(QUORUM_CHARTS_CSS);
      await LoadScript(QUORUM_CHARTS_JS);
      this.quorumChart.Stop();

      setTimeout(() => {
        this.quorumChart.createNewFrame();
        this.quorumChart.loadFrame();
        if (this.quorumChart.frame) {
          this.quorumChart.factor1 = factor1;
          this.quorumChart.valueX = valueX
          this.quorumChart.valueY = valueY;
          this.quorumChart.valueZ = valueZ;
          this.quorumChart.horizontalLayout = true;
          this.quorumChart.chartType = ChartTypes.LineChart;
          this.quorumChart.createChart();
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  createHeader(variableName: string) {
    this.variableHeaderContainer.innerHTML = '';
    // Create main header for variable name
    const variableHeader = document.createElement('h2');
    variableHeader.classList.add('datacommons-variable-header');
    variableHeader.textContent = variableName;
    variableHeader.setAttribute('role', 'heading');
    variableHeader.setAttribute('aria-level', '2');

    // Append the newly created header to the variableHeaderContainer
    this.variableHeaderContainer.appendChild(variableHeader);
  }


  @loggedMethod
  createCSV(formattedData: any[]) {
    formattedData = this.createYearlyAverageData(formattedData);
    // Create CSV headers
    const firstObject = formattedData[0];

    const originalHeaders = Object.keys(firstObject).filter(key => key !== 'date');
    const headersMapping = originalHeaders.reduce((map, header) => {
      const cleanedHeader = `"${String(header).replace(/"/g, '""').replace(/,/g, '_')}"`; // replace commas with underscores
      map[cleanedHeader] = header; // map cleaned header back to original header
      return map;
    }, {} as { [cleaned: string]: string });

    const headers = ['Date', ...Object.keys(headersMapping)];

    const csvRows = [headers.join(',')];

    // Create CSV rows
    formattedData.forEach((dataRow) => {
      const row = [
        dataRow.date,
        ...headers.slice(1).map((cleanedHeader) => {
          const originalHeader = headersMapping[cleanedHeader];
          return `"${String(dataRow[originalHeader] || '').replace(/"/g, '""')}"`;
        }),
      ];
      csvRows.push(row.join(','));
    });

    // Convert array to CSV
    const csvString = csvRows.join('\n');
    this.quorumChart.csvData = csvString;
  }

  @loggedMethod
  createYearlyAverageData(formattedData: any[]) {
    const yearlyData: any = {};
    const variableKeys = Object.keys(formattedData[0]).filter(key => key !== 'date');

    formattedData.forEach((data) => {
      const year = data.date.split('-')[0];  // split date string and get year part

      if (!yearlyData[year]) {
        yearlyData[year] = { date: year, count: 0, totalValue: 0 };
      }

      yearlyData[year].totalValue += data[variableKeys[0]];
      yearlyData[year].count++;
    });

    Object.keys(yearlyData).forEach(year => {
      yearlyData[year][variableKeys[0]] = yearlyData[year].totalValue / yearlyData[year].count;
      delete yearlyData[year].totalValue;
      delete yearlyData[year].count;
    });

    return Object.values(yearlyData);
  }

  @loggedMethod
  async makeDownloadableCSV(selectedVariables: DCSelectedValues[]) {
    console.log('makeDownloadableCSV');
    console.log(selectedVariables);
    // base API URL

    const dcidDateToVariableName = {};
    selectedVariables.forEach(item => {
      const key = `${item.dcid}-${item.date}`;
      dcidDateToVariableName[key] = item.variableName;
    });
    // Function to split array into chunks
    const chunkArray = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );

    const geoIdChunks = chunkArray(GEO_IDS, CHUNK_SIZE); // Split GEO_IDS into chunks

    const allData = []; // Store all data from all chunks here

    // Loop over each chunk
    for (const geoIdChunk of geoIdChunks) {
      const queryParams: string[] = [];

      geoIdChunk.forEach((geoId) => {
        const entityId = geoId.geoId.replace(/\//g, '%2F');
        queryParams.push(`entities=${entityId}`);
      });

      for (const variable of selectedVariables) {
        queryParams.push(`variables=${variable.dcid}`);
      }

      // Join all query parameters with '&' and prepend with '?'
      const queryString = "?" + queryParams.join('&');

      // Create the full URL by appending the query string
      const fullUrl = `${DC_BULK_OBSERVATIONS_SERIES}${queryString}`;

      const response = await fetch(fullUrl);
      const data = await response.json() as BulkFetchResponse;

      // Add this chunk's data to allData
      allData.push(...data.observationsByVariable);
    }


    const variableNames: string[] = [];
    const seriesData: { entity: { geoId: string, geoIdState: string, cityName: string, state: string }, variableData: { [variable: string]: { value: number, date: string } } }[] = [];

    allData.forEach(dataChunk => {
      dataChunk.observationsByEntity.forEach(observationsByEntity => {
        const entity = observationsByEntity.entity

        const matchingEntity = GEO_IDS.find(geoId => geoId.geoId === entity) as CityGeoId;

        let dataObj = seriesData.find(data => data.entity.geoId === entity);
        if (!dataObj) {
          dataObj = {
            entity: {
              geoId: matchingEntity.geoId,
              geoIdState: matchingEntity.geoIdState,
              cityName: matchingEntity.city,
              state: matchingEntity.state
            },
            variableData: {}
          };
          seriesData.push(dataObj);
        }

        if (observationsByEntity.seriesByFacet) {
          observationsByEntity.seriesByFacet.forEach(facet => {
            if (facet.series) {
              facet.series.forEach(item => {
                const date = item.date;
                const value = item.value;

                const key = `${dataChunk.variable}-${date}`;
                if (dcidDateToVariableName.hasOwnProperty(key)) {
                  dataObj.variableData[key] = { value, date };

                  const variableName = dcidDateToVariableName[key];
                  if (!variableNames.includes(variableName)) {
                    variableNames.push(variableName);
                  }
                }
              });
            }
          })
        }
      });
    });

    const headers = ['"Geo ID\'s"', '"Geo ID\'s State"', '"City Name"', '"State"', ...selectedVariables.map(variable => `"${variable.variableName}-${variable.date}"`)];

    // Initialize an array for CSV rows
    const csvRows = [];

    // Add headers to the csvRows
    csvRows.push(headers.join(','));
    // Generate each data row
    seriesData.forEach((data) => {
      const row = [];

      // Push entity data
      row.push(data.entity.geoId);
      row.push(data.entity.geoIdState);
      row.push(`"${data.entity.cityName}"`);  // wrap string data in quotes
      row.push(`"${data.entity.state}"`); // wrap string data in quotes

      // Push variable values (or empty string if not available for the entity)
      selectedVariables.forEach(variable => {
        const dcidDate = `${variable.dcid}-${variable.date}`;
        const variableData = data.variableData[dcidDate];
        row.push(variableData?.value ?? "");
      });

      csvRows.push(row.join(','));
    });


    // Join all rows by newline to get the final CSV string
    const csvString = csvRows.join('\n');

    const date = new Date()
    const todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    // Create a blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const objectURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', objectURL);
    link.setAttribute('download', `DataCommons-${todaysDate}-${currentTime}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  createAddToCSVFilterButton(variableName: string, formattedData: object[], dcid: string) {
    new ChooseDateContainer(this.id, this.csvVariableButtonContainer, this.variableDateFormat, variableName, formattedData, this, dcid);
  }
}


