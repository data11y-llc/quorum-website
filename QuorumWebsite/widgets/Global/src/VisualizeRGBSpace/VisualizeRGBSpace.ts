import { Slider } from "../UiKit/atoms/slider/slider";
import { Theme, TupleToUnion } from "../UiKit/helperTypes";
import { Header } from "../UiKit/molecules/header/header";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher";
import { UiKitColors } from "../util/UiKit";
import { convertRGBValuesToEnglishNames } from "../util/colorNames";
import { createElement, updateElement } from "../util/helper.js";

export class RGBWidget {
  #id: string;

  #container: HTMLDivElement;
  #header: Header;

  #outerEnglishColorNameDiv: HTMLDivElement;
  #englishColorNameDiv: HTMLDivElement;
  #content: HTMLDivElement;
  #sliderContainer: HTMLDivElement;

  #rSlider: Slider;
  #gSlider: Slider;
  #bSlider: Slider;

  #colorBlock: HTMLDivElement;
  #themeModal: ThemeSettingsModal<RGBWidget>;
  constructor(id: string) {
    this.#id = id;
    this.#container = this.createContainer();
    this.#header = new Header({ title: 'RGB Widget', theme: 'light', uniqueId: id });

    this.#header.render(this.#container);
    this.#outerEnglishColorNameDiv = this.createEnglishColorNameDiv();
    this.#content = this.createContent();
    this.#container.appendChild(this.#content);
    this.#sliderContainer = this.createSliderContainer();
    this.#content.appendChild(this.#sliderContainer);
    this.#rSlider = new Slider({ id: id + '_r', min: 0, max: 255, step: 1, bigStep: 9, value: 0, label: 'Red Value: ', uniqueIdPrefix: id });
    this.#gSlider = new Slider({ id: id + '_g', min: 0, max: 255, step: 1, bigStep: 9, value: 0, label: 'Green Value: ', uniqueIdPrefix: id });
    this.#bSlider = new Slider({ id: id + '_b', min: 0, max: 255, step: 1, bigStep: 9, value: 0, label: 'Blue Value: ', uniqueIdPrefix: id });

    this.#sliderContainer.appendChild(this.#outerEnglishColorNameDiv);
    this.#rSlider.render(this.#sliderContainer);
    this.#gSlider.render(this.#sliderContainer);
    this.#bSlider.render(this.#sliderContainer);

    this.#colorBlock = this.createColorBlock();
    this.#content.appendChild(this.#colorBlock);

    this.#rSlider.slider.onchange = () => this.updateColorBlock();
    this.#gSlider.slider.onchange = () => this.updateColorBlock();
    this.#bSlider.slider.onchange = () => this.updateColorBlock();


    this.#themeModal = new ThemeSettingsModal<RGBWidget>({ id: id + '_themeModal', theme: 'light', uniqueIdPrefix: id, comingFrom: this });

    this.#header.settingsButton.onClick(() => {
      this.#themeModal.open();
    });
    this.#header.settingsButton.getElement().ariaLabel = 'Open Theme Settings';
  }

  createContainer() {
    const Loader = document.getElementById(this.#id) as HTMLDivElement;
    return updateElement(Loader, {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '8px',
        alignItems: 'center',
        width: '656px',
        height: '100%',
        boxSizing: 'border-box',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        rowGap: '8px',
      },
    }) as HTMLDivElement;
  }

  createEnglishColorNameDiv() {
    //make div with label and color name
    const colorNameDiv = createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: 'fit-content',
      },
    }) as HTMLDivElement;

    createElement('label', {
      textContent: 'Color',
      addStyle: { paddingLeft: '4px' },
      addClass: 'typo_text-mText',
      appendTo: colorNameDiv,
    })


    this.#englishColorNameDiv = createElement('div', {
      addClass: 'typo_text-mText',
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        paddingLeft: '10px',
        width: '100%',
        borderRadius: '4px',
        height: '33px',
        padding: '8px 16px',
        border: '1px solid black',
        //make first letter uppercase
        textTransform: 'capitalize',
      },
      ariaLive: 'polite',
      textContent: 'Black',
      appendTo: colorNameDiv,
    }) as HTMLDivElement;
    return colorNameDiv;
  }

  createContent() {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: '23px',
        boxSizing: 'border-box',
        alignItems: 'center',
        width: '100%',
        borderRadius: '10px',
        height: 'fit-content',
        backgroundColor: UiKitColors.neutral.white
      },
    })
  }

  createSliderContainer() {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        boxSizing: 'border-box',
        padding: '10px',
        rowGap: '20px',
        height: '100%',
      },
    })
  }

  createColorBlock() {
    return createElement('div', {
      addStyle: {
        width: '264px',
        height: '301px',
        backgroundColor: 'rgb(0,0,0)',
        borderRadius: '16px',
        border: `1px solid ${UiKitColors.neutral.grey._25}`,
      },
    }) as HTMLDivElement;
  }

  updateColorBlock() {
    const englishColor = convertRGBValuesToEnglishNames(this.#rSlider.value, this.#gSlider.value, this.#bSlider.value);
    this.#colorBlock.style.backgroundColor = `rgb(${this.#rSlider.value},${this.#gSlider.value},${this.#bSlider.value})`;
    this.#englishColorNameDiv.innerText = englishColor;
    // this.#rSlider.label.innerText = `Red Value: ${this.#rSlider.value}`;
    // this.#gSlider.label.innerText = `Green Value: ${this.#gSlider.value}`;
    // this.#bSlider.label.innerText = `Blue Value: ${this.#bSlider.value}`;
  }

  switchTheme(theme: TupleToUnion<Theme>) {
    this.#header.switchTheme(theme);
    this.#themeModal.switchTheme(theme);
    this.#rSlider.switchTheme(theme);
    this.#gSlider.switchTheme(theme);
    this.#bSlider.switchTheme(theme);
    if (theme === 'light') {
      this.#container.style.backgroundColor = UiKitColors.neutral.white
      this.#content.style.backgroundColor = UiKitColors.neutral.white;
      this.#outerEnglishColorNameDiv.style.color = UiKitColors.neutral.black;
      this.#englishColorNameDiv.style.backgroundColor = UiKitColors.neutral.white;
      this.#englishColorNameDiv.style.color = UiKitColors.neutral.black
      this.#englishColorNameDiv.style.border = `1px solid ${UiKitColors.neutral.black}`
      this.#colorBlock.style.border = `1px solid ${UiKitColors.neutral.grey._25}`
      this.#header.container.style.borderBottom = `none`
    } else if (theme === 'dark') {
      this.#container.style.backgroundColor = UiKitColors.neutral.grey._85;
      this.#content.style.backgroundColor = UiKitColors.neutral.grey._85;
      this.#outerEnglishColorNameDiv.style.color = UiKitColors.neutral.white;
      this.#englishColorNameDiv.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.#englishColorNameDiv.style.color = UiKitColors.neutral.white
      this.#englishColorNameDiv.style.border = `1px solid ${UiKitColors.neutral.grey._40}`
      this.#colorBlock.style.border = `1px solid ${UiKitColors.neutral.grey._50}`
      this.#header.container.style.borderBottom = `none`
    }
    else if (theme === 'high-contrast') {
      this.#container.style.backgroundColor = UiKitColors.neutral.black
      this.#outerEnglishColorNameDiv.style.color = UiKitColors.neutral.white;
      this.#englishColorNameDiv.style.backgroundColor = UiKitColors.neutral.black
      this.#englishColorNameDiv.style.color = UiKitColors.neutral.white
      this.#englishColorNameDiv.style.border = `1px solid ${UiKitColors.neutral.white}`
      this.#content.style.backgroundColor = UiKitColors.neutral.black
      this.#colorBlock.style.border = `1px solid ${UiKitColors.neutral.white}`
      this.#header.container.style.borderBottom = `1px solid ${UiKitColors.neutral.white}`
    }
  }
}
