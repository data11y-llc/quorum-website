import { createElement, updateElement } from "../../../util/helper";
import { Theme, TupleToUnion } from "../../helperTypes";


type ValueOf<T> = T[keyof T];

interface CheckboxGroupProps<T> {
  direction: 'row' | 'column';
  uniqueIdPrefix: string;
  id: string;
  disabled?: boolean;
  options: T;
  theme: TupleToUnion<Theme>;
}

interface SingleCheckboxProps<T> {
  uniqueIdPrefix: string;
  id: string;
  disabled?: boolean;
  option: ValueOf<T>;
  theme: TupleToUnion<Theme>;
}

export class CheckboxGroup<T> {
  private _container: HTMLDivElement;
  private checkboxes: SingleCheckbox<T>[];
  private theme: TupleToUnion<Theme>;

  constructor(props: CheckboxGroupProps<T>) {
    const { direction = 'row', disabled = false, options: labelText = ['Checkbox'], theme, uniqueIdPrefix, id } = props;

    this._container = createElement('div', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id,
      addClass: `chkbox-label-container_${direction}`,
      role: 'group',
    });

    this.theme = theme;

    this.checkboxes = labelText.map((label) => {
      return new SingleCheckbox<T>(this.container, { disabled, option: label as ValueOf<T>, theme, uniqueIdPrefix, id: `${id}${label}` });
    });
  }

  get container(): HTMLDivElement {
    return this._container;
  }

  public switchDirection(direction: 'row' | 'column'): void {
    updateElement(this.container, { addClass: `chkbox-label-container_${direction}` });
  }


  public getCheckbox(labelText: ValueOf<T>): SingleCheckbox<T> | undefined {
    const checkbox = this.checkboxes.find((checkbox) => checkbox.label.innerText === labelText);
    if (!checkbox) {
      console.error(`Checkbox with label ${labelText} not found`);
      return undefined;
    }
    return checkbox
  }

  public setOnChange(onChange: (e: Event) => void): void {
    this.checkboxes.forEach((checkbox) => {
      checkbox.label.addEventListener('change', onChange);
    });
  }

  public addCheckbox(label: ValueOf<T>, disabled: boolean = false): void {
    const newCheckbox = new SingleCheckbox<T>(this.container, {
      disabled,
      option: label,
      theme: this.theme,
      uniqueIdPrefix: this._container.id,
      id: `${this._container.id}${label}`
    });

    // Add the new checkbox to the list
    this.checkboxes.push(newCheckbox);
  }

  public hideAll(): void {
    this.checkboxes.forEach((checkbox) => {
      checkbox.hide();
    });
  }

  public switchTheme(theme: TupleToUnion<Theme>): void {
    this.theme = theme;
    this.checkboxes.forEach((checkbox) => {
      checkbox.switchTheme(this.theme);
    });
  }

  public getCheckStatus(): Record<string, boolean> {
    const checkStatus: Record<string, boolean> = {};

    this.checkboxes.forEach((checkbox) => {
      checkStatus[checkbox.label.innerText] = checkbox.checked;
    });

    return checkStatus;
  }

  public render(parent: HTMLDivElement): void {
    parent.appendChild(this.container);
  }
}

export class SingleCheckbox<T> {
  private _label: HTMLLabelElement;
  private theme: TupleToUnion<Theme>;
  private _uniqueIdPrefix: string;
  private _id: string;
  private _option: ValueOf<T>;
  private _input: HTMLInputElement;

  constructor(UiKit: HTMLDivElement, props: SingleCheckboxProps<T>) {
    const { disabled = false, option: labelText, theme, id, uniqueIdPrefix } = props;

    this._option = labelText;
    this._label = createElement('label', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + 'label',
      addClass: `checkbox_label_${theme}`,
      innerText: this.option as unknown as string,
      appendTo: UiKit,
    });

    this.theme = theme;
    this._id = id;
    this._uniqueIdPrefix = uniqueIdPrefix;

    this._input = createElement('input', {
      disabled: disabled,
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + 'input',
      addClass: `chkbox_${theme}`,
      type: 'checkbox',
      appendTo: this._label,
    });
  }

  get input(): HTMLInputElement {
    return this._input;
  }

  get label(): HTMLLabelElement {
    return this._label;
  }

  get labelId(): string {
    return this._uniqueIdPrefix + this._id + 'label';
  }

  get option(): ValueOf<T> {
    return this._option
  }

  set option(option: ValueOf<T>) {
    this._option = option;
    this.label.innerText = this.option as unknown as string;
  }

  get inputId(): string {
    return this._uniqueIdPrefix + this._id + 'input';
  }

  get checked(): boolean {
    const checkbox = this.input
    return checkbox.checked;
  }

  public setOnChange(onChange: (e: Event) => void): void {
    this.label.addEventListener('change', onChange);
  }

  public check(): this {
    this.input.checked = true;
    return this;
  }

  public uncheck(): this {
    this.input.checked = false;
    return this;
  }

  public show(): this {
    updateElement(this.label, { addStyle: { display: 'flex' } });
    return this;
  }

  public hide(): this {
    updateElement(this.label, { addStyle: { display: 'none' } });
    return this;
  }


  public order(newIndex: number): this {
    const parent = this.label.parentElement as HTMLDivElement;
    const currentIndex = Array.from(parent.children).indexOf(this.label);
    swapElements(parent, currentIndex, newIndex);
    return this;
  }

  public onChange(callback: (checked: boolean, label: string) => void): this {
    this.input.addEventListener('change', (event) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      callback(isChecked, this.label.innerText);
    });
    return this;
  }

  public switchTheme(theme: TupleToUnion<Theme>): void {
    //remove old theme
    updateElement(this.label, { removeClass: `checkbox_label_${this.theme}` });
    updateElement(this.label, { addClass: `checkbox_label_${theme}` });
    updateElement(this.input, { removeClass: `chkbox_${this.theme}` });
    updateElement(this.input, { addClass: `chkbox_${theme}` });
    this.theme = theme;
  }
}


function swapElements(parent, index1, index2) {
  const children = Array.from(parent.children);

  if (index1 < 0 || index1 >= children.length || index2 < 0 || index2 >= children.length) {
    return; // Invalid indices
  }

  const element1 = children[index1];
  const element2 = children[index2];

  if (index1 < index2) {
    parent.insertBefore(element2, element1);
    parent.insertBefore(element1, element2.nextSibling);
  } else {
    parent.insertBefore(element1, element2);
    parent.insertBefore(element2, element1.nextSibling);
  }
}
