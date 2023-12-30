import { RadioGroup } from "../UiKit/atoms/radio/radio";
import { TextArea } from "../UiKit/atoms/textAreas/textArea";
import { NumberInputField } from "../UiKit/atoms/textFields/textFields";
import { Header } from "../UiKit/molecules/header/header";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher";
import { UiKitColors } from "../util/UiKit";
import { createElement, updateElement } from "../util/helper";
import { PixelGrid } from "./PixelGrid";


export type pwColorOptions = [
  'Black and White',
  'Full Color',
];

export const pwColorOptionsArray: pwColorOptions = [
  'Black and White',
  'Full Color',
];


export class PixelWidget {
  #container: HTMLDivElement;
  #header: Header;
  #content: HTMLDivElement;
  #uniqueId: string;

  #optionsDiv: HTMLDivElement;
  #colorOptionsDiv: HTMLDivElement;
  #colorOptions: RadioGroup<pwColorOptions>;

  #imageSizeDiv: HTMLDivElement;
  #widthInput: NumberInputField;
  #heightInput: NumberInputField;

  #bitInputDiv: HTMLDivElement;
  #bitInput: NumberInputField;

  #bitTextArea: TextArea;

  #pixelGrid: PixelGrid;
  #modal: ThemeSettingsModal<PixelWidget>

  constructor(id: string) {
    this.#uniqueId = id;
    this.#container = this.createContainer(id);

    this.#header = new Header({ title: 'Pixel Widget', theme: 'light', uniqueId: id });

    this.#header.settingsButton.onClick(() => {
      this.#modal.open();
    })

    this.#header.render(this.#container);

    this.#content = this.createContentDiv();
    this.#container.appendChild(this.#content);


    this.#optionsDiv = this.createOptionsDiv();
    this.#content.appendChild(this.#optionsDiv);


    this.#colorOptionsDiv = createElement('div', { addStyle: { flex: '1', maxWidth: '40%' } }) as HTMLDivElement;
    this.#colorOptions = new RadioGroup<pwColorOptions>({ options: pwColorOptionsArray, disabled: false, name: 'color', uniqueIdPrefix: this.uniqueId, id: 'color', theme: 'light', direction: 'column', label: 'Color Options' });
    this.#colorOptions.selectRadio('Black and White');
    this.#colorOptions.render(this.#colorOptionsDiv);
    this.#colorOptions.setOnChange((e) => {
      this.#pixelGrid.colorOptions = this.#colorOptions.value;
    });
    this.#optionsDiv.appendChild(this.#colorOptionsDiv);

    //add a div that will hold a label, and two TextInputFields
    // this.#imageSizeDiv = this.createOptionItemDiv();
    this.#imageSizeDiv = createElement('div', { addStyle: { flex: '1', maxWidth: '60%' } }) as HTMLDivElement;
    this.#optionsDiv.appendChild(this.#imageSizeDiv);

    createElement('label', {
      addClass: 'typo_title-title3',
      innerText: 'Image Size',
      uniqueIdPrefix: this.uniqueId,
      id: 'imageSizeLabel',
      appendTo: this.#imageSizeDiv,
    });

    const imageSizeDiv = createElement('div',
      {
        addStyle: {
          display: 'flex',
          flexDirection: 'row',
          marginTop: '8px',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          columnGap: '10px',
        }
      })




    this.#widthInput = new NumberInputField({ labelText: 'Width', uniqueIdPrefix: this.uniqueId, id: 'widthInput', theme: 'light', placeholder: 'Enter Width' });
    this.#widthInput.input.style.width = 'auto';
    this.#widthInput.min = 0;
    this.#widthInput.max = 100;
    this.#widthInput.value = 5;
    this.#widthInput.container.style.width = '50%';
    this.#widthInput.render(imageSizeDiv);
    this.#widthInput.input.addEventListener('change', () => {
      this.#pixelGrid.updateGrid(this.#widthInput.value, this.#heightInput.value);
    });

    this.#heightInput = new NumberInputField({ labelText: 'Height', uniqueIdPrefix: this.uniqueId, id: 'heightInput', theme: 'light', placeholder: 'Enter Height' });
    this.#heightInput.input.style.width = 'auto';
    this.#heightInput.min = 0;
    this.#heightInput.max = 100;
    this.#heightInput.value = 5;
    this.#heightInput.container.style.width = '50%';
    this.#heightInput.render(imageSizeDiv);
    this.#heightInput.input.addEventListener('change', () => {
      this.#pixelGrid.updateGrid(this.#widthInput.value, this.#heightInput.value);
    });

    this.#imageSizeDiv.appendChild(imageSizeDiv);

    this.#bitInputDiv = createElement('div', {});
    this.#optionsDiv.appendChild(this.#bitInputDiv);

    this.#bitInput = new NumberInputField({ labelText: 'Bit Depth', uniqueIdPrefix: this.uniqueId, id: 'bitInput', theme: 'light', placeholder: 'Enter Bit Depth' });
    this.#bitInput.input.style.width = 'auto';
    this.#bitInput.container.style.width = '100%';
    this.#bitInput.min = 1;
    this.#bitInput.max = 20;
    this.#bitInput.value = 1;
    this.#bitInput.input.addEventListener('change', () => {
      this.#pixelGrid.bitPerColor = this.#bitInput.value;
    });

    this.#bitInput.render(this.#bitInputDiv);

    this.#imageSizeDiv.appendChild(this.#bitInputDiv);


    const bitInputDiv = createElement('div', { addStyle: { display: 'flex', flexDirection: 'column', marginTop: '8px', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', rowGap: '8px' } });
    //add header for bit input
    createElement('label', {
      addClass: 'typo_title-title3',
      innerText: 'Create a Binary Value',
      uniqueIdPrefix: this.uniqueId,
      id: 'bitInputLabel',
      appendTo: bitInputDiv,
    });

    //create text area to input bits
    this.#bitTextArea = new TextArea({
      size: 'sm', placeholder: 'Enter Bits', uniqueIdPrefix: this.uniqueId, id: 'bitTextArea', labelText: 'Enter Bits',
      validationFunction: (value) => {
        return value === '' || /^[01]+$/.test(value);
      },
      errorMessage: 'Please enter only 0\'s and 1\'s',
    });
    bitInputDiv.appendChild(this.#bitTextArea.container);
    // this.#bitTextArea.render(this.#content);
    this.#content.appendChild(bitInputDiv);
    this.#bitTextArea.textArea.style.width = '100%';
    this.#bitTextArea.textArea.style.height = 'fit-content';
    this.#bitTextArea.textArea.style.resize = 'none';

    this.#bitTextArea.textArea.addEventListener('change', () => {
      this.#pixelGrid.bitInputValue = this.#bitTextArea.value;
    });

    this.#pixelGrid = new PixelGrid(this.#widthInput.value, this.#heightInput.value);
    this.#pixelGrid.render(this.#content);
    this.#modal = new ThemeSettingsModal({ id: 'themeSettingsModal', uniqueIdPrefix: this.uniqueId, theme: 'light', comingFrom: this });
  }

  get container(): HTMLDivElement {
    return this.#container;
  }

  get uniqueId(): string {
    return this.#uniqueId;
  }

  createContainer(loaderId: string): HTMLDivElement {
    return updateElement(document.getElementById(loaderId) as HTMLDivElement, {
      addStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '50vh',
        alignContent: 'flex-start',
        borderRadius: '8px',
        boxSizing: 'border-box',
        backgroundColor: UiKitColors.neutral.white,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        rowGap: '16px',
      },
    }) as HTMLDivElement;
  }

  createContentDiv(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        boxSizing: 'border-box',
        flexDirection: 'column',
        width: '100%',
        padding: '32px',
        rowGap: '16px',
      },
    }) as HTMLDivElement;
  }

  createOptionsDiv(): HTMLDivElement {
    //create div that holds 3 divs of equal width
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        height: 'fit-content',
      },
    }) as HTMLDivElement;
  }


  createOptionItemDiv(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        flex: '1',
        maxWidth: '50%',
      },
    }) as HTMLDivElement;
  }

  switchTheme(theme: 'light' | 'dark' | 'high-contrast'): void {

    this.#header.switchTheme(theme);
    this.#colorOptions.switchTheme(theme);
    this.#widthInput.switchTheme(theme);
    this.#heightInput.switchTheme(theme);
    this.#bitInput.switchTheme(theme);
    updateElement(this.#bitTextArea.textArea, { updateClass: `textarea--md--${theme}` });
    this.#pixelGrid.switchTheme(theme);

    //update background color of pixel grid
    if (theme === 'light') {
      this.#container.style.backgroundColor = UiKitColors.neutral.white;
      this.#content.style.borderTop = 'none'
      this.#bitTextArea.errorContainer.style.color = UiKitColors.secondary.red._100;
    } else if (theme === 'dark') {
      this.#container.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.#content.style.borderTop = 'none'
      this.#bitTextArea.errorContainer.style.color = UiKitColors.attention.red._25;
    } else if (theme === 'high-contrast') {
      this.#container.style.backgroundColor = UiKitColors.neutral.black;
      this.#content.style.borderTop = '1px solid ' + UiKitColors.neutral.white;
      this.#bitTextArea.errorContainer.style.color = UiKitColors.attention.red._100;
    }

    //make all labels change color
    const labels = this.#container.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      label.style.color = theme === 'light' ? UiKitColors.neutral.black : UiKitColors.neutral.white;
    }

    // this.#bitTextArea.switchTheme(theme);
  }


}
