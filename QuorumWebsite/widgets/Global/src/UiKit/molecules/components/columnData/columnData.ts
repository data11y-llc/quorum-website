import EventEmitter from "events";
import { createElement } from "../../../../util/helper";
import { pencilIcon } from "../../../atoms/icons/icons";
import { formatSVG } from "../../../atoms/icons/showIcons";
import { TextInputField } from "../../../atoms/textFields/textFields";
import { Dropdown } from "../../dropdown/dropdown";
import { Theme, TupleToUnion } from "../../../helperTypes";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const labelDivStyle: any = {
  display: 'flex',
  flexDirection: 'row',
  height: 'fit-content',
  alignItems: 'center',
}


interface ColumnDataType {
  value: string;
  label: string;
}

export class ColumnData {
  private _dropdown: Dropdown | undefined;
  private dropdownOptions: string[] | undefined;
  private input: TextInputField | null;
  private inputType: "text" | "dropdown";
  public id: string;
  public value: string;
  private editing = false;
  private pTag: HTMLParagraphElement;
  private emitter: EventEmitter;
  private _editButton: HTMLButtonElement;
  private _label: string;
  public theme: TupleToUnion<Theme> = 'light';

  constructor(UiKit: HTMLDivElement, columnData: ColumnDataType, inputType: "text" | "dropdown") {
    const { value, label } = columnData;
    this._label = label;
    this.inputType = inputType;
    this.id = label;
    this.value = value;
    this.input = null;

    //label and button 
    const labelDiv = createElement("div", {
      addStyle: labelDivStyle,
      appendTo: UiKit,
    });

    this.emitter = new EventEmitter();

    createElement("label", {
      innerText: label,
      addClass: "typo_title-title3",
      appendTo: labelDiv,
    });

    this._editButton = createElement("button", {
      innerHTML:
        formatSVG(pencilIcon, "icon-neutral__black-size-1")?.outerHTML ||
        "edit",
      addDataset: {
        editing: "false",
      },
      addStyle: {
        border: "none",
        backgroundColor: "transparent",
        marginLeft: "8px",
      },
      appendTo: labelDiv,
    });

    //value
    this.pTag = createElement("p", {
      id: `columnData${label}`,
      innerText: this.value,
      addClass: "typo_text-mText",
      appendTo: UiKit,
    });

    if (inputType === "dropdown") {
      this.useDropdownInput();
    } else if (inputType === "text") {
      this.useTextInput();
    }
  }

  get editButton(): HTMLButtonElement {
    return this._editButton;
  }

  private useTextInput(): void {
    this.editButton.onclick = () => {
      if (this.editing) {
        this.replaceInputField();
        return;
      }
      this.editing = true;

      this.input = new TextInputField({ uniqueIdPrefix: '', id: 'textFieldsContainer', size: 'lg', theme: 'light', placeholder: 'Text Field', type: 'text' })
      this.input.input.value = this.value;
      this.input.input.style.width = '100%';
      this.input.input.style.fontSize = '16px';
      this.input.input.style.border = 'none';
      this.input.input.style.outline = 'none';
      this.input.input.style.boxShadow = 'none';
      this.input.input.style.paddingLeft = '0';

      this.input.input.onchange = () => this.onTextChange();
      this.switchTheme(this.theme);

      this.pTag.replaceWith(this.input.input);
    };
  }

  private useDropdownInput(): void {
    console.log('useDropdownInput')
    this.editButton.onclick = () => {
      if (this.editing) {
        this.replaceInputField();
        return;
      }
      this.editing = true;

      this._dropdown = new Dropdown({ options: this.dropdownOptions || [], uniqueIdPrefix: "", id: "columnTypeDropdown" });
      this._dropdown.dropdown.style.marginTop = "8px";
      this._dropdown.value = this.value;
      this._dropdown.addOnChangeListener(() => this.onDropdownChange());
      this.switchTheme(this.theme);

      this.pTag.replaceWith(this._dropdown.dropdown);
    };
  }

  private onTextChange(): void {
    if (this.input) {
      this.value = this.input.input.value;
      this.emitter.emit('change', { value: this.value, label: this.id });
    }
    this.replaceInputField();
  }

  private onDropdownChange(): void {
    if (this.dropdown) {
      this.value = this.dropdown.value
      this.emitter.emit('change', { value: this.value, label: this.id });
    }
    this.replaceInputField();
  }

  public onChangeEmit(callback: (value: { value: string, label: string }) => void): void {
    this.emitter.on('change', callback);
  }

  public offChangeEmit(callback: (value: { value: string, label: string }) => void): void {
    this.emitter.off('change', callback);
  }

  private replaceInputField(): void {
    let value: string | null = null;
    if (this.inputType === 'dropdown' && this.dropdown) {
      value = this.dropdown.value;
    } else if (this.inputType === 'text' && this.input) {
      value = this.input.value;
    }

    this.pTag = createElement("p", {
      innerText: value || this.value,
      addClass: "typo_text-mText",
    });

    if (this.inputType === 'dropdown' && this.dropdown) {
      this.dropdown.dropdown.replaceWith(this.pTag);
      this.dropdown.destroy();
      this.editing = false;
      return;
    } else if (this.inputType === 'text' && this.input) {
      this.input.input.replaceWith(this.pTag);
      this.input.destroy();
      this.editing = false;
      return;
    }
  }

  get dropdown(): Dropdown | undefined {
    return this._dropdown;
  }

  public setDropdownOptions(options: string[]): void {
    this.dropdownOptions = options;
  }

  public setValue(value: string): void {
    this.value = value;
    this.pTag.innerText = value;
  }

  public getLabel(): string {
    return this.id;
  }

  switchTheme(theme: TupleToUnion<Theme>): void {
    if (this.inputType === "dropdown") {
      this.dropdown?.switchTheme(theme);
    }
    if (this.inputType === "text") {
      this.input?.switchTheme(theme);
    }

    //make the edit button readable to the theme
    this.editButton.innerHTML = formatSVG(pencilIcon, theme === "light" ? "icon-neutral__black-size-1" : "icon-neutral__white-size-1")?.outerHTML || "edit";


    //make any text readable to the theme
    this.pTag.style.color = theme === "light" ? "#000" : "#fff";
  }
}
