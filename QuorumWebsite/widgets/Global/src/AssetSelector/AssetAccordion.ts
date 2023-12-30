import { AdditionalTypes, createElement } from '../util/helper';
import { TextInputField } from '../UiKit/atoms/textFields/textFields';
import { AssetInfo } from './assetJson';
import { UiKitColors } from '../util/UiKit';


// Define the properties expected for an accordion
interface AccordionProps {
  uniqueId: string;
  id: string;
  json: any;
  callbackLeaf: (json: AssetInfo[], assetType, category) => void
}

// Class defining an accordion
export class Accordion {
  root: HTMLElement;
  breadcrumb: HTMLElement;
  uniqueId: string;
  id: string;
  data: any;
  path: string[] = [];
  callbackLeaf: (json: AssetInfo[], assetType, category) => void;
  filterDataDiv: HTMLDivElement & AdditionalTypes;
  filterDataInput: TextInputField;
  filteredData: any;
  accordionDiv: HTMLUListElement & AdditionalTypes;
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
    // this.filterDataDiv = this.createInputContent();
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


    // Create breadcrumb element and append it to the root
    this.breadcrumb = createElement('div', {
      addClass: ['breadcrumb'],
      addStyle: {
        marginBottom: '10px',
      },
    });
    this.root.appendChild(this.breadcrumb);

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
      appendTo: this.root,
    });

    // Create home breadcrumb and add a click event to it
    const homeBreadcrumbItem = createElement('button', {
      addClass: ['breadHome-item'],
      textContent: 'MAIN MENU',
    });

    homeBreadcrumbItem.addEventListener('click', () => {
      while (this.accordionDiv.firstChild) {
        this.accordionDiv.removeChild(this.accordionDiv.firstChild);
      }
      this.filteredData = this.data;  // reset filteredData
      this.createItem(this.filteredData, []);
      this.isHome = true;
    });

    this.breadcrumb.appendChild(homeBreadcrumbItem);

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
      //get the first li from the accordionDiv and make it tabbable


      this.accordionDiv.appendChild(item.element);
    });

    this.accordionDiv.firstChild.tabIndex = 0;
    this.accordionDiv.firstChild.focus();

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
    while (this.accordionDiv.firstChild) {
      this.accordionDiv.removeChild(this.accordionDiv.firstChild);
    }

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
  element: HTMLLIElement;
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
    callbackLeaf: (json: AssetInfo[], assetType, category) => void
  ) {
    this.element = createElement('li', {
      addStyle: {
        width: '100%',
      },
      role: 'treeitem',
      textContent: displayName || title,
      type: 'button',
      ariaSelected: 'false',
    });

    this.element.addEventListener('keydown', (event) => {
      // Mark the current element as not tabbable

      let nextElement: HTMLElement | null = null;
      this.element.tabIndex = -1;

      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'ArrowRight':
          event.preventDefault();
          this.element.click();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          accordion.breadcrumb.firstChild.click();
          break;
        case 'ArrowDown':
          event.preventDefault();
          nextElement = this.element.nextSibling as HTMLElement;
          if (nextElement && nextElement.tagName === 'LI') {
            nextElement.tabIndex = 0;  // Make the next element tabbable
            nextElement.focus();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          nextElement = this.element.previousSibling as HTMLElement;
          if (nextElement && nextElement.tagName === 'LI') {
            nextElement.tabIndex = 0;  // Make the previous element tabbable
            nextElement.focus();
          }
          break;
        default:
          this.element.tabIndex = 0;
          break;
      }
    });


    if (typeof data === 'object' && path.length < 2) {
      this.element.className = 'accordion-item-branch';
      this.element.ariaLabel = `${this.element.textContent}, folder`;

      if (Array.isArray(data)) {
        // Handle AssetInfo arrays
        data.forEach((assetInfo, index) => {
          new AccordionItem(
            `${assetInfo.name} (${index})`,
            assetInfo,
            assetInfo.name,
            indentLevel + 1,
            [...path, title],
            accordion,
            callbackLeaf
          );
        });
      } else {
        // Handle AssetCategory objects
        const keys = Object.keys(data);
        keys.forEach((key) => {
          const itemData = data[key];
          new AccordionItem(
            key,
            itemData,
            key,
            indentLevel + 1,
            [...path, title],
            accordion,
            callbackLeaf
          );
        });
      }

      this.element.addEventListener('click', () => {
        while (accordion.accordionDiv.firstChild) {
          accordion.accordionDiv.removeChild(accordion.accordionDiv.firstChild);
        }
        accordion.createItem(data, path);
        accordion.isHome = false;
        accordion.breadcrumb.style.display = 'flex';
        this.element.ariaSelected = 'true';
      });

    } else {
      // Handle leaf nodes
      this.element.className = 'accordion-item-leaf';
      this.element.ariaLabel = `${this.element.textContent}, file`;
      //put the data length in the textContent
      this.element.textContent += ` (${data.length})`;
      this.element.onclick = () => {
        //remove background color from other elements
        //get all buttons in accordion
        const buttons = document.getElementsByClassName('accordion-item-leaf') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '';
          buttons[i].ariaSelected = 'false';
        }
        this.element.style.backgroundColor = UiKitColors.quorum.blue._50;
        this.element.ariaSelected = 'true';

        if (callbackLeaf) {
          callbackLeaf(data, path[0].toLowerCase(), path[1]);
        }
      };
    }

    this.element.style.marginLeft = `${indentLevel * 10}px`;
  }
}


