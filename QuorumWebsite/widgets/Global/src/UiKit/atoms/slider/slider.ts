import { UiKitColors } from "../../../util/UiKit";
import { createElement, updateElement } from "../../../util/helper";
import { Theme, TupleToUnion } from "../../helperTypes";

interface SliderProps {
  id: string;
  uniqueIdPrefix: string;
  min: number;
  max: number;
  step: number;
  bigStep: number;
  value: number;
  label: string;
}

export class Slider {
  #sliderContainer: HTMLDivElement;
  #rangeSlider: HTMLInputElement;
  #label: string;
  #step: number;
  #bigStep: number;
  #labelElement: HTMLLabelElement;
  #valueDisplay: HTMLSpanElement;
  #valueDisplayValue: HTMLSpanElement;

  constructor(props: SliderProps) {
    const { id, min, max, step, bigStep, value, label, uniqueIdPrefix } = props;

    this.#label = label;
    this.#step = step;
    this.#bigStep = bigStep;

    this.#sliderContainer = createElement('div', {
      addClass: ['slider-container', 'light-mode'],
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_container',
    });

    this.#labelElement = createElement('label', {
      innerText: label,
      uniqueIdPrefix: uniqueIdPrefix,
      addClass: 'typo_title-title4',
      id: id + '_label',
      appendTo: this.#sliderContainer,
      htmlFor: id,
    });

    this.#valueDisplay = createElement('span', {
      addClass: 'value-display',
      appendTo: this.#labelElement,
    });

    this.#valueDisplayValue = createElement('span', {
      addClass: 'typo_text-mText',
      innerText: value.toString(),
      appendTo: this.#valueDisplay,
    });

    this.#rangeSlider = createElement('input', {
      type: 'range',
      min: min.toString(),
      max: max.toString(),
      step: step.toString(),
      value: value.toString(),
      uniqueIdPrefix: uniqueIdPrefix,
      id: id,
      appendTo: this.#sliderContainer,
      addClass: 'range-slider',

      oninput: (e) => this.#updateAriaValue(e),
      onkeydown: (e) => {
        this.#handleKeyDown(e)
      },

      addAriaLabelledBy: id + '_label',
      ariaValueMin: min.toString(),
      ariaValueMax: max.toString(),
      ariaValueNow: value.toString(),
      ariaValueText: `${label}: ${value}`,
    });

    this.#rangeSlider.style.setProperty("--value-percent", `${((value - min) / (max - min)) * 100}%`);
  }

  get value(): number {
    return parseFloat(this.#rangeSlider.value);
  }

  set value(value: number) {
    this.#rangeSlider.value = value.toString();
    this.#rangeSlider.ariaValueNow = value.toString();

    // Simulate an event object
    this.#updateAriaValue({
      target: this.#rangeSlider
    } as unknown as Event);
  }

  get sliderContainer(): HTMLDivElement {
    return this.#sliderContainer;
  }

  get slider(): HTMLInputElement {
    return this.#rangeSlider;
  }

  get label(): HTMLLabelElement {
    return this.#labelElement;
  }

  set max(max: number) {
    this.#rangeSlider.max = max.toString();
    this.#rangeSlider.setAttribute('aria-valuemax', max.toString());
  }

  #updateAriaValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const floatValue = parseFloat(value).toFixed(2);
    updateElement(this.#rangeSlider, {
      ariaValueNow: floatValue,
      ariaValueText: `${this.#label}: ${floatValue}`,
    });

    // Update the --value-percent variable
    const percent = ((parseFloat(value) - parseFloat(this.#rangeSlider.min)) / (parseFloat(this.#rangeSlider.max) - parseFloat(this.#rangeSlider.min))) * 100;
    this.#rangeSlider.style.setProperty("--value-percent", `${percent}%`);
    this.#valueDisplayValue.innerText = parseFloat(value).toFixed(0);
  }

  #handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    // Allow the default behavior of the Tab key
    if (key === 'Tab') {
      return;
    }

    // If left or right arrow key is pressed use step value
    // If up or down arrow key is pressed use bigStep value
    const step = key === 'ArrowLeft' || key === 'ArrowRight' ? this.#step : this.#bigStep;

    // Prevent default behavior for arrow keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
      event.preventDefault();
    }

    if (key === 'ArrowLeft' || key === 'ArrowDown') {
      this.#rangeSlider.value = (parseFloat(this.#rangeSlider.value) - step).toString();
    } else if (key === 'ArrowRight' || key === 'ArrowUp') {
      this.#rangeSlider.value = (parseFloat(this.#rangeSlider.value) + step).toString();
    }

    this.#updateAriaValue(event);
    // Send onchange event
    this.#rangeSlider.dispatchEvent(new Event('change'));
  }


  render(parent: HTMLElement): void {
    parent.appendChild(this.#sliderContainer);
  }

  switchTheme(theme: TupleToUnion<Theme>): void {
    console.log('switchTheme', theme);
    //remove old theme
    updateElement(this.#sliderContainer, { removeClass: `light-mode` });
    updateElement(this.#sliderContainer, { removeClass: `dark-mode` });
    updateElement(this.#sliderContainer, { removeClass: `high-contrast-mode` });
    updateElement(this.#sliderContainer, { addClass: `${theme}-mode` });

    // Update value display theme
    updateElement(this.#valueDisplay, { removeClass: `light-mode` });
    updateElement(this.#valueDisplay, { removeClass: `dark-mode` });
    updateElement(this.#valueDisplay, { removeClass: `high-contrast-mode` });
    updateElement(this.#valueDisplay, { addClass: `${theme}-mode` });

    //make labels consistent with theme
    if (theme === 'light') {
      this.#labelElement.style.color = UiKitColors.neutral.black;
    } else if (theme === 'dark') {
      this.#labelElement.style.color = UiKitColors.neutral.white;
    } else if (theme === 'high-contrast') {
      this.#labelElement.style.color = UiKitColors.neutral.white;
    }
  }
}



