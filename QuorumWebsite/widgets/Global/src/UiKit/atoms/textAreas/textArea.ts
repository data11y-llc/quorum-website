import { UiKitColors } from "../../../util/UiKit";
import { createElement, updateElement } from "../../../util/helper";

type TextBoxSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg';

type TextAreaSize = 'sm' | 'md' | 'lg' | 'xlg';

export class TextBox {
  private element: HTMLInputElement;

  constructor(size: TextBoxSize) {
    this.element = createElement('input', {
      type: 'text',
      addClass: `textbox_W${size}_Hsm`,
    }) as HTMLInputElement;
  }

  get value(): string {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  render(parent: HTMLElement) {
    parent.appendChild(this.element);
  }
}

interface TextAreaProps {
  size: TextAreaSize;
  placeholder: string;
  id: string;
  uniqueIdPrefix: string;
  labelText?: string;
  validationFunction?: (value: string) => boolean;
  errorMessage?: string;
}

export class TextArea {
  private _container: HTMLDivElement;
  private _textArea: HTMLTextAreaElement;
  private _label: HTMLLabelElement | undefined;
  private _labelText: string | undefined;
  private _previousValidValue: string;
  private _validationFunction: ((value: string) => boolean);
  private _errorContainer: HTMLDivElement;
  private _errorMessage: string | undefined;

  constructor(options: TextAreaProps) {
    const { size, placeholder, id, uniqueIdPrefix, labelText, validationFunction, errorMessage } = options;
    this._container = createElement('div', {
      addClass: 'textarea--outerContainer',
      uniqueIdPrefix,
      id: `${id}_container`,
    }) as HTMLDivElement;

    this._validationFunction = validationFunction || (() => true);
    this._previousValidValue = '';
    this._errorMessage = errorMessage;


    if (labelText) {
      this._labelText = labelText;
      this._label = createElement('label', {
        innerText: this._labelText,
        addStyle: {
          fontFamily: 'Montserrat',
          marginLeft: '4px',
        },
        addClass: `typo_text-mText`,
        uniqueIdPrefix,
        id: `${id}_label`,
      });
      this._container.appendChild(this._label);
    }

    this._textArea = createElement('textarea', {
      addClass: `textarea_${size}`,
      placeholder,
      uniqueIdPrefix,
      id,
    }) as HTMLTextAreaElement;

    this._textArea.addEventListener('input', () => {
      this.validateInput(this._textArea.value);
    });

    this._container.appendChild(this._textArea);

    this._errorContainer = createElement('div', {
      addClass: 'typo_text-mText',
      uniqueIdPrefix,
      id: `${id}_error`,
      ariaLive: 'polite',
    }) as HTMLDivElement;
    this._container.appendChild(this._errorContainer);
  }

  get value(): string {
    return this.textArea.value;
  }

  set value(value: string) {
    this.validateInput(value);
  }

  get textArea(): HTMLTextAreaElement {
    return this._textArea;
  }

  get container(): HTMLDivElement {
    return this._container;
  }

  get label(): HTMLLabelElement | undefined {
    return this._label;
  }

  get labelText(): string | undefined {
    return this._labelText;
  }

  set labelText(value: string | undefined) {
    this._labelText = value;
    if (this.label && this._labelText) {
      this.label.innerText = this._labelText;
    }
  }

  get errorContainer(): HTMLDivElement {
    return this._errorContainer;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  set errorMessage(value: string | undefined) {
    this._errorMessage = value;
  }

  validateInput(value: string) {
    const isValid = this._validationFunction(value);

    if (isValid) {
      this.textArea.value = value;
      this._previousValidValue = value;
      this._errorContainer.innerText = 'valid input';
      this._errorContainer.style.display = 'none';
      //make on change event
      this.textArea.dispatchEvent(new Event('change'));
      //remove error class 
      this.textArea.classList.remove('error');

    } else {
      // Perform desired actions when the input value is invalid
      this.textArea.value = this._previousValidValue;
      this._errorContainer.innerText = this._errorMessage || 'Invalid input';
      //make text red
      this._errorContainer.style.display = 'block';
      //add error class
      this.textArea.classList.add('error');
    }
  }

  render(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

}

