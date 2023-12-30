import { loggedMethod } from "../util/decorators";
import { createElement, updateElement } from "../util/helper";
import { DCAccordion } from "./DCAccordion";
import { DC_API_VAR_GROUP_INFO, DC_VARIABLE_PATH } from "./DCUrls";


export class DCAccordionItem {
  element: HTMLLIElement;
  content: HTMLElement;
  childAccordionItems: DCAccordionItem[];
  accordion: DCAccordion;
  leafNodeCallback: (value: unknown, variableName: string, buttonType: 'folder' | 'file') => void;
  uniqueId: string;
  id: string
  displayName: string
  urlPath: string

  constructor(
    uniqueId: string,
    title: string,
    itemData: any,
    displayName: string | undefined,
    path: string[] = [],
    accordion: DCAccordion,
    leafNodeCallback: (value: unknown, variableName: string, buttonType: 'folder' | 'file') => void,

    /*used for the accordion list to label if it is a folder or file*/
    buttonType: 'folder' | 'file',
  ) {
    this.leafNodeCallback = leafNodeCallback;
    this.accordion = accordion;

    this.id = itemData.id || "";
    this.displayName = displayName || title;
    this.urlPath = itemData.urlPath || "";

    this.element = createElement('li', {
      uniqueIdPrefix: uniqueId,
      id: this.id,
      role: 'treeitem',
      type: 'button',
      tabindex: -1,
      addStyle: {
        width: "100%"
      },
      textContent: this.displayName,
      ariaLabel: buttonType === 'folder' ? `${this.displayName}, folder` : `${this.displayName}, file`,
    });

    if (!this.accordion.wasSearched) {
      this.element.setAttribute('aria-level', `${Object.keys(this.accordion.selectedBranches).length + 1}`);
    }

    this.element.addEventListener('keydown', (e) => {
      const key = e.key;
      let targetElement;
      if (key === 'ArrowDown') {
        targetElement = this.element.nextElementSibling;
        e.preventDefault();
      } else if (key === 'ArrowUp') {
        targetElement = this.element.previousElementSibling;
        e.preventDefault();
      }
      if (targetElement) {
        this.element.setAttribute('tabindex', '-1');
        targetElement.setAttribute('tabindex', '0');
        targetElement.focus();
      }
    });


    this.initializeData(itemData, title, path, accordion, buttonType);
  }

  initializeData(data: any, title: string, path: string[], accordion: DCAccordion, classType: 'folder' | 'file') {
    if (typeof data === 'object') {
      this.initializeChildItemsForObjectData(data, title, path, accordion, classType);
    }
  }

  //used for the new fetch accordion
  initializeChildItemsForObjectData(data: any, title: string, path: string[], accordion: DCAccordion, classType: 'folder' | 'file') {
    this.childAccordionItems = [];

    const childContainer = createElement('div', {
      addStyle: {
        display: 'none',
      },
    });

    const keys = Object.keys(data);
    keys.forEach(key => {
      const itemData = data[key];
      const itemDisplayName = typeof itemData === 'object' && itemData.displayName ? itemData.displayName : undefined;
      const item = new DCAccordionItem(this.uniqueId, key, itemData, itemDisplayName, [...path, title], accordion, this.leafNodeCallback, 'folder', this.level + 1);
      this.childAccordionItems.push(item);
      childContainer.appendChild(item.element);
    });
    this.updateButtonElementForObjectData(childContainer, data, title, path, accordion, classType);
  }

  updateButtonElementForObjectData(childContainer: HTMLElement, data: any, title: string, path: string[], accordion: DCAccordion, classType: 'folder' | 'file') {
    const filteredPath = path.filter((item: string) => item !== 'Root');
    const filteredTitle = title !== 'Root' ? title : '';

    const handleInteraction = () => {
      // Reset aria-selected for all other buttons
      Array.from(accordion.accordionDiv.querySelectorAll('li')).forEach(button => {
        button.setAttribute('aria-selected', 'false');
      });

      this.accordion.wasSearched = false;

      // Set aria-selected for the current button
      this.element.setAttribute('aria-selected', 'true');
    }

    if (classType === 'folder') {
      updateElement(this.element, {
        updateClass: ['accordion-item-branch', 'datacommons'],
        setAriaSelected: 'false',
        onclick: () => {
          this.accordion.wasSearched = false;
          handleInteraction();
          this.clearAccordionAndAttachBreadcrumb(accordion);
          this.updateSelectedPath(data, filteredPath, filteredTitle, data.id);
          accordion.generateAccordion(data);
          accordion.breadcrumb.style.display = 'flex';
          this.leafNodeCallback(data.id, data.displayName, 'folder');
        }, appendTo: childContainer,
      });

      // Add keydown event for accessibility
      this.element.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          handleInteraction();
          this.clearAccordionAndAttachBreadcrumb(accordion);
          this.updateSelectedPath(data, filteredPath, filteredTitle, data.id);
          accordion.generateAccordion(data);
          accordion.breadcrumb.style.display = 'flex';
          this.leafNodeCallback(data.id, data.displayName, 'folder');
          const focusInterval = setInterval(() => {
            // Query the accordionDiv for the first list item and focus on it
            const firstLi = accordion.accordionDiv.querySelector('li');
            if (firstLi) {
              firstLi.setAttribute('tabindex', '0');
              firstLi.focus();
              clearInterval(focusInterval);
            }
          }, 100); // Adjust this delay time as needed
          e.preventDefault();
        }
        else if (e.key === 'ArrowLeft') {
          const breadcrumbItems = accordion.breadcrumb.querySelectorAll('button');
          if (breadcrumbItems.length >= 2) {
            breadcrumbItems[breadcrumbItems.length - 2].click();
            // Add a small delay to wait for the fetch call to complete and the UI to be updated
            const focusInterval = setInterval(() => {
              // Query the accordionDiv for the first list item and focus on it
              const firstLi = accordion.accordionDiv.querySelector('li');
              if (firstLi && window.getComputedStyle(firstLi).display !== 'none') {
                firstLi.setAttribute('tabindex', '0');
                firstLi.focus();
                clearInterval(focusInterval);
              }
            }, 100); // Adjust this delay time as needed
            e.preventDefault();
          }
        }
      });
    } else if (classType === 'file') {
      updateElement(this.element, {
        updateClass: ['accordion-item-leaf', 'datacommons'],
        ariaSelected: 'false',
        onclick: () => {
          handleInteraction();
          if (data.name && data.dcid) {
            this.leafNodeCallback(data.dcid, data.name, 'file');
            this.updateBreadcrumbPath(data.dcid).then(() => {
              accordion.clearBreadcrumb()
              accordion.createBreadcrumbItems(true);
            })
          } else {
            this.leafNodeCallback(data.id, data.displayName, 'file');
          }
        },
        appendTo: childContainer,
      });

      // Add keydown event for accessibility
      this.element.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleInteraction();
          if (data.name && data.dcid) {
            this.leafNodeCallback(data.dcid, data.name, 'file');
            this.updateBreadcrumbPath(data.dcid).then(() => {
              accordion.clearBreadcrumb()
              accordion.createBreadcrumbItems(true);
            })
          } else {
            this.leafNodeCallback(data.id, data.displayName, 'file');
          }
          e.preventDefault();
        }
        else if (e.key === 'ArrowLeft') {
          const breadcrumbItems = accordion.breadcrumb.querySelectorAll('button');
          if (breadcrumbItems.length >= 2) {
            breadcrumbItems[breadcrumbItems.length - 2].click();
            // Add a small delay to wait for the fetch call to complete and the UI to be updated
            const focusInterval = setInterval(() => {
              // Query the accordionDiv for the first list item and focus on it
              const firstLi = accordion.accordionDiv.querySelector('li');
              if (firstLi && window.getComputedStyle(firstLi).display !== 'none') {
                firstLi.setAttribute('tabindex', '0');
                firstLi.focus();
                clearInterval(focusInterval);
              }
            }, 100); // Adjust this delay time as needed
            e.preventDefault();
          }
        }
      });
    }
  }

  async getDisplayName(dcidArray: string[], index: number = 0, currentId: string = "dc/g/Root"): Promise<{ dcid: string, displayName: string }[]> {
    if (index >= dcidArray.length) {
      return [];
    }

    const url = new URL(DC_API_VAR_GROUP_INFO);
    const params = new URLSearchParams({
      dcid: currentId,
    });
    ["geoId/5566000"].forEach(entity => {
      params.append('entities', entity);
    });

    url.search = params.toString();

    console.log("HELLO!!!!")
    console.log(url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });


    const data = await response.json();

    const matchedGroup = data.childStatVarGroups.find((group: any) => group.id === `${dcidArray[index]}`);

    if (!matchedGroup) {
      throw new Error(`DCID ${dcidArray[index]} not found in ${currentId}`);
    }

    // Get the displayName for the remaining dcids in the array
    const remainingDisplayNames = await this.getDisplayName(dcidArray, index + 1, matchedGroup.id);

    // Return an array that starts with the current displayName and continues with the remaining ones
    return [{
      dcid: matchedGroup.id,
      displayName: matchedGroup.specializedEntity,
    }, ...remainingDisplayNames];
  }

  async updateBreadcrumbPath(dcid: string) {
    const url = new URL(DC_VARIABLE_PATH);

    const params = new URLSearchParams({
      dcid: dcid
    });

    url.search = params.toString();

    const response = await fetch(url.toString());
    const data = await response.json() as string[];

    data.shift();
    data.reverse();

    const dcidAndDisplayNameObject = await this.getDisplayName(data);

    //add Racine with dcid = "dc/g/Root"
    dcidAndDisplayNameObject.unshift({ dcid: "dc/g/Root", displayName: "Racine" });

    dcidAndDisplayNameObject.forEach((item: { dcid: string, displayName: string }) => {
      this.accordion.selectedBranches[String(item.displayName)] = {
        name: item.displayName,
        level: Object.keys(this.accordion.selectedBranches).length,
        urlPath: item.dcid
      };
    });
  }


  @loggedMethod
  updateSelectedPath(data: string | number, filteredPath: string[], filteredTitle: string, urlPath: string) {
    let branches = this.accordion.selectedBranches[String(data)] ? [this.accordion.selectedBranches[String(data)].name] : [];
    branches = [...branches, ...filteredPath, filteredTitle];
    branches = branches.flat(Infinity); // Flatten the array
    branches = branches.map(item => typeof item === 'string' ? item.replace(/ \(\d+\)/g, '') : item);
    branches = branches.filter((item: string) => item !== 'childStatVarGroups' && item !== '');

    if (branches.length > 0) {
      branches.forEach((branch: string, index: number) => {
        if (branch === 'Racine') {
          urlPath = 'dc/g/Root';
        }
        this.accordion.selectedBranches[String(branch)] = { name: branches.slice(0, index + 1), level: Object.keys(this.accordion.selectedBranches).length, urlPath: urlPath };
      })
    }
  }


  clearAccordionAndAttachBreadcrumb(accordion: DCAccordion) {
    while (accordion.accordionDiv.firstChild) {
      accordion.accordionDiv.removeChild(accordion.accordionDiv.firstChild);
    }
    accordion.filterDiv.style.display = 'none';
    //put the accordion.breadcrumb before the accordion.accordionDiv
    accordion.accordionDiv.parentNode.insertBefore(accordion.breadcrumb, accordion.accordionDiv);
  }
}
