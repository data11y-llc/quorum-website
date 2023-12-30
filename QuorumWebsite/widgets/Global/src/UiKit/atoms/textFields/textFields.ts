import { UiKitColors } from "../../../util/UiKit";
import { createElement, updateElement } from "../../../util/helper";
import { ClassNames } from "../../foundations/typography/typography.scss";
import { TupleToUnion, Theme } from "../../helperTypes";

type Size = 'sm' | 'md' | 'lg';

interface InputFieldOptions {
  theme?: TupleToUnion<Theme>;
  size?: Size;
  placeholder: string;
  labelText?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;

  uniqueIdPrefix: string;
  id: string;
}

interface TextFieldOptions extends InputFieldOptions {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date';
}

interface NumberFieldOptions extends InputFieldOptions {
  min?: number;
  max?: number;
  step?: number;
}


export class InputField {
  private _container: HTMLDivElement;
  private _input: HTMLInputElement;
  private _labelEl?: HTMLLabelElement;
  private _helperText?: HTMLParagraphElement;
  private _rendered = false;
  private _theme: TupleToUnion<Theme>;
  private _size: Size;
  private _helperTextValue: string | undefined;

  constructor({
    theme = 'light',
    size = 'md',
    labelText,
    helperText,
    onChange,
    onInput,
    placeholder,
    id,
    uniqueIdPrefix,
  }: InputFieldOptions) {
    this._container = createElement('div', {
      uniqueIdPrefix,
      id: `${id}_container`,
      addClass: `textField--outerContainer--${theme}`,
    });

    this._theme = theme;
    this._size = size;
    this._helperTextValue = helperText;

    if (labelText) {
      this._labelEl = createElement('label', {
        addStyle: {
          display: 'flex',
          marginLeft: '4px',
          flexDirection: 'column',
          height: 'fit-content',
        },
        innerText: labelText,
        addClass: 'typo_text-lgText',
        htmlFor: `${uniqueIdPrefix}${id}_input`,
        uniqueIdPrefix,
        id: `${id}_label`,
        appendTo: this._container,
      });
    }

    this._input = createElement('input', {
      uniqueIdPrefix,
      id: `${id}_input`,
      type: 'text',
      placeholder,
      addClass: `textField--${size}--${theme}`,
      appendTo: this._container,
      onchange: (event: Event) => {
        onChange?.((event.target as HTMLInputElement).value);
      },
      oninput: (event: Event) => {
        onInput?.((event.target as HTMLInputElement).value);
      },
    });

    if (helperText != undefined) {
      this._helperText = createElement('p', {
        uniqueIdPrefix,
        id: `${id}_helperText`,
        innerText: helperText,
        addClass: 'typo_text-mText',
        appendTo: this._container,
      });
    }
  }


  set inputPlaceholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  set label(label: string) {
    if (this._labelEl)
      this._labelEl.innerText = label;
  }

  set helperText(helperText: string) {
    if (this._helperText)
      this._helperText.innerText = helperText;
  }

  get helperTextEl(): HTMLParagraphElement | undefined {
    return this._helperText;
  }

  get labelEl(): HTMLLabelElement | undefined {
    return this._labelEl;
  }

  get container(): HTMLDivElement {
    return this._container;
  }

  get input(): HTMLInputElement {
    return this._input;
  }

  get rendered(): boolean {
    return this._rendered;
  }

  set rendered(rendered: boolean) {
    this._rendered = rendered;
  }

  get helperTextValue(): string | undefined {
    return this._helperTextValue;
  }

  set helperTextValue(value: string | undefined) {
    this._helperTextValue = value;
    this.helperText = value || '';
  }

  set error(error: boolean) {
    console.log('error', error);
    if (error) {
      if (this.helperTextEl)
        this.helperTextEl.style.display = 'block';
      this._input.classList.add('error');
      this._helperText?.classList.add('helperText--error');
      this.updateHelperTextColor();
    } else {
      if (this.helperTextEl)
        this.helperTextEl.style.display = 'none';
      this._input.classList.remove('error');
      this._helperText?.classList.remove('helperText--error');
      this.updateHelperTextColor();
    }
  }

  set valid(valid: boolean) {
    if (valid) {
      if (this.helperTextEl)
        this.helperTextEl.style.display = 'block';
      this._input.classList.add('valid');
      this._helperText?.classList.add('helperText--valid');
      this.updateHelperTextColor();
    } else {
      this._input.classList.remove('valid');
      this._helperText?.classList.remove('helperText--valid');
      this.updateHelperTextColor();
    }
  }

  public setNormal() {
    this.error = false;
    this.valid = false;
  }

  private updateHelperTextColor() {
    if (this._helperText) {
      if (this._input.classList.contains('error')) {
        if (this._theme === 'light') {
          this._helperText.style.color = UiKitColors.secondary.red._100;
        } else if (this._theme === 'dark') {
          this._helperText.style.color = UiKitColors.attention.red._25;
        } else if (this._theme === 'high-contrast') {
          this._helperText.style.color = UiKitColors.attention.red._100;
        }
      } else if (this._input.classList.contains('valid')) {
        if (this._theme === 'light') {
          this._helperText.style.color = UiKitColors.secondary.green;
        } else if (this._theme === 'dark') {
          this._helperText.style.color = UiKitColors.text.dark.green;
        } else if (this._theme === 'high-contrast') {
          this._helperText.style.color = UiKitColors.text.hico.green;
        }
      } else {
        this._helperText.style.color = (this._theme === 'dark' || this._theme === 'high-contrast') ? 'white' : '';
      }
    }
  }

  public switchTheme(theme: TupleToUnion<Theme>) {
    const textElements = this._container.querySelectorAll('[class^="typo_"]') as NodeListOf<HTMLElement>;
    textElements.forEach((element) => {
      element.style.color = (theme === 'dark' || theme === 'high-contrast') ? 'white' : '';
    });

    updateElement(this._container, { updateClass: `textField--outerContainer--${theme}` });

    //if the input contains error, include the error class, same for valid
    if (this._input.classList.contains('error')) {
      updateElement(this._input, { updateClass: [`textField--${this._size}--${theme}`, `error`] });
    } else {
      updateElement(this._input, { updateClass: `textField--${this._size}--${theme}` });
    }
    //if the input contains error, update the error color
    this._theme = theme;
    this.updateHelperTextColor();
  }

  public switchSize(size: Size) {
    this._input.classList.remove(`textField--${this._size}--${this._theme}`);
    this._input.classList.add(`textField--${size}--${this._theme}`);
    this._size = size;
  }

  changeLabelClass(className: ClassNames) {
    if (this._labelEl) {
      //remove existing classes
      this._labelEl.classList = "";
      this._labelEl.classList.add(className);
    }
  }

  public render(parent: HTMLElement) {
    this.rendered = true;
    parent.appendChild(this._container);
  }

  public destroy() {
    this.rendered = false;
    this._container.remove();
  }
}

export class TextInputField extends InputField {

  constructor(options: TextFieldOptions) {
    super(options);
    this.input.type = options.type;
    this.input.addEventListener('input', () => {
      this.value = this.input.value;
    });
  }

  get value(): string {
    return this.input.value;
  }

  set value(value: string) {
    this.setNormal();
    this.input.value = value;
  }

  // Add any additional methods or properties specific to TextInputField here
}

export class NumberInputField extends InputField {
  private _min?: number;
  private _max?: number;

  constructor(options: NumberFieldOptions) {
    super(options);
    this.input.type = 'number';
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
    this.value = this._min || 1;

    this.input.addEventListener('input', (event) => {
      if (event.target.value === '') {
        this.input.min = '';
      } else {
        if (this._min !== undefined) {
          this.input.min = this._min.toString();
        }
        this.value = +this.input.value;
      }
    });

    // Now using 'change' event
    this.input.addEventListener('change', () => {
      if (this.input.value === '') {
        this.value = this._min || 1;
      }
      this.input.dispatchEvent(new Event('valueChanged'));
    });
  }

  set min(min: number) {
    this._min = min;
    this.input.min = min.toString();
  }

  set max(max: number) {
    this._max = max;
    this.input.max = max.toString();
  }

  get value(): number {
    return +this.input.value;
  }

  set value(value: number) {
    this.setNormal();
    if (this._min && value < this._min) {
      this.input.value = this._min.toString();
    } else if (this._max && Number(value) > this._max) {
      this.input.value = this._max.toString();
    } else {
      this.input.value = value.toString();
    }
    this.input.dispatchEvent(new Event('valueChanged'));
  }
}

