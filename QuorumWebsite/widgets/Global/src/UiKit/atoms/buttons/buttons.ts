import { createElement } from "../../../util/helper";
import buttonStyles from './buttons.scss';
import keystrokeStyles from '../keystrokes/keystrokes.scss';

type buttonClassNames = keyof typeof buttonStyles;
type keystrokeClassNames = keyof typeof keystrokeStyles;


interface SingleButtonProps {
  className: buttonClassNames | keystrokeClassNames;
  /** used to create unique id for each button */
  uniqueIdPrefix: string;
  id: string;
  text?: string;
  icon?: string;
  iconSize?: "xsmall" | "small" | "medium" | "large";
  disabled?: boolean;
  title?: string;
}

export class Button {
  private _button: HTMLButtonElement;
  private _disabled: boolean;


  constructor(props: SingleButtonProps) {
    const { className, text, icon, iconSize, uniqueIdPrefix, id, title } = props;

    this._disabled = false;

    if (icon && text) {
      //make sure the icon width and height fits in the button
      let newIcon;
      if (iconSize == 'xsmall') {
        newIcon = icon.replace(/width=".*?"/, 'width="15px"').replace(/height=".*?"/, 'height="15px"');
      } else if (iconSize == 'small') {
        newIcon = icon.replace(/width=".*?"/, 'width="20px"').replace(/height=".*?"/, 'height="20px"');
      } else if (iconSize == 'medium') {
        newIcon = icon.replace(/width=".*?"/, 'width="30px"').replace(/height=".*?"/, 'height="30px"');
      } else if (iconSize == 'large') {
        newIcon = icon.replace(/width=".*?"/, 'width="40px"').replace(/height=".*?"/, 'height="40px"');
      } else {
        newIcon = icon;
      }
      this._button = createElement('button', {
        addClass: className,

        uniqueIdPrefix: uniqueIdPrefix,
        id: id,
        innerHTML: newIcon + '&nbsp;' + text,
        ...(title && { title: title })
      });
    } else if (icon) {
      this._button = createElement('button', {
        addClass: className,
        uniqueIdPrefix: uniqueIdPrefix,
        id: id,
        innerHTML: icon,
        ...(title && { title: title })
      });
    } else {
      this._button = createElement('button', {
        uniqueIdPrefix: uniqueIdPrefix,
        id: id,
        addClass: className,
        textContent: text,
        ...(title && { title: title })
      });
    }
  }

  get button(): HTMLButtonElement {
    return this._button;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.button.disabled = disabled;
  }

  get text(): string {
    return this.button.textContent || '';
  }

  set text(newText: string) {
    this.button.textContent = newText;
  }

  getElement(): HTMLButtonElement {
    return this.button;
  }

  onClick(callback: () => void): void {
    const newCallback = () => {
      console.log('button clicked');
      callback();
    };
    this.button.onclick = newCallback;
  }

  public changeIcon(newIcon: string): void {
    console.log('changing icon');
    console.log(newIcon);
    console.log(this.button.textContent);

    // Clear out old content first
    this.button.innerHTML = '';

    // Create a dummy div to parse the SVG string into an actual SVG element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newIcon;
    const svgElement = tempDiv.firstChild;

    // Append the SVG element and the text separately
    this.button.appendChild(svgElement);

    // Create a text node for the text content to avoid HTML encoding issues
    const textNode = document.createTextNode("\u00A0" + this.button.textContent); // \u00A0 is for a non-breaking space
    this.button.appendChild(textNode);
  }

  public render(parent: HTMLElement): void {
    parent.appendChild(this.button);
  }

  public destroy(): void {
    this.button.remove();
  }

}

