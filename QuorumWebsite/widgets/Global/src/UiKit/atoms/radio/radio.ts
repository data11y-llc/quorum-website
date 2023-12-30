import { createElement, updateElement } from "../../../util/helper";
import { Theme, TupleToUnion, ValueOf } from "../../helperTypes";


interface RadioGroupProps<T> {
  theme: TupleToUnion<Theme>;
  direction: 'row' | 'column';
  disabled: boolean;
  options: ValueOf<T>[];
  name: string;
  uniqueIdPrefix: string;
  id: string;
  label?: string;
}

interface SingleRadioProps<T> {
  theme: TupleToUnion<Theme>;
  disabled?: boolean;
  option: ValueOf<T>;
  name: string;
  uniqueIdPrefix: string;
  id: string;
}

export class RadioGroup<T = string> {
  private _container: HTMLDivElement;
  protected theme: TupleToUnion<Theme>;
  protected radios: SingleRadio<T>[];
  private _value: ValueOf<T>;

  constructor(props: RadioGroupProps<T>) {
    const {
      theme,
      direction = 'row',
      disabled = false,
      options = ['Radio'],
      name,
      uniqueIdPrefix,
      id,
      label,
    } = props;

    this._container = createElement('div', {
      addClass: `radio-label-container_${direction}`,
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_container',
    });
    if (label) {
      this._container.appendChild(createElement('label', {
        addClass: 'typo_title-title3',
        innerText: label,
        uniqueIdPrefix: uniqueIdPrefix,
        id: id + '_label',
        addStyle: {
          margin: '0'
        },
      }));
    }


    this.theme = theme;
    this.radios = (options as ValueOf<T>[]).map((label: ValueOf<T>) => {
      return new SingleRadio(this.container, { theme, disabled, option: label as ValueOf<T>, name, uniqueIdPrefix, id: `${id}${label}` });
    });
  }

  get container(): HTMLDivElement {
    return this._container;
  }

  get value(): ValueOf<T> {
    this._value = this.radios.find((radio) => radio.input.checked)?.getLabel().innerText as ValueOf<T>;
    return this._value;
  }

  set value(value: ValueOf<T>) {
    this._value = value;
    this.radios.forEach((radio) => {
      radio.input.checked = radio.getLabel().innerText === value;
    });
  }

  get onchange(): (e: Event, value: ValueOf<T>) => void {
    return this.radios[0].onchange;
  }

  public switchTheme(theme: TupleToUnion<Theme>): void {
    this.theme = theme;
    this.radios.forEach((radio) => {
      radio.switchTheme(this.theme);
    });
  }

  public switchDirection(direction: 'row' | 'column'): void {
    updateElement(this.container, { addClass: `radio-label-container_${direction}` });
  }

  public getRadio(label: ValueOf<T>): SingleRadio<T> {
    return this.radios.find((radio) => radio.getLabel().innerText === label) as SingleRadio<T>;
  }


  public setOnChange(onChange: (e: Event, value: ValueOf<T>) => void): void {
    console.log('setOnChange');
    this.radios.forEach((radio) => {
      radio.setOnChange(onChange);
    });
  }


  /** labelName or index */
  public selectRadio(label: ValueOf<T>): void {
    if (typeof label === 'number') {
      label = this.radios[label].getLabel().innerText as ValueOf<T>;
    }
    const radio = this.getRadio(label);
    if (radio) {
      radio.input.checked = true;
    }
  }

  public render(parent: HTMLElement): void {
    parent.appendChild(this.container);
  }
}

export class SingleRadio<T> {
  private _label: HTMLLabelElement;
  protected theme: TupleToUnion<Theme>;
  private _option: ValueOf<T>;

  constructor(UiKit: HTMLDivElement, props: SingleRadioProps<T>) {
    const { theme, disabled = false, option, name, uniqueIdPrefix, id } = props;

    this._option = option;

    this._label = createElement('label', {
      addClass: `radio_label_${theme}`,
      innerText: option as string,
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_label',
      appendTo: UiKit,
    });

    this.theme = theme;

    createElement('input', {
      disabled,
      addClass: `radio_${theme}`,
      name: name + uniqueIdPrefix,
      type: 'radio',
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + uniqueIdPrefix + '_input',
      value: option as string,
      appendTo: this.label,
      addStyle: {
        margin: '0.5rem',
      },
    });
  }

  public switchTheme(theme: TupleToUnion<Theme>): void {
    const radio = this.label.querySelector('input[type="radio"]') as HTMLInputElement;
    //remove old theme
    updateElement(this.label, { removeClass: `radio_label_${this.theme}` });
    updateElement(this.label, { addClass: `radio_label_${theme}` });
    updateElement(radio, { removeClass: `radio_${this.theme}` });
    updateElement(radio, { addClass: `radio_${theme}` });
    this.theme = theme;
  }


  public setOnChange(onChange: (e: Event, value: ValueOf<T>) => void): void {
    this.label.addEventListener('change', (e) => {
      const inputValue = this.input.value as ValueOf<T>;
      onChange(e, inputValue);
    });
  }


  public getLabel(): HTMLLabelElement {
    return this.label;
  }

  public changeLabel(originalLabelname: string, newLabelname: string): void {
    const radio = this.label.querySelector('input[type="radio"]') as HTMLInputElement;
    if (radio.value === originalLabelname) {
      this._option = newLabelname as ValueOf<T>;
      radio.value = newLabelname;
      this.label.innerText = newLabelname;
    }
  }
  //get input
  get input(): HTMLInputElement {
    console.log('getInput');
    return this._label.querySelector('input[type="radio"]') as HTMLInputElement;
  }

  get option(): ValueOf<T> {
    return this._option;
  }

  get id(): string {
    return this._label.id;
  }

  get name(): string {
    return this._label.innerText;
  }

  get label(): HTMLLabelElement {
    return this._label;
  }

  get inputId(): string | undefined {
    return this._label.querySelector('input[type="radio"]')?.id;
  }

  get onchange(): (e: Event, value: ValueOf<T>) => void {
    return this.onchange;
  }

}

