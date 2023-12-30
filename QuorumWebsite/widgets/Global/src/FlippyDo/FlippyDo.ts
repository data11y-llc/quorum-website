import type * as Style from 'csstype';
import { createElement, updateElement } from '../util/helper';
import { Header } from '../UiKit/molecules/header/header';
import { UiKitColors } from '../util/UiKit';
import { Keystroke } from '../UiKit/atoms/keystrokes/keystrokes';
import { Button } from '../UiKit/atoms/buttons/buttons';
import { ThemeSettingsModal } from '../UiKit/molecules/modals/themeSwitcher/themeSwitcher';
import { Theme, TupleToUnion } from '../UiKit/helperTypes';

export class FlippyDo {
  #container: HTMLDivElement;
  #uniqueId: string;
  #header: Header;
  #content: HTMLDivElement;
  #numberContainer: HTMLDivElement;
  #instructions: HTMLDivElement;
  public _decimalArray = ['128', '64', '32', '16', '8', '4', '2', '1'];
  public _subscriptArray = ['7', '6', '5', '4', '3', '2', '1', '0'];
  #activeBackgroundColor: string = UiKitColors.secondary.orange;
  #inactiveBackgroundColor: string = UiKitColors.neutral.white;
  #liveRegion: HTMLDivElement;

  #BinPlaceValuesContainer: NumberContainer;
  #DecimalNumberContainer: NumberContainer

  private readonly containerStyle: Style.Properties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '420px',
    height: '665px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    //make a big shadow
    boxShadow: '0px 16px 16px rgba(0, 0, 0, 0.1)',
    margin: '40px',
  }

  constructor(id: string) {
    this.#uniqueId = id;
    this.#container = document.getElementById(id) as HTMLDivElement;
    updateElement(this.container, { addStyle: this.containerStyle });

    //create live region
    this.#liveRegion = document.createElement('div');
    this.#liveRegion.setAttribute('aria-live', 'polite');
    this.#liveRegion.setAttribute('aria-atomic', 'true');
    this.#liveRegion.style.position = 'absolute';
    this.#liveRegion.style.width = '1px';
    this.#liveRegion.style.height = '1px';
    this.#liveRegion.style.marginTop = '-1px';
    this.#liveRegion.style.whiteSpace = 'nowrap';
    //make the live region not visible
    this.#liveRegion.style.display = 'hidden';
    //hide from page, dont use clip as its deprecated and doesnt work in all browsers
    this.#liveRegion.style.clipPath = 'rect(0, 0, 0, 0)';
    this.#liveRegion.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';

    this.container.appendChild(this.#liveRegion);

    this.#header = new Header({ title: 'FlippyDo', theme: 'light', uniqueId: this.#uniqueId });
    this.header.settingsButton.getElement().ariaLabel = "Open theme switcher modal";
    this.header.container.style.borderRadius = '16px 16px 0 0';

    this.header.render(this.container);
    this.#content = this.createContentContainer();
    this.container.appendChild(this.#content);

    //content
    this.#instructions = this.createInstuctions();
    this.content.appendChild(this.#instructions);

    this.#numberContainer = this.createNumberContainer();
    this.content.appendChild(this.#numberContainer);

    this.decimalArray.forEach((decimal) => {
      const keystroke = new Keystroke({ id: decimal, uniqueIdPrefix: this.#uniqueId }, { text: decimal, option: 'normal' });
      keystroke.render(this.#numberContainer);
      keystroke.container.style.backgroundColor = UiKitColors.neutral.grey._15;
      keystroke.container.style.border = 'none';
      keystroke.container.style.width = '43px';
      keystroke.container.style.borderRadius = '8px';
      keystroke.container.style.height = '52px';
    })

    this.subscriptArray.forEach((subscript) => {
      const keystroke = new Keystroke({ id: subscript, uniqueIdPrefix: this.#uniqueId }, { text: '2', option: 'normal' }, { text: subscript, option: 'subscript' });
      keystroke.render(this.#numberContainer);
      keystroke.contentSpan.ariaLabel = `2^{${subscript}}`;
      keystroke.contentSpan.role = 'math';
      keystroke.container.style.backgroundColor = UiKitColors.neutral.grey._15;
      keystroke.container.style.border = 'none';
      keystroke.container.style.width = '43px';
      keystroke.container.style.height = '52px';
      keystroke.container.style.borderRadius = '8px';
    })

    //make buttons that look like they keystrokes but are actually buttons
    for (let i = 0; i < 8; i++) {
      const button = new Button({ id: 'button' + i, uniqueIdPrefix: this.#uniqueId, text: '0', className: 'keystroke' });
      button.button.style.width = '43px';
      button.button.style.height = '52px';
      button.button.role = 'switch';
      button.button.style.border = `2px solid ${UiKitColors.secondary.orange}`;
      button.button.style.borderRadius = '8px';
      button.button.ariaSelected = 'false';
      button.button.ariaLabel = `Bit ${7 - i} toggle`;
      button.button.onpointerdown = () => this.toggleButtonState(button, i);
      button.button.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ')
          this.toggleButtonState(button, i);
      }
      button.render(this.#numberContainer);
    }

    this.#BinPlaceValuesContainer = new NumberContainer({ id: 'BinPlaceValuesContainer', uniqueIdPrefix: this.#uniqueId, text: 'Binary Place Values', contentText: '0 = 00000000' });
    this.#BinPlaceValuesContainer.header.style.backgroundColor = UiKitColors.neutral.grey._25;
    this.content.appendChild(this.#BinPlaceValuesContainer.container);

    this.#DecimalNumberContainer = new NumberContainer({ id: 'DecimalNumberContainer', uniqueIdPrefix: this.#uniqueId, text: 'Decimal Number', contentText: '0' });
    this.#DecimalNumberContainer.header.style.backgroundColor = UiKitColors.quorum.blue._100;
    this.#DecimalNumberContainer.header.style.color = UiKitColors.neutral.white;
    this.#DecimalNumberContainer.content.style.fontSize = '32px';
    this.content.appendChild(this.#DecimalNumberContainer.container);

    const settingsModal = new ThemeSettingsModal({ id: 'theme-settings-modal', uniqueIdPrefix: this.#uniqueId, theme: 'light', comingFrom: this })
    updateElement(this.header.settingsButton.getElement(), {
      onclick: () => { settingsModal.open(); },
      onkeydown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          settingsModal.open()
        }
      },
    })
  }

  get decimalArray(): string[] {
    return this._decimalArray;
  }
  set decimalArray(array: string[]) {
    this._decimalArray = array;
  }

  get subscriptArray(): string[] {
    return this._subscriptArray;
  }

  set subscriptArray(array: string[]) {
    this._subscriptArray = array;
  }

  get numberContainer(): HTMLDivElement {
    return this.#numberContainer;
  }

  get container(): HTMLDivElement {
    return this.#container;
  }

  get uniqueId(): string {
    return this.#uniqueId;
  }

  get header(): Header {
    return this.#header;
  }

  get content(): HTMLDivElement {
    return this.#content;
  }

  get instructions(): HTMLDivElement {
    return this.#instructions;
  }

  set activeBackgroundColor(color: string) {
    this.#activeBackgroundColor = color;
  }

  get activeBackgroundColor(): string {
    return this.#activeBackgroundColor;
  }

  set inactiveBackgroundColor(color: string) {
    this.#inactiveBackgroundColor = color;
  }

  get inactiveBackgroundColor(): string {
    return this.#inactiveBackgroundColor;
  }

  get BinPlaceValuesContainer(): NumberContainer {
    return this.#BinPlaceValuesContainer;
  }

  get DecimalNumberContainer(): NumberContainer {
    return this.#DecimalNumberContainer;
  }

  updateLiveRegion(message: string) {
    this.#liveRegion.textContent = message;
  }

  toggleButtonState(button: Button, i: number) {
    if (button.button.ariaSelected === 'true') {
      button.button.style.backgroundColor = this.inactiveBackgroundColor;
      button.button.ariaSelected = 'false';
      button.text = '0';
    } else {
      button.button.style.backgroundColor = this.#activeBackgroundColor;
      button.button.ariaSelected = 'true';
      button.text = '1';
    }
    this.updateNumberContainers();
    this.updateLiveRegion(`Bit ${7 - i} changed to ${button.text}`);
  }


  createNumberContainer() {
    const numberContainer = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        display: 'grid',
        // Make a grid of 3 rows and 8 columns
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: '1fr 1fr 1.5fr', // Give the last row double the size
        justifyItems: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '0',
        boxSizing: 'border-box',
        height: 'fit-content',
      },
      id: 'numberContainer',
    });

    return numberContainer;
  }

  calculateDecimal() {
    const buttons = this.numberContainer.querySelectorAll('button.keystroke');
    const binaryArray = Array.from(buttons).map(button => button.textContent);
    const binary = binaryArray.slice(0, 8).join('');
    const decimal = parseInt(binary, 2);

    return decimal;
  }

  updateNumberContainers() {
    const buttons = this.numberContainer.querySelectorAll('button.keystroke');
    const binaryArray = Array.from(buttons).map(button => button.textContent);
    const binary = binaryArray.slice(0, 8).join('');
    const decimal = this.calculateDecimal();

    const decimalPlaceValues = this.decimalArray
      .map((val, idx) => {
        if (parseFloat(binaryArray[idx]) === 1) {
          return val;
        }
        return '';
      })
      .filter(val => val)
      .join(' + ');

    this.BinPlaceValuesContainer.contentText = `${decimalPlaceValues || '0'} = ${binary}`;
    this.DecimalNumberContainer.contentText = decimal.toString();
  }

  createContentContainer() {
    const content = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //give gap 16px
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box',
        height: '100%',
        borderRadius: '0 0 16px 16px',
        backgroundColor: '#fff',
        padding: '20px',
      },
      id: 'content',
    });

    return content;
  }

  createInstuctions() {
    const instructions = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        alignSelf: 'flex-start',

      },
      id: 'instructions',
    });

    //add p tag with instructions
    const header = createElement('h2', {
      addClass: 'typo_title-title4',
      addStyle: {
        margin: '0',
      },
      uniqueIdPrefix: this.uniqueId,
      id: 'instructions_p',
    });
    header.innerText = 'Instructions';

    //add p tag with instructions
    const p = createElement('p', {
      uniqueIdPrefix: this.uniqueId,
      addClass: 'typo_text-mText',
      addStyle: {
        margin: '0',
      },
      id: 'instructions_p',
    });
    p.innerText = 'Select the button\n to flip the bits!';

    instructions.appendChild(header);
    instructions.appendChild(p);

    return instructions;
  }



  switchTheme(theme: TupleToUnion<Theme>) {
    // Define theme-specific style values
    type themeColorType = { [key in TupleToUnion<Theme>]: any };
    const themeColors: themeColorType = {
      light: {
        bg: UiKitColors.neutral.white,
        text: UiKitColors.neutral.black,
        keystrokeBg: UiKitColors.neutral.grey._15,
        keyStrokeText: UiKitColors.neutral.black,
        headerBg: UiKitColors.neutral.grey._25,
        headerBorder: `none`,
        buttonBg: UiKitColors.neutral.white,
        buttonText: UiKitColors.neutral.black,
        border: `1px solid ${UiKitColors.neutral.grey._25}`,
        numContentBg: UiKitColors.neutral.grey._15,
      },
      dark: {
        bg: UiKitColors.neutral.grey._75,
        text: UiKitColors.neutral.white,
        keystrokeBg: UiKitColors.neutral.grey._50,
        keyStrokeText: UiKitColors.neutral.white,
        headerBg: UiKitColors.neutral.grey._40,
        headerBorder: `none`,
        buttonBg: UiKitColors.neutral.grey._75,
        buttonText: UiKitColors.neutral.white,
        border: `1px solid ${UiKitColors.neutral.grey._50}`,
        numContentBg: UiKitColors.neutral.grey._65,
      },
      'high-contrast': {
        bg: UiKitColors.neutral.black,
        text: UiKitColors.neutral.white,
        keystrokeBg: UiKitColors.neutral.white,
        keyStrokeText: UiKitColors.neutral.black,
        headerBg: UiKitColors.neutral.black,
        headerBorder: `1px solid ${UiKitColors.neutral.white}`,
        buttonBg: UiKitColors.neutral.black,
        buttonText: UiKitColors.neutral.white,
        border: `1px solid ${UiKitColors.neutral.white}`,
        numContentBg: UiKitColors.neutral.black,
      },
    };

    // Set the styles of an element
    const setStyles = (element, styles) => {
      for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
      }
    };

    // Switch header theme
    this.header.switchTheme(theme);

    // Set content background color
    setStyles(this.content, { backgroundColor: themeColors[theme].bg, borderTop: themeColors[theme].headerBorder });

    // Update keystrokes colors
    const elements = this.container.querySelectorAll('button.keystroke, div.keystroke');
    elements.forEach(el => {
      if (el.tagName === 'DIV') {
        setStyles(el, {
          backgroundColor: themeColors[theme].keystrokeBg,
          color: themeColors[theme].keyStrokeText,
        });
      } else {
        setStyles(el, {
          backgroundColor: themeColors[theme].buttonBg,
          color: themeColors[theme].buttonText,
        });
        this.inactiveBackgroundColor = themeColors[theme].buttonBg;
      }
    });

    // Set BinPlaceValuesContainer and DecimalNumberContainer styles
    const containers = [
      this.#BinPlaceValuesContainer,
      this.#DecimalNumberContainer,
    ];

    containers.forEach(container => {
      setStyles(container.container, {
        border: themeColors[theme].border,
        color: themeColors[theme].text,
      });

      setStyles(container.header, {
        backgroundColor: themeColors[theme].headerBg,
        borderBottom: themeColors[theme].headerBorder,
      });
      setStyles(container.content, { backgroundColor: themeColors[theme].numContentBg });
    });

    if (theme === 'light') {
      this.#DecimalNumberContainer.header.style.backgroundColor = UiKitColors.quorum.blue._100;
      this.#DecimalNumberContainer.header.style.color = "#202020"

    } else if (theme === 'dark') {
      this.#DecimalNumberContainer.header.style.backgroundColor = UiKitColors.quorum.blue._50;
      this.#DecimalNumberContainer.header.style.color = UiKitColors.neutral.black
    } else if (theme === 'high-contrast') {
      this.#DecimalNumberContainer.header.style.backgroundColor = UiKitColors.text.hico.blue
      this.#DecimalNumberContainer.header.style.color = UiKitColors.neutral.black
    }


    // Set container text color
    this.container.style.color = theme === 'light' ? '#000' : '#fff';
  }


  //end class
}

interface NumberContainerProps {
  id: string;
  uniqueIdPrefix: string;
  text: string;
  contentText: string;
}

class NumberContainer {
  #uniqueId: string;
  #id: string;
  #headerText: string;
  #header: HTMLHeadingElement;
  #container: HTMLDivElement;
  #content: HTMLDivElement;
  #contentText: string;
  #liveRegion: HTMLDivElement;

  constructor(options: NumberContainerProps) {
    const { id, uniqueIdPrefix, text } = options;
    this.#id = id;
    this.#uniqueId = uniqueIdPrefix + 'numberContainer';
    this.#container = this.createNumberContainer();
    this.#headerText = text;
    this.#header = this.createHeader();
    this.#container.appendChild(this.#header);

    this.#liveRegion = this.createLiveRegion();
    this.#container.appendChild(this.#liveRegion);
    this.#contentText = options.contentText;


    //make the content container that fills the rest
    this.#content = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addClass: 'typo_title-title5',
      innerText: this.#contentText,
      addStyle: {
        display: 'flex',
        boxSizing: 'border-box',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        //make height the rest of the container after the header
        height: 'calc(100% - 36px)',
      },
      id: id + 'content',
    });

    this.#container.appendChild(this.#content);
    this.initContentObserver();
  }

  get container(): HTMLDivElement {
    return this.#container;
  }

  get content(): HTMLDivElement {
    return this.#content;
  }

  get headerText(): string {
    return this.#headerText;
  }

  set headerText(text: string) {
    this.#headerText = text;
    this.#header.innerText = text;
  }

  get uniqueId(): string {
    return this.#uniqueId;
  }

  get header(): HTMLHeadingElement {
    return this.#header;
  }

  get id(): string {
    return this.#id;
  }

  get contentText(): string {
    return this.#contentText;
  }

  set contentText(text: string) {
    this.#contentText = text;
    this.#content.innerText = text;
  }

  createLiveRegion() {
    const liveRegion = createElement('div', {
      addStyle: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
      id: this.#uniqueId + '_liveRegion',
    });

    liveRegion.setAttribute('aria-live', 'polite');
    return liveRegion;
  }

  initContentObserver() {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const liveText = `
          Value: ${this.headerText},
          Changed To: ${this.contentText}
          `;
          this.#liveRegion.textContent = liveText;
        }
      }
    });

    observer.observe(this.#content, { childList: true, characterData: true, subtree: true });
  }

  createNumberContainer() {
    const decimalNumberContainer = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        height: '99px',
        borderRadius: '8px',
        backgroundColor: UiKitColors.neutral.grey._15,
      },
      id: this.id,
    });

    return decimalNumberContainer;
  }

  createHeader() {
    const header = createElement('h2', {
      uniqueIdPrefix: this.uniqueId,
      addClass: 'typo_title-title4',
      addStyle: {
        display: 'flex',
        margin: '0',
        width: '100%',
        height: '36px',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        boxSizing: 'border-box',

        //center text
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      id: 'decimalNumberContainer_header',
      innerText: this.headerText,
    });
    return header;
  }
}

