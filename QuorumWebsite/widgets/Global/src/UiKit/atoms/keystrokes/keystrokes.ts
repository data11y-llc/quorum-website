import { createElement } from "../../../util/helper";

interface KeystrokeOption {
  text: string;
  option?: 'superscript' | 'subscript' | 'normal';
}

interface KeystrokeProps {
  uniqueIdPrefix: string;
  id: string;
}

export class Keystroke {
  private _container: HTMLDivElement;
  contentSpan: HTMLSpanElement;

  constructor(props: KeystrokeProps, ...options: KeystrokeOption[]) {

    const { uniqueIdPrefix, id } = props;

    this._container = createElement('div', {
      addClass: 'keystroke',
    });

    this.contentSpan = createElement('span', {
      addClass: 'keystroke-content',
      appendTo: this.container,
    });

    options.forEach(({ text, option }, index) => {
      switch (option) {
        case 'superscript':
          createElement('span', {
            innerText: text,
            uniqueIdPrefix: uniqueIdPrefix,
            id: id + '_superscript' + index,
            appendTo: this.contentSpan,
            addClass: 'superscript',
          });
          break;
        case 'subscript':
          createElement('span', {
            innerText: text,
            uniqueIdPrefix: uniqueIdPrefix,
            id: id + '_subscript' + index,
            appendTo: this.contentSpan,
            addClass: 'subscript',
          });
          break;
        default:
          createElement('span', {
            innerText: text,
            uniqueIdPrefix: uniqueIdPrefix,
            id: id + '_normal' + index,
            appendTo: this.contentSpan,
          });
      }
    });
  }

  get container(): HTMLDivElement {
    return this._container;
  }

  render(parent: HTMLElement): void {
    parent.appendChild(this.container);
  }
}

