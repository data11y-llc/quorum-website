import { quorumChart } from '../AccessCharts/chartControls';
import { Button } from '../UiKit/atoms/buttons/buttons';
import { Header } from '../UiKit/molecules/header/header';
import { loggedMethod } from '../util/decorators';
import {
  AdditionalTypes,
  createElement,
  updateElement,
} from '../util/helper';
import { Cache, DCAccordion } from './DCAccordion';
import { TableAndChart } from './TableAndChart';
import { DataCommonsFetch } from './DataFetcher';
import { SeriesEntry } from './types';
import { helpIcon } from '../UiKit/atoms/icons/icons';
import { instructionsText } from './instructionText';
import { DC_API_VAR_GROUP_INFO } from './DCUrls';

export interface DataCommonsInterface {
  id: string;
}

export interface DCSelectedValues {
  url: string;
  dcid: string;
  series: SeriesEntry[];
  date: string;
  variableName: string;
}

export class DataCommons {
  id: string;
  mainContainer: HTMLDivElement;
  header: Header;

  /* this will split the accordian and csv content */
  contentContainer: HTMLDivElement;

  /* this will contain the accordian */
  leftAccordianContainer: HTMLDivElement;
  accordian: DCAccordion;

  /* this will contain the csv */
  rightDataContainer: HTMLDivElement;
  cache: Cache;

  /*csv variable button container */
  csvVariableButtonContainer: HTMLDivElement;

  /*variable header container */
  variableHeaderContainer: HTMLDivElement;

  /*csv table */
  csvTableContainer: HTMLDivElement;

  /* hold variables from the chosen accordian
   * make an objectthat holds the dcid and the output
   * */
  dcVariables: DCSelectedValues[] = [];
  formattedData: object;

  //quorum chart stuff
  quorumUiContainer: HTMLDivElement;
  quorumChart: quorumChart;
  quorumOuterUiContainer: HTMLDivElement & AdditionalTypes;

  entities: string[] = ['geoId/5566000'];

  tableAndChart: TableAndChart;
  dataCommonsFetch: DataCommonsFetch;

  //self tip: needs to initialize the properties for the code to work
  currentSelectedVariable: { dcid: string, variableName: string } = { dcid: '', variableName: '' };

  constructor({ id }: DataCommonsInterface) {
    this.id = id;

    const mainContainerEl = document.getElementById(id);

    if (!mainContainerEl) {
      throw new Error(`Element with id ${id} not found`);
    }

    // usage
    this.cache = new Cache();


    this.mainContainer = updateElement(mainContainerEl, {
      id: this.id,
      tabIndex: 0,
      updateClass: 'dc-main-container',
      addStyle: {},
    }) as HTMLDivElement;

    //create header
    this.header = new Header({
      theme: 'light',
      uniqueId: this.id,
      title: 'Data Commons',
    });

    this.header.settingsButton.getElement().style.display = 'none';
    const helperButton = new Button({ title: "Instructions", icon: helpIcon, className: 'btn-icon', id: 'helperButton', uniqueIdPrefix: this.id });
    helperButton.getElement().ariaLabel = "Show Instructions";
    const iconButtonSize = 30
    helperButton.getElement().style.height = iconButtonSize + 'px';
    helperButton.getElement().style.width = iconButtonSize + 'px';

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(helpIcon, 'image/svg+xml');

    // Change path fill color
    const paths = svgDoc.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      path.setAttribute('fill', '#000000');
    });

    // Change SVG width and height
    const svgElement = svgDoc.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute('width', iconButtonSize.toString());
      svgElement.setAttribute('height', iconButtonSize.toString());
    }

    const serializer = new XMLSerializer();
    const newSvgStr = serializer.serializeToString(svgDoc.documentElement);

    helperButton.getElement().innerHTML = newSvgStr;

    helperButton.onClick(() => {
      this.handleResetButtonClick();
    });

    this.header.rightSettings.appendChild(helperButton.getElement());
    this.header.render(this.mainContainer);

    //create content container with the left and right container
    this.contentContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'contentContainer',
      addStyle: {},
      addClass: 'dc-content-container',
      appendTo: this.mainContainer,
    });

    //create left accordian container
    this.leftAccordianContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'accordianContainer',
      addClass: 'dc-accordian-container',
      appendTo: this.contentContainer,
    });

    //create the right container containing the table and chart
    this.rightDataContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'csvContainer',
      addClass: 'dc-right-container',
      appendTo: this.contentContainer,
    });

    this.variableHeaderContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'variableHeaderContainer',
      addClass: 'dc-variable-header-container',
      appendTo: this.rightDataContainer,
    });

    //create the table container
    this.csvTableContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'csvTableContainer',
      addClass: 'dchidden',
      appendTo: this.rightDataContainer,
    });

    //create the quorum chart
    this.quorumChart = new quorumChart();
    this.quorumChart.uniqueId = this.id;

    this.quorumOuterUiContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'quorumOuterUiContainer',
      addClass: ['QuorumOuterUIContainer', 'datacommons', 'dchidden'],
      appendTo: this.rightDataContainer,
    });

    this.quorumUiContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'graphicContainer',
      addClass: ['QuorumUIContainer', 'datacommons', 'dchidden'],
      appendTo: this.quorumOuterUiContainer,
    });

    this.quorumChart.graphicContainer = this.quorumUiContainer;

    //create the csv button container
    this.csvVariableButtonContainer = createElement('div', {
      uniqueIdPrefix: this.id,
      id: 'csvVariableButtonContainer',
      addClass: ['csvVariableButtonContainer', 'dchidden'],
      appendTo: this.rightDataContainer,
    });

    this.tableAndChart = new TableAndChart(this.id, this.csvTableContainer, this.csvVariableButtonContainer, this.variableHeaderContainer, this.quorumChart);
    this.dataCommonsFetch = new DataCommonsFetch(this.tableAndChart, this);
    this.createInstructions();
    this.createInitialRequests();
  }

  @loggedMethod
  createInstructions() {
    // Clear the old instructions
    const instructionsContainerOld = document.querySelector('.dc-instructions');
    if (instructionsContainerOld)
      instructionsContainerOld.innerHTML = '';

    // Create the instructions container
    const instructionsContainer = document.createElement('div');
    instructionsContainer.id = this.id + 'instructions';
    instructionsContainer.classList.add('dc-instructions');
    instructionsContainer.setAttribute('role', 'region');
    instructionsContainer.setAttribute('aria-label', 'Instructions');

    // Create the instructions heading
    const instructionsHeading = document.createElement('h2');
    instructionsHeading.textContent = 'Instructions';
    instructionsContainer.appendChild(instructionsHeading);

    // Create the instructions text
    const instructionsTextEl = document.createElement('p');
    instructionsTextEl.style.whiteSpace = 'pre-wrap';
    instructionsTextEl.textContent = instructionsText;
    instructionsContainer.appendChild(instructionsTextEl);

    // Append the instructions container to the main container
    this.rightDataContainer.appendChild(instructionsContainer);
  }

  createInitialRequests() {
    const dcids = ['Root'];

    //for each dcid, perform a request
    const requests = dcids.map(async (dcid) => {
      //body of the request
      const data = {
        dcid: `dc/g/${dcid}`,
        entities: this.entities,
      };

      // Define a unique key for this request, to be used in the cache
      const cacheKey = JSON.stringify(data);

      // Check if data for this request is already in cache
      if (!this.cache.has(cacheKey)) {
        try {
          const url = new URL(DC_API_VAR_GROUP_INFO);

          const params = new URLSearchParams({
            dcid: `dc/g/${dcid}`,
          });
          this.entities.forEach(entity => {
            params.append('entities', entity);
          });

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
          const responseData = await response.json(); //we only get here if there is no error
          // Associate each response with its corresponding dcid
          const result = { [dcid]: responseData };

          // Store the result in the cache
          this.cache.set(cacheKey, result);
          return result;
        } catch (error) {
          console.log('There was an error fetching data.');
          console.log(error);
        }
      } else {
        // Retrieve the result from the cache
        return Promise.resolve(this.cache.get(cacheKey));
      }
    });

    Promise.all(requests)
      .then((responses) => {
        //combine all reponses into one object
        const combinedData = responses.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
        return combinedData;
      })
      .then((data) => {
        // Initialize the accordian with the combined data
        this.accordian = new DCAccordion({
          id: 'dataCommonsList',
          uniqueId: this.id,
          json: data,
          callbackLeaf: (dcid, variableName, buttonType) => {
            if (typeof dcid === 'string') {
              if (buttonType === "file") {
                this.handleFileButtonClick();
              }

              this.dataCommonsFetch.fetchDCData(dcid, variableName, this.accordian, buttonType);
              this.currentSelectedVariable.variableName = variableName;
              this.currentSelectedVariable.dcid = dcid;
            }
          },
          filterCallback: (queryString) => {
            this.dataCommonsFetch.fetchDataWithQuery(queryString, this.accordian);
          },
        });
        this.accordian.generateAccordion();
        this.accordian.render(this.leftAccordianContainer);
      });

    this.formattedData = { "2000": { Header: 'value' } };
    this.tableAndChart.createTable(this.formattedData);
  }

  handleFileButtonClick() {
    const instructionDiv = document.getElementById(`${this.id}instructions`);
    const rightDivs = this.rightDataContainer.getElementsByTagName('div');

    if (instructionDiv) {
      instructionDiv.classList.add('dchidden');
    }

    // Convert HTMLCollection to array for easy iteration
    Array.from(rightDivs).forEach(div => {
      if (div !== instructionDiv) {
        div.classList.remove('dchidden');
      }
    });
  }

  handleResetButtonClick() {
    const instructionDiv = document.getElementById(`${this.id}instructions`);
    const rightDivs = this.rightDataContainer.getElementsByTagName('div');
    this.tableAndChart.quorumChart.Stop();

    if (instructionDiv) {
      instructionDiv.classList.remove('dchidden');
    }

    // Convert HTMLCollection to array for easy iteration
    Array.from(rightDivs).forEach(div => {
      if (div !== instructionDiv) {
        div.classList.add('dchidden');
      }
    });
  }
}

