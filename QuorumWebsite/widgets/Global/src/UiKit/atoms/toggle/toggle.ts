import { createElement } from "../../../util/helper.js";

interface ToggleOptions {
  uniqueIdPrefix: string;
  id: string;
  checked?: boolean;
}

export class Toggle {
  private label: HTMLLabelElement;
  private input: HTMLInputElement;
  private slider: HTMLSpanElement;
  private onClickCallback?: (checked: boolean) => void;

  constructor(parent: HTMLElement, options: ToggleOptions) {
    const { uniqueIdPrefix, id, checked = false } = options;
    this.label = createElement("label", {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + "_label",
      addClass: "data11y_switch",
      appendTo: parent,
    });

    this.input = createElement("input", {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + "_input",
      checked: checked,
      type: "checkbox",
      appendTo: this.label,
    }) as HTMLInputElement;

    this.slider = createElement("span", {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + "_slider",
      addClass: "data11y_slider",
      appendTo: this.label,
    }) as HTMLSpanElement;

    this.input.addEventListener("click", () => {
      if (this.onClickCallback) {
        this.onClickCallback(this.input.checked);
      }
    });
  }

  set onclick(callback: (checked: boolean) => void) {
    this.onClickCallback = callback;
  }

  get checked(): boolean {
    return this.input.checked;
  }

  set checked(checked: boolean) {
    this.input.checked = checked;
  }
}

