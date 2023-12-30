import { loggedMethod } from "../../../util/decorators";
import { createElement, updateElement } from "../../../util/helper";
import { Theme, TupleToUnion } from "../../helperTypes";
import { checkmarkIcon } from "../icons/icons";
import { formatSVG } from "../icons/showIcons";

export interface SelectedListOption {
  uniqueIdPrefix: string,
  id: string,
  theme: TupleToUnion<Theme>,
  options: string[],
  callback?: (event: MouseEvent, index: number) => void
}
export class SelectedList {
  private _outerContainer: HTMLDivElement;
  private _selectionList: HTMLUListElement;
  private _selectionListItems: HTMLLIElement[];
  private checkIcon: SVGElement;
  public theme: TupleToUnion<Theme>;
  private callback: (event: MouseEvent, index: number) => void;
  private _multipleSelectEnabled: boolean = false;

  constructor(sl_options: SelectedListOption) {
    const { uniqueIdPrefix, id, theme, options, callback } = sl_options;
    /** outer container */
    this._outerContainer = createElement('div', {
      addClass: `selectionList__outer--container--${theme}`,
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_container',
    });

    this.theme = theme;

    /** container with list items */
    this._selectionList = createElement('ul', {
      addClass: `selectionList__inner--container--${theme}`,
      role: 'listbox',
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_list',
      appendTo: this.outerContainer,
    });

    this.checkIcon = formatSVG(checkmarkIcon, 'icon-quorum__blue__100-size-1') as SVGElement;

    /** list items */
    this.callback = callback ? callback : () => { };
    this._selectionListItems = [];
    for (let i = 0; i < options.length; i++) {
      this.selectionListItems.push(createElement('li', {
        innerText: options[i],
        role: 'option',
        addClass: `selectionList__item--${theme}`,
        uniqueIdPrefix: uniqueIdPrefix,
        value: i,
        ariaSelected: 'false',
        id: id + '_item_' + i,
        appendTo: this.selectionList,
        onpointerdown: (event) => {
          const target = event.target as HTMLLIElement;
          this.handleSelectionClick(target);
          if (callback) {
            callback(event, i);
          }
        },
        onkeydown: (event: KeyboardEvent) => {
          this.handleKeyboardNavigation(event, this.selectionListItems[i]);
        }
      }));
      this.selectionListItems[i].tabIndex = i === 0 ? 0 : -1;
    }
  }

  public singleSelect(): void {
    this._multipleSelectEnabled = false;
  }

  public multipleSelect(): void {
    this._multipleSelectEnabled = true;
  }

  get value(): number {
    //get from aria-selected
    const selected = this.selectionListItems.find((item) => {
      return item.getAttribute('aria-selected') === 'true';
    });
    if (selected && selected.value !== undefined) {
      return selected.value;
    }
    return -1;
  }

  get outerContainer(): HTMLDivElement {
    return this._outerContainer;
  }

  get selectionList(): HTMLUListElement {
    return this._selectionList;
  }

  get selectionListItems(): HTMLLIElement[] {
    return this._selectionListItems;
  }

  set selectionListItems(items: HTMLLIElement[]) {
    //clear all items
    this.selectionList.innerHTML = '';
    this._selectionListItems = items;
  }

  public addItem(item: HTMLLIElement, index: number) {
    this.selectionListItems.push(item);
    updateElement(item, {
      value: index.toString(),
      role: 'option',
      ariaSelected: 'false',
      addClass: `selectionList__item--${this.theme}`,
      tabIndex: index === 0 ? 0 : -1,
      onkeydown: (event: KeyboardEvent) => {
        this.handleKeyboardNavigation(event, this.selectionListItems[index]);
      },
      appendTo: this.selectionList,
    })
    this.updateCallback(this.callback);
  }

  public updateOnSelect(callback: (event: MouseEvent | KeyboardEvent, index: number) => void) {
    this.selectionListItems.forEach((listItem, index) => {
      listItem.onpointerdown = (event) => {
        console.log('pointer down');
        this.handleSelectionClick(listItem);
        callback(event, index);
      };
      listItem.onkeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          this.handleSelectionClick(listItem);
          callback(event, index);
        }
        this.handleKeyboardNavigation(event, this.selectionListItems[index]);
      };
    });
  }

  public switchTheme(theme: TupleToUnion<Theme>) {
    this.outerContainer.classList.remove(`selectionList__outer--container--${this.theme}`);
    this.outerContainer.classList.add(`selectionList__outer--container--${theme}`);

    this.selectionList.classList.remove(`selectionList__inner--container--${this.theme}`);
    this.selectionList.classList.add(`selectionList__inner--container--${theme}`);

    this.selectionListItems.forEach((listItem) => {
      listItem.classList.remove(`selectionList__item--${this.theme}`);
      listItem.classList.add(`selectionList__item--${theme}`);
    });

    this.checkIcon = formatSVG(checkmarkIcon, 'icon-quorum__blue__100-size-1') as SVGElement;
    this.theme = theme;
  }

  @loggedMethod
  private handleSelectionClick(target: HTMLLIElement) {
    if (!this._multipleSelectEnabled) {
      // when multiple select is not enabled, deselect all items before selecting the new one
      const items = this.selectionList.children as HTMLCollectionOf<HTMLLIElement>;
      for (let j = 0; j < items.length; j++) {
        const item = items[j]
        const icon = item.querySelector('.icon-quorum__blue__100-size-1');
        item.classList.remove('selected');
        item.setAttribute('aria-selected', 'false');
        if (icon) {
          item.removeChild(icon);
        }
      }
    }
    // If multiple select is enabled, this will toggle selection of the item
    if (target.classList.contains('selected')) {
      target.classList.remove('selected');
      target.setAttribute('aria-selected', 'false');
      const icon = target.querySelector('.icon-quorum__blue__100-size-1');
      if (icon) {
        target.removeChild(icon);
      }
    } else {
      this.selectItem(this.selectionListItems.indexOf(target));
    }
  }

  @loggedMethod
  private selectItem(index: number) {
    //add class selected to the selected item
    this.selectionListItems[index].classList.add('selected');
    this.selectionListItems[index].setAttribute('aria-selected', 'true');
    this.selectionListItems[index].innerHTML += this.checkIcon.outerHTML;
  }

  @loggedMethod
  public updateCallback(callback: (event: MouseEvent, index: number) => void) {
    this.selectionListItems.forEach((listItem, index) => {
      listItem.onpointerdown = (event) => {
        this.handleSelectionClick(listItem);
        callback(event, index);
      };
    });
  }


  public focusFirstVisibleItem(): void {
    const selectedItem: HTMLLIElement | null = this.selectionList.querySelector('.selected');

    if (selectedItem && selectedItem.style.display !== 'none' && selectedItem.tagName === 'LI') {
      selectedItem.focus();
      selectedItem.tabIndex = 0;
    } else {
      for (const listItem of this.selectionListItems) {
        if (listItem.style.display !== 'none' && listItem.tagName === 'LI') {
          listItem.focus();
          listItem.tabIndex = 0;
          break;
        }
      }
    }
  }

  private handleKeyboardNavigation(event: KeyboardEvent, listItem: HTMLLIElement) {
    console.log('handleKeyboardNavigation');
    let index = this.selectionListItems.indexOf(listItem);
    console.log(index);

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      index--;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      index++;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelectionClick(listItem);
      if (this.callback) {
        this.callback(event as unknown as MouseEvent, index);
      }
      return;
    } else {
      return;
    }
    if (index >= 0 && index < this.selectionListItems.length) {
      const newIndex = this.findNextVisibleItem(index, event.key);
      console.log(newIndex);
      if (newIndex !== -1) {
        this.selectionListItems[newIndex].focus();
        listItem.tabIndex = -1;
        this.selectionListItems[newIndex].tabIndex = 0;
      }
    }
  }

  private findNextVisibleItem(index: number, direction: 'ArrowUp' | 'ArrowDown'): number {
    while (index >= 0 && index < this.selectionListItems.length) {
      if (this.selectionListItems[index].style.display !== 'none') {
        return index;
      }
      direction === 'ArrowUp' ? index-- : index++;
    }
    return -1;
  }

  public removeItem(listItem: HTMLLIElement): void {
    // Find the index of the item in the selectionListItems array
    const index = this._selectionListItems.indexOf(listItem);

    // If the item exists in the array, remove it
    if (index > -1) {
      // Remove the item from the array
      this._selectionListItems.splice(index, 1);

      // Remove the item from the DOM
      this._selectionList.removeChild(listItem);

      // Re-assign tabIndex, value attribute, id, and the callback functions for remaining items to ensure proper order and functionality
      this._selectionListItems.forEach((item, i) => {
        item.tabIndex = i === 0 ? 0 : -1;  // update tabIndex
        item.value = i; // update value
        item.id = item.id.split('_').slice(0, -1).join('_') + '_' + i; // update id suffix

        // update the callback functions to use the correct index
        item.onpointerdown = (event) => {
          this.handleSelectionClick(item);
          if (this.callback) {
            this.callback(event, i);
          }
        };
        item.onkeydown = (event: KeyboardEvent) => {
          this.handleKeyboardNavigation(event, this.selectionListItems[i]);
        }
      });
    }
  }



  render(parent: HTMLDivElement): void {
    parent.appendChild(this.outerContainer);
  }

}

