import { createElement, updateElement } from "../../../../util/helper";
import { SelectedList } from "../../../atoms/selectionList/selectionList";
import { TextInputField } from "../../../atoms/textFields/textFields";
import { Theme, TupleToUnion } from "../../../helperTypes";

export class ListAndFilter {
  private textField: TextInputField;
  private list: SelectedList;
  constructor(csvContent: HTMLDivElement, callback: (event: MouseEvent, index: number) => void) {
    const columnSettings = createElement('label', {
      addClass: 'typo_text-mText',
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
      },
      appendTo: csvContent,
    });

    const columnSettingsRow = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
      },
      appendTo: columnSettings,
    });
    this.textField = new TextInputField({ labelText: 'Find a Column', placeholder: 'Filter Columns', size: 'sm', uniqueIdPrefix: '', id: 'findAColumn', type: 'text', theme: 'light' })

    updateElement(this.textField.input, { addClass: 'textField--sm--dark--Ricon3' });

    this.textField.render(columnSettingsRow);
    this.textField.container.style.width = 'calc(100%-8px)';
    this.textField.input.style.width = 'inherit';
    this.textField.input.oninput = () => {
      this.filterList();
    }

    this.list = new SelectedList({ options: [], id: 'csvSettings', uniqueIdPrefix: 'lkj', theme: 'light', callback: callback });
    this.list.render(csvContent);
    this.list.selectionList.ariaLabel = 'Select a column';
    this.list.outerContainer.style.height = '150px';
    this.list.selectionList.style.height = '150px';
  }

  get selectedValue(): number {
    return this.list.value
  }

  get selectedText(): string {

    const text = '';
    this.list.selectionListItems.forEach((item) => {
      //get the child index value from this.list.selectionListItems
      console.log(item);
    });

    return text;
  }

  get options(): string[] {
    return this.list.selectionListItems.map((item) => {
      return item.innerText;
    });
  }



  private filterList() {
    const filteredList = this.list.selectionListItems.filter((item) => {
      return item.innerText.toLowerCase().includes(this.textField.value.toLowerCase());
    }).map((item) => {
      return item.innerText;
    });
    //make on onchange event to update the selection list items based on the input value 
    this.list.selectionListItems.forEach((item) => {
      if (filteredList.includes(item.innerText)) {
        item.style.display = 'flex';
      } else {
        updateElement(item, {
          addStyle: {
            display: 'none',
          },
        });
      }
    });
  }

  public setSelectionListItems(items: HTMLLIElement[]) {
    this.list.selectionListItems = [];
    items.forEach((item, index) => {
      this.list.addItem(item, index);
    });
  }

  public updateCallback(callback: (event: MouseEvent, index: number) => void) {
    this.list.updateCallback(callback);
  }

  public switchTheme(theme: TupleToUnion<Theme>) {
    this.textField.switchTheme(theme);
    this.list.switchTheme(theme);
  }



}
