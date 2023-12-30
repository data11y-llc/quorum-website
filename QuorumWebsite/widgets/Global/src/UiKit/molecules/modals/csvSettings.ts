import { EventEmitter } from "events";
import { createElement, updateElement } from "../../../util/helper";
import { UiKitColors } from "../../../util/UiKit";
import { Button } from "../../atoms/buttons/buttons";
import { crossIcon, loadingSpinner } from "../../atoms/icons/icons";
import { Icon } from "../../atoms/icons/showIcons";
import { NumberInputField, TextInputField } from "../../atoms/textFields/textFields";
import { ColumnData } from "../components/columnData/columnData";
import { ListAndFilter } from "../components/listAndFilter/listAndFilter";
import { loggedMethod } from "../../../util/decorators";
import { Theme, TupleToUnion } from "../../helperTypes";


export interface CsvColOption {
  "Column Name": string;
  "Column Type": string;
}

export type CsvColOptions = { [key: number]: CsvColOption; };

export class CsvSettings {
  private cancelButton: Button;
  private saveButton: Button;
  private spinner: Icon;
  private modal: HTMLDivElement;
  #csvModal: HTMLDivElement;
  private columnDataDiv: HTMLDivElement;
  private columnSections: { [key: string]: ColumnData } = {};
  public listAndFilter: ListAndFilter;
  public _columnNames = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8', 'Test9', 'Test10'];
  public columnOptions: CsvColOptions = {}
  public tempColumnOptions: CsvColOptions = {}
  private currentColumnIndex: number;
  private onSaveEmitter: EventEmitter;
  private _frameCopy: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;
  private randomInput: NumberInputField;
  private randomConfirm: Button;
  private _randomValue: number;
  private filterInput: TextInputField;
  private filterConfirm: Button;
  private _filterValue: string;
  private _closeButton: HTMLButtonElement;
  private _uniqueId: string;
  quorumFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;


  private readonly columnContainerStyle = {
    width: 'initial',
    height: 'fit-content',
    padding: '16px',
    marginTop: '8px',
    backgroundColor: UiKitColors.neutral.white,
    border: `1px solid ${UiKitColors.neutral.grey._65}`,
    borderRadius: '8px',
  }

  constructor(UiKit: HTMLDivElement, uniqueId: string) {
    this.modal = this.createModal(UiKit);
    this._uniqueId = uniqueId;

    //create close button with cross Icon 
    const crossIconEl = new Icon({ icon: crossIcon, addClass: 'icon-neutral__black-size-1', id: 'close-csv-settings', uniqueIdPrefix: 'csv-settings' });

    this._closeButton = createElement('button', {
      innerHTML: crossIconEl?.svg?.outerHTML || 'close',
      addStyle: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      },
      addClass: 'icon-neutral__black-size-1',
      onpointerdown: () => { this.hide() },
      //make spacebar and enter close the modal
      onkeydown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.hide();
        }
      }
    })

    this._closeButton.ariaLabel = 'Close CSV Settings';

    //place close button in top right
    this.modal.appendChild(this._closeButton);


    this.#csvModal = this.createCsvModal();
    this.spinner = this.createSpinner();
    this.onSaveEmitter = new EventEmitter();

    this.createTitle('CSV Settings');
    this.randomInput = this.createInput<NumberInputField>('Randomized %', 'Enter percentage 25', 'number');
    //put the input in a div
    const randomInputAndButton = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        width: '100%',
        height: 'fit-content',
      },
    })

    const filterInputAndButton = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        width: '100%',
        height: 'fit-content',
      },
    })

    //put in second position
    this.randomInput.container.insertBefore(randomInputAndButton, this.randomInput.container.children[1]);
    randomInputAndButton.appendChild(this.randomInput.input);

    this.randomInput.min = 0;
    this.randomInput.max = 100;

    this.filterInput = this.createInput<TextInputField>('Filter', 'x >= 20 and y = “headset”', 'text');
    updateElement(this.filterInput.container, { addStyle: { marginTop: '16px' } });

    this.filterInput.container.insertBefore(filterInputAndButton, this.filterInput.container.children[1]);
    filterInputAndButton.appendChild(this.filterInput.input);

    this.randomConfirm = new Button({ className: 'btn-xsmall-secondary-var1', text: 'Confirm', uniqueIdPrefix: this._uniqueId, id: 'confirmRandom' });
    this.filterConfirm = new Button({ className: 'btn-xsmall-secondary-var1', text: 'Confirm', uniqueIdPrefix: this._uniqueId, id: 'confirmFilter' });

    this.randomConfirm.button.ariaLabel = 'Confirm Randomized %';
    this.filterConfirm.button.ariaLabel = 'Confirm Filter';

    this.randomConfirm.button.style.marginLeft = '8px';
    this.filterConfirm.button.style.marginLeft = '8px';
    this.randomConfirm.button.style.marginTop = '10px';
    this.filterConfirm.button.style.marginTop = '10px';


    randomInputAndButton.appendChild(this.randomConfirm.button);
    filterInputAndButton.appendChild(this.filterConfirm.button);


    this.randomConfirm.button.addEventListener('click', () => this.validateRandomizer());
    this.filterConfirm.button.addEventListener('click', () => this.validateFilter());

    this.createLineDivider();

    this.createTitle('Column Settings');

    this.listAndFilter = new ListAndFilter(this.#csvModal, () => {
      const i = this.listAndFilter.selectedValue
      this.currentColumnIndex = i;
      this.columnDataDiv.style.display = 'block';

      const text = this.listAndFilter.options[i];

      for (let i = 0; i < this.columnDataDiv.children.length; i++) {
        const label = this.columnDataDiv.children[i].children[0] as HTMLLabelElement;
        if (this.columnDataDiv.children[i].children) {
          Array.from(this.columnDataDiv.children[i].children).forEach((child) => {
            if (child instanceof HTMLButtonElement) {
              child.ariaLabel = `change ${text} ${label.innerText}`;
            }
          })
        }
      }

      this.loadColumnOptions(this.columnOptions[i]);
    });

    const listItems: HTMLLIElement[] = [];
    this.columnNames.forEach((name) => {
      listItems.push(createElement('li', {
        innerText: name,
      }));
    });

    this.listAndFilter.setSelectionListItems(listItems);
    this.columnNames = listItems.map((item) => item.innerText);

    this.initializeColumnOptions();
    this.columnDataDiv = this.createColumnDataDiv();
    this.columnDataDiv.style.display = 'none';
    this.createSaveButtonRow();
  }

  get csvModal(): HTMLDivElement {
    return this.#csvModal;
  }

  get columnNames(): string[] {
    return this._columnNames;
  }

  set columnNames(names: string[]) {
    this._columnNames = names;
  }

  get randomValue(): number {
    return this._randomValue;
  }

  get filterValue(): string {
    return this._filterValue;
  }

  get copyFrame(): quorum_Libraries_Compute_Statistics_DataFrame_ | undefined {
    return this._frameCopy;
  }

  set copyFrame(frame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined) {
    if (frame) {
      console.log('setting copy frame');
      this._frameCopy = frame
    } else {
      console.log('setting copy frame to undefined');
      this._frameCopy = undefined;
    }
  }



  private createModal(UiKit: HTMLDivElement): HTMLDivElement {
    return createElement('div', {
      addClass: 'container--flex--responsive',
      id: "csvSettingsContainer",
      addStyle: {
        backgroundColor: UiKitColors.neutral.grey._10,
        position: 'absolute',
        top: '0',
        left: '0',
        height: 'fit-content',
        maxHeight: '90vh',
        maxWidth: '600px',
        width: '100%',
        overflowY: 'auto',
        zIndex: '9999',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
      onkeydown: (e: KeyboardEvent) => { this.stayInsideModal(e) },
      appendTo: UiKit,
    });
  }


  private createCsvModal(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        padding: '32px',
        width: '100%',
      },
      appendTo: this.modal,
    });
  }

  private createSpinner(): Icon {
    return new Icon({ icon: loadingSpinner, addClass: 'spinner', uniqueIdPrefix: '', id: 'spinner1' });
  }

  private createTitle(text: string): void {
    createElement('h2', {
      innerText: text,
      addClass: 'typo_title-title3',
      appendTo: this.#csvModal,
    });
  }

  private createInput<T>(labelText: string, inputPlaceholder: string, type: 'text' | 'number'): T {
    const div = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      appendTo: this.#csvModal,
    });
    let textField: TextInputField | NumberInputField;
    if (type === 'text') {
      textField = new TextInputField({ labelText: labelText, placeholder: inputPlaceholder, size: 'sm', uniqueIdPrefix: '', id: labelText, type: 'text', helperText: '' });
    } else {
      textField = new NumberInputField({ labelText: labelText, placeholder: inputPlaceholder, size: 'sm', uniqueIdPrefix: '', id: labelText, helperText: '' });
      textField.value = 100;
    }
    textField.render(div);
    if (textField.helperTextEl)
      textField.helperTextEl.style.color = UiKitColors.secondary.red._100;
    textField.container.style.width = '100%';
    textField.input.style.marginBottom = '0px';
    textField.input.style.width = '95%';
    return textField as T
  }


  private createLineDivider(): void {
    createElement('hr', {
      addStyle: {
        width: '100%',
        height: '1px',
        border: 'none',
        backgroundColor: UiKitColors.neutral.grey._40,
      },
      appendTo: this.#csvModal,
    });
  }

  private initializeColumnOptions(): void {
    this.columnNames.forEach((_, index) => {
      this.columnOptions[index] = {
        'Column Name': this.columnNames[index],
        'Column Type': 'text',
      };
    });
    this.tempColumnOptions = { ...this.columnOptions };
  }

  private createColumnDataDiv(): HTMLDivElement {
    return createElement('div', {
      addStyle: this.columnContainerStyle,
      appendTo: this.#csvModal,
    });
  }

  private createSaveButtonRow(): void {
    const buttonRow = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
        justifyContent: 'flex-end',
        marginTop: '16px',
      },
      appendTo: this.#csvModal,
    });

    this.cancelButton = new Button({ text: 'Cancel', className: 'btn-small-link-var1', uniqueIdPrefix: '', id: 'cancel' });
    this.cancelButton.button.onclick = () => { this.hide(); };
    this.saveButton = new Button({ text: 'Save', className: 'btn-small-primary-var1', uniqueIdPrefix: '', id: 'save' });

    this.cancelButton.disabled = false;
    this.saveButton.disabled = true;

    this.cancelButton.render(buttonRow);
    this.saveButton.render(buttonRow);
    this.saveButton.button.onclick = () => this.handleSaveButton();
  }

  addColumnDataSection(label: keyof CsvColOption, value: string, type: 'text' | 'dropdown', options?: string[]): void {
    const newSection = new ColumnData(this.columnDataDiv, { value: value, label: label }, type);

    newSection.onChangeEmit((value) => {
      this.tempColumnOptions[this.currentColumnIndex][value.label] = value.value;
      this.saveButton.disabled = false;
      if (value.label === 'Column Name') {
        this.changeCopyFrameColumnName(this.currentColumnIndex, value.value);
      } else if (value.label === 'Column Type') {
        this.changeCopyFrameColumnType(this.currentColumnIndex, value.value);
      }
    });
    if (type === 'dropdown' && options) {
      newSection.setDropdownOptions(options);
    }

    this.columnSections[label] = newSection;
  }

  public changeCopyFrameColumnName(columnIndex: number, newName: string): void {
    if (this.copyFrame) {
      const column = this.copyFrame.GetColumn$quorum_integer(columnIndex)
      column.SetHeader$quorum_text(newName);
    }
  }

  public changeCopyFrameColumnType(columnIndex: number, newType: string): void {
    if (this.copyFrame) {
      const column = this.copyFrame.GetColumn$quorum_integer(columnIndex)
      if (newType === "Number") {
        const newColumn = column.ConvertToNumberColumn();
        this.copyFrame.RemoveColumnAt$quorum_integer(columnIndex);
        this.copyFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(columnIndex, newColumn);
      } else if (newType === "Text") {
        const newColumn = column.ConvertToTextColumn();
        this.copyFrame.RemoveColumnAt$quorum_integer(columnIndex);
        this.copyFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(columnIndex, newColumn);
      } else if (newType === "Boolean") {
        const newColumn = column.ConvertToBooleanColumn();
        this.copyFrame.RemoveColumnAt$quorum_integer(columnIndex);
        this.copyFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(columnIndex, newColumn);
      }
    }
  }

  public handleSaveButton() {
    this.columnOptions = this.tempColumnOptions;
    this.saveButton.disabled = true;
    this.hide();
    this.onSaveEmitter.emit('save', this.columnOptions, this.randomInput.value, this.filterInput.value);
  }

  public subscribeToSaveEvent(listener: (columnOptions: CsvColOptions, randomValue: number, filterValue: string) => void): void {
    this.onSaveEmitter.on('save', listener);
  }

  public setColumnOptions(columnOptions: CsvColOptions): void {
    this.columnOptions = columnOptions;
    this.tempColumnOptions = { ...this.columnOptions };
    if (this.currentColumnIndex !== undefined) {
      this.loadColumnOptions(this.columnOptions[this.currentColumnIndex]);
    }
  }

  loadColumnOptions(options: CsvColOption): void {
    for (const [label, value] of Object.entries(options)) {
      this.columnSections[label].setValue(value);
    }
  }


  public showLoadingSpinner(): void {
    const spinnerSVG = this.spinner.svg;
    if (spinnerSVG) {
      updateElement(spinnerSVG, {
        addStyle: {
          position: 'absolute',
          top: '50%',
          left: '50%',
        },
      });
    }
    this.spinner.render(this.modal);
  }

  public hideLoadingSpinner(): void {
    this.spinner.destroy();
  }

  @loggedMethod
  public show(): void {
    this.setColumnOptions(this.columnOptions);
    this.modal.style.display = 'flex';
    const firstFocusableElement = this.modal.querySelector('input, button, select, textarea') as HTMLElement;
    firstFocusableElement.focus();
  }


  public hide(): void {
    this.modal.style.display = 'none';
    document.activeElement?.blur();
  }

  @loggedMethod
  public stayInsideModal(e: KeyboardEvent): void {
    // not disabled
    const focusableElements = this.modal.querySelectorAll('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLButtonElement;

    this.modal.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          //if last is disabled use the second to last
          if (lastFocusableElement.disabled) {
            if (document.activeElement === focusableElements[focusableElements.length - 2]) {
              event.preventDefault();
              firstFocusableElement.focus();
            }
          } else if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    });
  }

  public isShowing(): boolean {
    return this.modal.style.display === 'flex';
  }

  public setQuorumFrame(frame: quorum_Libraries_Compute_Statistics_DataFrame_): void {
    this.quorumFrame = frame;
  }

  async validateRandomizer() {
    if (!this.copyFrame) throw new Error('No copy frame');
    try {
      this.copyFrame.SelectAllColumns();
      await this.copyFrame.SplitSelectedColumnsRandomlyByRows$quorum_number(
        this.randomInput.value / 100
      );
      this.randomInput.helperTextValue = 'valid';

      this.randomInput.error = false;
      this.randomInput.valid = true;
      this.saveButton.disabled = false;
    } catch (e) {
      this.randomInput.valid = false;
      this.randomInput.error = true;
      this.randomInput.helperTextValue = e.errorMessage;
      this.saveButton.disabled = true;
    }
  }

  async validateFilter() {
    if (!this.copyFrame) throw new Error('No copy frame');
    console.log(this.copyFrame.GetHeaders());
    try {
      const filterValue = this.filterInput.value === '' ? 'true' : this.filterInput.value;
      await this.copyFrame.Filter$quorum_text(filterValue)
      this.filterInput.helperTextValue = 'valid';
      this.filterInput.error = false;
      this.filterInput.valid = true;
      this.saveButton.disabled = false;
    } catch (e) {
      this.filterInput.valid = false;
      this.filterInput.error = true;
      this.filterInput.helperTextValue = e.errorMessage;
      this.saveButton.disabled = true;
    }
  }

  switchTheme(theme: TupleToUnion<Theme>): void {
    this.listAndFilter.switchTheme(theme);
    if (theme === 'light') {
      this.csvModal.style.backgroundColor = UiKitColors.neutral.grey._10;
    } else if (theme === 'dark') {
      this.csvModal.style.backgroundColor = UiKitColors.neutral.grey._75;
    } else if (theme === 'high-contrast') {
      this.csvModal.style.backgroundColor = UiKitColors.neutral.black;
    }
    //make all the input switch themes
    this.randomInput.switchTheme(theme);
    this.filterInput.switchTheme(theme);

    //get all labels in csvModal and switch their theme
    const headers = this.csvModal.querySelectorAll('h2');
    for (const header of headers) {
      console.log(header);
      if (theme === 'light') {
        header.style.color = UiKitColors.neutral.black
        this.cancelButton.button.style.color = UiKitColors.neutral.black;
      } else if (theme === 'dark') {
        header.style.color = UiKitColors.neutral.white;
        this.cancelButton.button.style.color = UiKitColors.neutral.white;
      } else if (theme === 'high-contrast') {
        header.style.color = UiKitColors.neutral.white;
        this.cancelButton.button.style.color = UiKitColors.neutral.white;
      }
    }

    //go through all this.columnSections[] and switch their theme
    for (const section of Object.values(this.columnSections)) {
      section.theme = theme;
      section.switchTheme(theme);
    }
    //switch this._closeButton svg to correct theme

    if (theme === 'light') {
      //get the svg in the button
      updateElement(this.saveButton.getElement(), { updateClass: 'btn-small-primary-var1' });
      this._closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.black;
      this.columnDataDiv.style.backgroundColor = UiKitColors.neutral.white;
      this.columnDataDiv.style.color = UiKitColors.neutral.black;
    }
    else if (theme === 'dark') {
      updateElement(this.saveButton.getElement(), { updateClass: 'btn-small-accent-var1' });
      this._closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.white;
      this.columnDataDiv.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.columnDataDiv.style.color = UiKitColors.neutral.white;
    }
    else if (theme === 'high-contrast') {
      updateElement(this.saveButton.getElement(), { updateClass: 'btn-small-hico-var1' });
      this._closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.white;
      this.columnDataDiv.style.backgroundColor = UiKitColors.neutral.black;
      this.columnDataDiv.style.color = UiKitColors.neutral.white;
    }
  }
}
