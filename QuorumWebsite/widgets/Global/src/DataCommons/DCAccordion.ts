import { TextInputField } from '../UiKit/atoms/textFields/textFields';
import { loggedMethod } from '../util/decorators';
import { AdditionalTypes, createElement } from '../util/helper';
import { DCAccordionItem } from './DCAccordionItem';
import { DC_API_VAR_GROUP_INFO } from './DCUrls';

// Define the properties expected for an accordion
interface AccordionProps {
  uniqueId: string;
  id: string;
  json: any;
  callbackLeaf: (value: unknown, variableName: string, buttonType: 'folder' | 'file') => void;
  filterCallback: (value: string) => void;
}

const CHILD_STAT_VARS = 'childStatVars';
const CHILD_STAT_VAR_GROUPS = 'childStatVarGroups';
const ROOT = 'Root';
const DESCENDENT_STAT_VAR_COUNT = 'descendentStatVarCount';
const PARENT_STAT_VAR_GROUPS = 'parentStatVarGroups';
const STAT_VARS = 'statVars';
const STAT_VAR_GROUPS = 'statVarGroups';

export class DCAccordion {
  root: HTMLElement;
  breadcrumb: HTMLElement;
  uniqueId: string;
  id: string;
  data: any;
  callbackLeaf: (value: unknown, variableName: string, buttonType: 'folder' | 'file') => void;
  pathArray: string[] = [];
  cache: Cache;
  dcVariables: string[];

  //filter stuff
  filterDataDiv: HTMLDivElement & AdditionalTypes;
  filterDataInput: TextInputField;
  filteredData: any;
  filterCallback: (value: string) => void;


  //make selectedBranches have key with name and level
  selectedBranches: { [key: string]: { name: string, level: number, urlPath: string } } = {};

  filterDiv: HTMLDivElement & AdditionalTypes;
  accordionDiv: HTMLUListElement & AdditionalTypes;
  outerMostDiv: HTMLDivElement & AdditionalTypes;

  wasSearched: boolean = false;
  /**
    *
   * Constructs an accordion.
   * @param {AccordionProps} props - Accordion properties, including uniqueId, id, json, callbackLeaf.
   */
  constructor(props: AccordionProps) {
    // Extract properties from the props object
    const { uniqueId, id, json, callbackLeaf, filterCallback } = props;

    // Set unique ID, ID and data
    this.uniqueId = uniqueId;
    this.id = id;
    this.data = json;
    this.callbackLeaf = callbackLeaf;
    this.filterDataDiv = this.createSearchFilterInput();
    this.filteredData = this.data;
    this.cache = new Cache();
    this.filterCallback = filterCallback;

    // Create root element for the accordion with specific styles
    this.root = createElement('div', {
      addClass: ['accordion'],
      uniqueIdPrefix: this.uniqueId,
      id: this.id,
      role: 'tree',
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
      },
    });

    this.root.appendChild(this.filterDataDiv);

    // Create breadcrumb element and append it to the root
    this.breadcrumb = createElement('div', {
      addClass: ['breadcrumb'],
      ariaLabel: 'breadcrumb',
      addStyle: {
        marginBottom: '10px',
      },
      //onfocus if pressing enter go to the first item in the breadcrumb
      onkeydown: (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const firstItem = this.breadcrumb.querySelector('.bread-item') as HTMLElement;
          if (firstItem) {
            firstItem.focus();
          }
        }
      },
      appendTo: this.root,
    });

    this.filterDiv = createElement('div', {
      // addClass: ['filter-div'],
      uniqueIdPrefix: this.uniqueId,
      id: 'filter-div',
      role: 'region',
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    });

    this.accordionDiv = createElement('ul', {
      uniqueIdPrefix: this.uniqueId,
      id: 'accordion-div',
      role: 'tree',
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '1000px',
        overflow: 'auto',
        margin: '0',
        padding: '0',
      },
    });

    // Append the filter and the accordion items to their respective divs
    this.filterDiv.appendChild(this.filterDataDiv);
    this.accordionDiv.appendChild(this.breadcrumb);

    // Create home breadcrumb and add a click event to it
    createElement('button', {
      id: 'breadcrumbHome',
      uniqueIdPrefix: this.uniqueId,
      addClass: ['breadHome-item'],
      textContent: 'MAIN MENU',
      onclick: () => {
        while (this.accordionDiv.firstChild) {
          this.accordionDiv.removeChild(this.accordionDiv.firstChild);
        }
        this.pathArray = [];
        this.filterDataInput.input.value = '';
        this.breadcrumb.style.display = 'none';
        //place the filterDataDiv before the accordionDiv
        this.root.insertBefore(this.filterDiv, this.breadcrumb);
        this.filterDiv.style.display = 'flex';
        this.filteredData = this.data;  // reset filteredData
        this.selectedBranches = {};
        this.generateAccordion(this.filteredData);
      },
      appendTo: this.breadcrumb,
    });

    this.breadcrumb.style.display = 'none';
  }

  showMainMenu(): void {
    // Remove all child elements from the root
    while (this.accordionDiv.firstChild) {
      this.accordionDiv.removeChild(this.accordionDiv.firstChild);
    }
    // Show the main menu
    this.breadcrumb.style.display = 'none';
    this.filteredData = this.data;  // reset filteredData
    this.selectedBranches = {};
    this.generateAccordion(this.filteredData);
  }

  createSearchFilterInput(): HTMLDivElement & AdditionalTypes {
    const searchData = createElement('div',
      {
        id: 'contentDiv',
        uniqueIdPrefix: this.id,
        addClass: 'dc-searchDataDiv',
      });

    this.filterDataInput = new TextInputField({ labelText: "Search", type: "text", uniqueIdPrefix: this.id, id: "searchData", placeholder: "Enter text here", size: 'sm' });
    this.filterDataInput.input.style.width = '95%';
    this.filterDataInput.container.style.width = '95%';
    this.filterDataInput.changeLabelClass('typo_title-title5');

    const filterInput = throttle(() => {
      if (this.filterDataInput.input.value === '') {
        this.showMainMenu();
      } else {
        this.accordionDiv.innerHTML = '';
        this.breadcrumb.style.display = 'flex';
        this.filterCallback(this.filterDataInput.input.value);
      }
    }, 1000);


    this.filterDataInput.input.oninput = () => {
      this.wasSearched = true;
      filterInput();
    }

    this.filterDataInput.render(searchData);

    return searchData;
  }

  filterJsonData(data: any, searchText: string): any {
    if (typeof data === 'object') {
      const result: any = {};
      for (const key in data) {
        const value = data[key];
        if (key.includes(searchText) || (typeof value === 'string' && value.includes(searchText))) {
          result[key] = value;
        } else {
          const filteredChild = this.filterJsonData(value, searchText);
          if (filteredChild !== null) {
            result[key] = filteredChild;
          }
        }
      }
      return Object.keys(result).length > 0 ? result : null;
    } else {
      return (typeof data === 'string' && data.includes(searchText)) ? data : null;
    }
  }

  generateAccordion(json?: any): void {
    json = this.processJSON(json);
    const keys = Object.keys(json);
    this.clearBreadcrumb();
    this.findParentValues(json);
    this.createBreadcrumbItems();
    this.createAccordionItems(keys, json);
  }

  processJSON(json?: any): any {
    if (!json) {
      json = this.filteredData;
    }

    if (json.absoluteName) {
      delete json.absoluteName;
    }
    return json;
  }

  clearBreadcrumb(): void {
    const firstChild = this.breadcrumb.firstChild;
    while (this.breadcrumb.lastChild && this.breadcrumb.lastChild !== firstChild) {
      this.breadcrumb.removeChild(this.breadcrumb.lastChild);
    }
  }

  createBreadcrumbItems(goTo: boolean = false): void {
    const breadcrumbItems: any[] = [];

    const entries = Object.entries(this.selectedBranches);
    console.log(this.selectedBranches)
    Object.entries(this.selectedBranches).forEach(([key, value], index) => {
      const isLastItem = index === entries.length - 1;
      const btn = createElement('button', {
        addStyle: {
          border: 'none',
          background: 'none',
          padding: '0',
          cursor: 'pointer',
        },
        addClass: ['breadcrumb-item'],
        textContent: value.name.toString(),
        onclick: () => {
          const level = value.level;
          Object.keys(this.selectedBranches).forEach(key => {
            if (this.selectedBranches[key].level > level) {
              delete this.selectedBranches[key];
            }
          });
          const urlPath = this.selectedBranches[key].urlPath;
          this.returnWithParentUrl(urlPath);
        },
        appendTo: this.breadcrumb,
      });

      if (isLastItem) {
        btn.setAttribute('aria-current', 'true');
      }

      breadcrumbItems.push(btn);
    });

    if (goTo) {
      const lastBreadcrumbItem = breadcrumbItems[breadcrumbItems.length - 1];
      if (lastBreadcrumbItem) {
        lastBreadcrumbItem.click();
      }
    }
  }


  @loggedMethod
  createAccordionItems(keys: string[], json: any): void {
    for (const key of keys) {
      const itemData = json[key];
      let item: DCAccordionItem;

      switch (key) {
        case CHILD_STAT_VARS:
          for (const statVar in itemData) {
            if (itemData[statVar].hasData) {
              item = this.createAccordionItem(key, itemData[statVar], 'file');
              this.accordionDiv.appendChild(item.element);
            }
          }
          break;
        case STAT_VARS:
          for (const statVar in itemData) {
            item = this.createAccordionItem(key, itemData[statVar], 'file');
            this.accordionDiv.appendChild(item.element);
          }
          break;
        case CHILD_STAT_VAR_GROUPS:
          for (const statVar in itemData) {
            if (itemData[statVar].descendentStatVarCount !== undefined && itemData[statVar].descendentStatVarCount > 0) {
              item = this.createAccordionItem(key, itemData[statVar], 'folder');
              this.accordionDiv.appendChild(item.element);
            }
          }
          break;
        case STAT_VAR_GROUPS:
          for (const statVar in itemData) {
            item = this.createAccordionItem(key, itemData[statVar], 'folder');
            this.accordionDiv.appendChild(item.element);
          }
          break;
        case ROOT:
          item = this.createAccordionItem(key, itemData, 'folder');
          this.accordionDiv.appendChild(item.element);
          break;
        case DESCENDENT_STAT_VAR_COUNT:
        case PARENT_STAT_VAR_GROUPS:
          //do nothing 
          break;
      }
    }
    const firstLi = this.accordionDiv.querySelector('li');
    if (firstLi) {
      firstLi.setAttribute('tabindex', '0');
      firstLi.focus();
    }

  }

  createAccordionItem(key: string, itemData: any, itemType: 'folder' | 'file'): DCAccordionItem {
    let itemDisplayName: string;
    if (key === ROOT) {
      itemDisplayName = 'Racine';
    } else {
      itemDisplayName = itemData.specializedEntity || itemData.displayName || itemData.name;
    }

    if (itemType === 'folder') {
      itemDisplayName += ` (${itemData.descendentStatVarCount})`;
    }

    return new DCAccordionItem(this.uniqueId, itemDisplayName, itemData, undefined, [key], this, this.callbackLeaf, itemType);
  }

  removeRepeatedPrefixes(pathArray: string[]): string[] {
    let previousItem = '';
    return pathArray.map(item => {
      let newItem = item;
      if (item.startsWith(previousItem)) {
        newItem = item.slice(previousItem.length);
      }
      previousItem = item;
      return newItem;
    });
  }

  findParentValues(json: any): void {
    if (Object.prototype.hasOwnProperty.call(json, 'parentStatVarGroups')) {

      //never add the value of 'dc/g/Root' to the path
      const parentGroup = json.parentStatVarGroups.filter((item: string) => item !== 'dc/g/Root');
      this.pathArray.push(...parentGroup);
    }

    for (const key in json) {
      if (json[key] instanceof Object) {
        this.findParentValues(json[key]);
      }
    }
  }

  async fetchDataFromUrl(url: string, data: any) {
    // Create a URL object
    const urlObject = new URL(url);

    // Initialize URLSearchParams object
    const params = new URLSearchParams();

    // Iterate through each key-value pair in the data object
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        // If value is an array, append multiple values with the same key
        value.forEach(item => {
          params.append(key, item);
        });
      } else {
        // Otherwise, append the single key-value pair
        params.append(key, value);
      }
    }

    // Set the search parameters to the URL object
    urlObject.search = params.toString();

    // Fetch data
    const response = await fetch(urlObject.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) { throw response; }

    // Continue with your code to handle the response, e.g., convert it to JSON
    const jsonData = await response.json();
    return jsonData;
  }


  async getData(dcid: string, entities: string[]) {
    const data = {
      dcid: `dc/g/${dcid}`,
      entities: entities
    };
    const cacheKey = JSON.stringify(data);

    if (!this.cache.has(cacheKey)) {
      try {
        try {
          const data_1 = await this.fetchDataFromUrl(DC_API_VAR_GROUP_INFO, data);
          const result = { [dcid]: data_1 };
          this.cache.set(cacheKey, result);
          return result;
        } catch (error) {
          console.log("There was an error fetching data.");
          console.log(error);
          return await Promise.reject(new Error("There was an error fetching data."));
        }
      } catch (error) {
        console.log("There was an error fetching data.");
        console.log(error);
        // We return a rejected Promise here so that the error can be handled properly where the function is called.
        return Promise.reject(new Error("There was an error fetching data."));
      }
    } else {
      return Promise.resolve(this.cache.get(cacheKey));
    }
  }


  async updateUI(url: string) {
    const new_var = url.split("/").slice(-1)[0];
    while (this.accordionDiv.firstChild) {
      this.accordionDiv.removeChild(this.accordionDiv.firstChild);
    }
    this.root.insertBefore(this.breadcrumb, this.accordionDiv);
    const data = await this.getData(new_var, ["geoId/5566000"]);
    this.generateAccordion(data[new_var]);
  }

  returnWithParentUrl(url: string) {
    if (url.startsWith("dc/g/")) {
      const dcids = url.split("/").slice(-1);
      const requests = dcids.map(async dcid => {
        return this.getData(dcid, ["geoId/5566000"]);
      });
      Promise.all(requests).then(() => {
        this.updateUI(url);
      });
    }
  }
  // Method to render the accordion by appending it to a parent element
  render(parent: HTMLDivElement & AdditionalTypes): void {
    this.outerMostDiv = parent;
    this.root.appendChild(this.filterDiv);
    this.root.appendChild(this.accordionDiv);
    parent.appendChild(this.root);
  }
}

// Define the Cache class
export class Cache {
  store: { [key: string]: any; } = {};

  get(key: string): any {
    return this.store[key];
  }

  set(key: string, value: any): void {
    this.store[key] = value;
  }

  has(key: string): boolean {
    return key in this.store;
  }
}


function throttle(func, delay) {
  let timeoutId;
  let lastExec = 0;

  function wrapper(...args) {
    const elapsed = Date.now() - lastExec;

    const execFunc = () => {
      lastExec = Date.now();
      return func(...args);
    };

    clearTimeout(timeoutId);

    if (elapsed > delay) {
      return execFunc();
    } else {
      timeoutId = setTimeout(execFunc, delay - elapsed);
    }
  }

  return wrapper;
}
