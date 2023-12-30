import { UiKitColors } from '../../../util/UiKit';
import { AdditionalTypes, createElement, updateElement } from '../../../util/helper';
import { Button } from '../buttons/buttons';
import { TextInputField } from '../textFields/textFields';

// Define the properties expected for an accordion
interface AccordionProps {
  uniqueId: string;
  id: string;
  json: any;
  callbackLeaf: (value: unknown) => void;
}

// Class defining an accordion
export class Accordion {
  root: HTMLElement;
  breadcrumb: HTMLElement;
  uniqueId: string;
  id: string;
  data: any;
  path: string[] = [];
  callbackLeaf: (value: unknown) => void;
  filterDataDiv: HTMLDivElement & AdditionalTypes;
  filterDataInput: TextInputField;
  filteredData: any;


  isHome: boolean = true;

  // Constructor for the accordion
  constructor(props: AccordionProps) {
    // Extract properties from the props object
    const { uniqueId, id, json, callbackLeaf } = props;

    // Set unique ID, ID and data
    this.uniqueId = uniqueId;
    this.id = id;
    this.data = json;
    this.callbackLeaf = callbackLeaf;
    this.filterDataDiv = this.createInputContent();
    this.filteredData = this.data;

    // Create root element for the accordion with specific styles
    this.root = createElement('div', {
      addClass: ['accordion'],
      uniqueIdPrefix: this.uniqueId,
      id: this.id,
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    });

    this.root.appendChild(this.filterDataDiv);

    // Create breadcrumb element and append it to the root
    this.breadcrumb = createElement('div', {
      addClass: ['breadcrumb'],
      addStyle: {
        marginBottom: '10px',
      },
    });
    this.root.appendChild(this.breadcrumb);

    // Create home breadcrumb and add a click event to it
    const homeBreadcrumbItem = createElement('button', {
      addClass: ['breadHome-item'],
      textContent: 'MAIN MENU',
    });

    homeBreadcrumbItem.addEventListener('click', () => {
      while (this.root.firstChild) {
        this.root.removeChild(this.root.firstChild);
      }
      this.filterDataInput.input.value = '';
      this.root.appendChild(this.filterDataDiv);
      this.filteredData = this.data;  // reset filteredData
      this.createItem(this.filteredData, []);
      this.isHome = true;
    });

    this.breadcrumb.appendChild(homeBreadcrumbItem);

    if (this.isHome) {
      //hide the breadcrumb
      this.breadcrumb.style.display = 'none';
    }

  }

  createInputContent(): HTMLDivElement & AdditionalTypes {

    const searchData = createElement('div',
      {
        id: 'contentDiv',
        uniqueIdPrefix: this.id,
        addStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '10px',
          boxSizing: 'border-box',
        }
      });

    this.filterDataInput = new TextInputField({ labelText: "Search", type: "text", uniqueIdPrefix: this.id, id: "searchData", placeholder: "Enter text here", size: 'sm' });
    this.filterDataInput.input.style.width = '90%';
    this.filterDataInput.changeLabelClass('typo_title-title5');

    const submitContent = new Button({ className: 'btn-xsmall-primary-var1', text: "Filter", disabled: false, uniqueIdPrefix: this.id, id: "submitContent" });
    updateElement(submitContent.button, { addStyle: { marginLeft: '5px', marginTop: '20px', minWidth: '30px', width: 'fit-content', padding: '10px 12px', borderRadius: '4px' } });

    submitContent.button.addEventListener('click', () => {
      const value = this.filterDataInput.input.value;
      this.filteredData = this.filterData(this.data, value);
      console.log(this.filteredData);
      // Clear the current view
      while (this.root.firstChild) {
        this.root.removeChild(this.root.firstChild);
      }
      // Re-render with the filtered data
      this.root.appendChild(this.filterDataDiv);
      this.createItem(this.filteredData, []);
    });

    this.filterDataInput.render(searchData);
    submitContent.render(searchData);

    return searchData;
  }


  filterData(data: any, searchText: string) {
    if (typeof data === 'object') {
      const result: any = {};
      for (const key in data) {
        const value = data[key];
        if (key.includes(searchText) || (typeof value === 'string' && value.includes(searchText))) {
          result[key] = value;
        } else {
          const filteredChild = this.filterData(value, searchText);
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

  // Method to create accordion items
  createItem(json?: any, path: string[] = []): void {
    if (!json) {
      json = this.filteredData;
    }

    const keys = Object.keys(json);
    keys.forEach(key => {
      const itemData = json[key];
      const item = new AccordionItem(key, itemData, key, 0, [...path, key], this, this.callbackLeaf);
      this.root.appendChild(item.element);
    });

    // Remove previous breadcrumb items except for the home breadcrumb
    const firstChild = this.breadcrumb.firstChild;
    while (this.breadcrumb.lastChild && this.breadcrumb.lastChild !== firstChild) {
      this.breadcrumb.removeChild(this.breadcrumb.lastChild);
    }

    // Create new breadcrumb items for the provided path
    path.forEach((item, index) => {
      createElement('button', {
        addStyle: {
          //only show the text not the style around the button
          border: 'none',
          background: 'none',
          padding: '0',
          cursor: 'pointer',
        },
        addClass: ['breadcrumb-item'],
        textContent: item,
        onclick: () => {
          this.navigateBackTo(index);
        },
        appendTo: this.breadcrumb,
      });
    });

    // Update the path of the accordion
    this.path = path;
  }

  // Method to navigate back to a specific index in the breadcrumb
  navigateBackTo(index: number): void {
    // Remove all elements from the root and then re-append the breadcrumb
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }
    this.root.appendChild(this.breadcrumb);

    // Recreate the accordion items for the breadcrumb path up to the specified index
    let breadcrumbJson = this.filteredData;  // use filteredData
    for (let i = 0; i <= index; i++) {
      if (breadcrumbJson && breadcrumbJson[this.path[i]]) {
        breadcrumbJson = breadcrumbJson[this.path[i]];
      } else {
        // Output an error message if the path does not exist in the data
        console.error(`Invalid path: ${this.path.slice(0, i + 1).join(' > ')}`);
        return;
      }
    }
    this.createItem(breadcrumbJson, this.path.slice(0, index + 1));
  }

  // Method to render the accordion by appending it to a parent element
  render(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }
}


export class AccordionItem {
  element: HTMLButtonElement;
  content: HTMLElement;
  childItems: AccordionItem[];
  callbackLeaf?: (value: unknown) => void;

  constructor(
    title: string,
    data: any,
    displayName: string,
    indentLevel: number = 0,
    path: string[] = [],
    accordion: Accordion,
    callbackLeaf: (value: unknown) => void
  ) {
    this.element = document.createElement('button');
    this.element.style.width = '100%';
    this.element.textContent = displayName || title;
    this.childItems = [];

    if (typeof data === 'object') {
      this.element.className = 'accordion-item-branch';
      const childContainer = document.createElement('div');
      childContainer.style.display = 'none';

      if (Array.isArray(data)) {
        // Handle AssetInfo arrays
        data.forEach((assetInfo, index) => {
          const item = new AccordionItem(
            `${assetInfo.name} (${index})`,
            assetInfo,
            assetInfo.name,
            indentLevel + 1,
            [...path, title],
            accordion,
            callbackLeaf
          );
          this.childItems.push(item);
          childContainer.appendChild(item.element);
        });
      } else {
        // Handle AssetCategory objects
        const keys = Object.keys(data);
        keys.forEach((key) => {
          const itemData = data[key];
          const item = new AccordionItem(
            key,
            itemData,
            key,
            indentLevel + 1,
            [...path, title],
            accordion,
            callbackLeaf
          );
          this.childItems.push(item);
          childContainer.appendChild(item.element);
        });
      }

      this.element.addEventListener('click', () => {
        while (accordion.root.firstChild) {
          accordion.root.removeChild(accordion.root.firstChild);
        }
        accordion.root.appendChild(accordion.breadcrumb);
        accordion.createItem(data, path);
        accordion.isHome = false;
        accordion.breadcrumb.style.display = 'flex';
      });

      this.element.appendChild(childContainer);
    } else {
      // Handle leaf nodes
      this.element.className = 'accordion-item-leaf';
      this.element.onclick = () => {
        if (callbackLeaf) {
          callbackLeaf(data);
        }
      };
    }

    this.element.style.marginLeft = `${indentLevel * 10}px`;
  }
}

