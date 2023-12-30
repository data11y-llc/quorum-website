import { createElement, updateElement } from "../../../util/helper.js";
import { quorumIcon, settingsIcon } from "../../atoms/icons/icons.js";
import { formatSVG } from "../../atoms/icons/showIcons.js";
import iconStyle from '../../atoms/icons/icons.scss';
import headerStyle from '../../molecules/header/header.scss';
import typoStyle from '../../foundations/typography/typography.scss';
import { Theme, TupleToUnion } from "../../helperTypes";
import { Button } from "../../atoms/buttons/buttons";

type IconClassNames = keyof typeof iconStyle & string;
type HeaderClassNames = keyof typeof headerStyle & string;
type TypoClassNames = keyof typeof typoStyle & string;
type classNames = IconClassNames | HeaderClassNames | TypoClassNames;


interface ThemeOptions {
  header: classNames;
  headerTitle: classNames;
  settingsButton: IconClassNames;
}

interface Themes {
  light: ThemeOptions;
  dark: ThemeOptions;
  'high-contrast': ThemeOptions;
}

interface HeaderOptions {
  theme: keyof Themes;
  title: string;
  uniqueId: string;
}

const headerThemes: Themes = {
  light: {
    header: 'header-light',
    headerTitle: 'typo_title-title1',
    settingsButton: 'icon-neutral__black-size-2',
  },
  dark: {
    header: 'header-dark',
    headerTitle: 'typo_title-title1',
    settingsButton: 'icon-neutral__white-size-2',
  },
  'high-contrast': {
    header: 'header-hico',
    headerTitle: 'typo_title-title1',
    settingsButton: 'icon-neutral__white-size-2',
  },
};

export class Header {
  private _theme: keyof Themes;
  private _title: string;
  private _themeStyles: ThemeOptions;
  private _uniqueId: string;

  private _container: HTMLDivElement;
  private _headerTitle: HTMLDivElement;
  private _rightSettings: HTMLDivElement;
  private _settingsButton: Button;

  constructor(options: HeaderOptions) {
    const { theme, title, uniqueId } = options;
    this._theme = theme;
    this._title = title;
    this._uniqueId = uniqueId;
    this._themeStyles = headerThemes[theme];
    this._container = this.createHeader();
    this._headerTitle = this.createHeaderTitle();
    this._rightSettings = this.createRightSettings();
    this._settingsButton = this.createSettingsButton();
  }

  get uniqueId() {
    return this._uniqueId;
  }

  get theme() {
    return this._theme;
  }

  set theme(theme: keyof Themes) {
    this._theme = theme;
  }

  get themeStyles() {
    return this._themeStyles;
  }

  set themeStyles(themeStyles: ThemeOptions) {
    this._themeStyles = themeStyles;
  }

  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get container() {
    return this._container;
  }

  set container(header: HTMLDivElement) {
    this._container = header;
  }

  get headerTitle() {
    return this._headerTitle;
  }

  set headerTitle(headerTitle: HTMLDivElement) {
    this._headerTitle = headerTitle;
  }

  get rightSettings() {
    return this._rightSettings;
  }

  set rightSettings(rightSettings: HTMLDivElement) {
    this._rightSettings = rightSettings;
  }

  get settingsButton() {
    return this._settingsButton;
  }

  set settingsButton(settingsButton: Button) {
    this._settingsButton = settingsButton;
  }

  public render(parent: HTMLDivElement) {
    parent.appendChild(this.container);
    this.adjustFontSize();
  }

  public switchTheme(theme: TupleToUnion<Theme>) {

    updateElement(this.container, { removeClass: this.themeStyles.header });
    updateElement(this.container, { addClass: headerThemes[theme].header });

    updateElement(this.headerTitle, { removeClass: this.themeStyles.headerTitle });
    updateElement(this.headerTitle, { addClass: headerThemes[theme].headerTitle });

    updateElement(this.settingsButton.getElement(), { removeClass: this.themeStyles.settingsButton });
    updateElement(this.settingsButton.getElement(), { addClass: headerThemes[theme].settingsButton });

    const newSettingsIcon = formatSVG(settingsIcon, headerThemes[theme].settingsButton);
    if (!newSettingsIcon) throw new Error('newSettingsIcon is null');
    newSettingsIcon.style.height = 'inherit';
    newSettingsIcon.style.width = '30px';
    this.settingsButton.button.innerHTML = newSettingsIcon.outerHTML;

    this.themeStyles = headerThemes[theme];
    this.theme = theme;
  }

  public addButton(button: HTMLButtonElement): void {
    this._rightSettings.prepend(button);
  }

  private createHeader(): HTMLDivElement {
    return createElement('div', {
      addClass: this.themeStyles.header,
    });
  }

  private createHeaderTitle(): HTMLDivElement {
    this._headerTitle = createElement('div', {
      appendTo: this.container,
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 'fit-content',
        alignItems: 'center',
      },
    });

    const headerIcon = formatSVG(quorumIcon, 'icon-quorum__blue__100-size-2');
    if (!headerIcon) throw new Error('headerIcon is null');
    headerIcon.style.marginRight = '0.5rem';
    headerIcon.style.height = 'inherit';
    headerIcon.style.width = '45px';
    this.headerTitle.prepend(headerIcon);

    createElement('h1', {
      innerText: this.title,
      addClass: this.themeStyles.headerTitle,
      addStyle: {
        height: 'inherit',
      },
      appendTo: this.headerTitle,
    });


    return this.headerTitle;
  }

  private createRightSettings(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        width: 'fit-content',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      appendTo: this.container,
    });
  }

  private createSettingsButton(): Button {
    const settingsIconEl = formatSVG(settingsIcon, this.themeStyles.settingsButton) as SVGElement;
    if (!settingsIconEl) throw new Error('settingsIconEl is null');
    settingsIconEl.style.height = 'inherit';
    settingsIconEl.style.width = '30px';

    //create a button with the settings icon
    const button = new Button({ icon: settingsIconEl.outerHTML, className: 'btn-icon', id: 'settings-button', uniqueIdPrefix: this.uniqueId });
    button.render(this.rightSettings);
    this._settingsButton = button;

    return this._settingsButton;
  }

  private adjustFontSize() {
    const containerWidth = this._container.clientWidth;
    const padding = 30; // You can adjust this value based on your design requirements
    const availableWidth = containerWidth - padding;
    const currentWidth = this._headerTitle.clientWidth;

    if (availableWidth < currentWidth) {
      const h1 = this._headerTitle.querySelector('h1');
      if (!h1) throw new Error('h1 is null');
      const currentFontSize = parseFloat(window.getComputedStyle(h1).fontSize);
      const adjustedFontSize = (availableWidth / currentWidth) * currentFontSize;

      h1.style.fontSize = `${adjustedFontSize}px`;
    }
  }

}

