import { UiKitColors } from "../../../../util/UiKit";
import { createElement } from "../../../../util/helper";
import { RadioGroup } from "../../../atoms/radio/radio";
import { Theme, ThemeArray, TupleToUnion, ValueOf } from "../../../helperTypes";
import { Modal } from "../modal";

interface ModalOptions<T> {
  id: string;
  uniqueIdPrefix: string;
  theme: string;
  comingFrom: T;
}
interface HasSwitchTheme {
  switchTheme(theme: ValueOf<Theme>): void;
}

function hasSwitchThemeMethod<T>(object: T): object is T & HasSwitchTheme {
  return typeof (object as any).switchTheme === 'function';
}

export class ThemeSettingsModal<T> extends Modal {
  #title: string;
  #theme: string;
  #comingFrom: T;
  #content: HTMLDivElement;
  #uniqueId: string;
  #id: string;
  #themeRadios: RadioGroup<Theme>;
  #themeHeader: HTMLHeadingElement;

  constructor(options: ModalOptions<T>) {
    const { id, uniqueIdPrefix, theme, comingFrom } = options;
    super(id, uniqueIdPrefix);

    this.#id = id;
    this.#title = 'Theme Settings';
    this.#uniqueId = uniqueIdPrefix + 'themeSettingsModal';

    this.#theme = theme;
    this.#comingFrom = comingFrom;
    this.#title = 'Theme Settings';
    this.#comingFrom.switchTheme('light');


    this.#content = this.createContent();
    this.modalElement.appendChild(this.#content);
    this.addHeader();
    this.#themeHeader = this.addHeader();
    this.content.appendChild(this.#themeHeader);
    this.#themeRadios = new RadioGroup<Theme>({ options: ThemeArray, direction: 'row', theme: 'light', disabled: false, name: 'theme', uniqueIdPrefix: 'hi', id: 'themeSwitcher' });
    this.addContent();
  }

  get theme(): string {
    return this.#theme;
  }

  set theme(theme: string) {
    this.#theme = theme;
  }

  get title(): string {
    return this.#title;
  }

  set title(title: string) {
    this.#title = title;
  }

  get comingFrom(): T {
    return this.#comingFrom;
  }

  get uniqueId(): string {
    return this.#uniqueId;
  }

  get content(): HTMLDivElement {
    return this.#content;
  }

  get id(): string {
    return this.#id;
  }

  createContent(): HTMLDivElement {
    return createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        height: '99px',
        borderRadius: '8px',
        backgroundColor: UiKitColors.neutral.grey._15,
      },
      id: this.id + 'content',
    });
  }

  addHeader() {
    return createElement('h2', {
      uniqueIdPrefix: this.uniqueId,
      addClass: 'typo_title-title4',
      addStyle: {
        display: 'flex',
        margin: '0',
        width: '100%',
        height: '36px',
        borderTopLeftRadius: 'inherit',

        //center text
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      id: 'themeSettingsModal_header',
      innerText: this.title,
    });
  }

  addContent() {
    this.#themeRadios.selectRadio('light');
    this.#themeRadios.render(this.content);
    this.#themeRadios.container.setAttribute('aria-label', 'Theme Switcher');

    this.#themeRadios.setOnChange((_, value) => {
      const theme = value as TupleToUnion<Theme>;
      if (hasSwitchThemeMethod(this.comingFrom))
        this.comingFrom.switchTheme(theme);
      this.switchTheme(theme);
    })
  }

  switchTheme(theme: TupleToUnion<Theme>) {
    this.#themeRadios.switchTheme(theme);
    if (theme === 'light') {
      this.content.style.backgroundColor = UiKitColors.neutral.grey._15;
      this.#themeHeader.style.color = UiKitColors.neutral.black;
      this.content.style.border = 'none'
      this.closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.black;
    } else if (theme === 'dark') {
      this.content.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.#themeHeader.style.color = UiKitColors.neutral.white;
      this.content.style.border = 'none'
      this.closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.white;
    } else if (theme === 'high-contrast') {
      this.content.style.backgroundColor = UiKitColors.neutral.black
      this.#themeHeader.style.color = UiKitColors.neutral.white;
      this.content.style.border = '1px solid ' + UiKitColors.neutral.white;
      //change svg in closeButton
      this.closeButton.getElementsByTagName('svg')[0].style.fill = UiKitColors.neutral.white;
    }
  }

}

