import { Button } from "../UiKit/atoms/buttons/buttons";
import { Keystroke } from "../UiKit/atoms/keystrokes/keystrokes";
import { UiKitColors } from "../util/UiKit";
import { createElement } from "../util/helper";
import { FlippyDo } from "./FlippyDo";

export class FlippyDoPro extends FlippyDo {

  constructor(id: string) {
    super(id);

    // Update the decimalArray and subscriptArray
    this.decimalArray = ['128', '64', '32', '16', '8', '4', '2', '1', '.5', '.25'];
    this.subscriptArray = ['7', '6', '5', '4', '3', '2', '1', '0', '-1', '-2'];
    // In your FlippyDoPro constructor
    const proTextNode = document.createTextNode("\u00A0Pro"); // \u00A0 is a non-breaking space
    this.header.headerTitle.appendChild(proTextNode);

    this.BinPlaceValuesContainer.contentText = '0 = 00000000.00';
    this.container.style.width = '514px';

    // Remove existing elements in numberContainer
    while (this.numberContainer.firstChild) {
      this.numberContainer.firstChild.remove();
    }

    // Re-render elements in the numberContainer
    this.decimalArray.forEach((decimal) => {
      const keystroke = new Keystroke({ id: decimal, uniqueIdPrefix: this.uniqueId }, { text: decimal, option: 'normal' });
      keystroke.render(this.numberContainer);
      keystroke.container.style.backgroundColor = UiKitColors.neutral.grey._15;
      keystroke.container.style.border = 'none';
      keystroke.container.style.width = '43px';
      keystroke.container.style.borderRadius = '8px';
      keystroke.container.style.height = '52px';
    })

    this.subscriptArray.forEach((subscript) => {
      const keystroke = new Keystroke({ id: subscript, uniqueIdPrefix: this.uniqueId }, { text: '2', option: 'normal' }, { text: subscript, option: 'subscript' });
      keystroke.render(this.numberContainer);
      keystroke.contentSpan.ariaLabel = `2^{${subscript}}`;
      keystroke.contentSpan.role = 'math';
      keystroke.container.style.backgroundColor = UiKitColors.neutral.grey._15;
      keystroke.container.style.border = 'none';
      keystroke.container.style.width = '43px';
      keystroke.container.style.height = '52px';
      keystroke.container.style.borderRadius = '8px';
    })

    // Make buttons that look like they keystrokes but are actually buttons
    for (let i = 0; i < 10; i++) {
      const button = new Button({ id: 'button' + i, uniqueIdPrefix: this.uniqueId, text: '0', className: 'keystroke' });
      button.button.style.width = '43px';
      button.button.style.height = '52px';
      button.button.role = 'switch';
      button.button.style.border = `2px solid ${UiKitColors.secondary.orange}`;
      button.button.style.borderRadius = '8px';
      button.button.ariaSelected = 'false';
      button.button.ariaLabel = `Bit ${9 - i} toggle`;
      button.button.onpointerdown = () => this.toggleButtonState(button, i);
      button.button.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ')
          this.toggleButtonState(button, i);
      }
      button.render(this.numberContainer);
    }
  }
  createNumberContainer() {
    const numberContainer = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        display: 'grid',
        // Make a grid of 3 rows and 10 columns
        gridTemplateColumns: 'repeat(10, 1fr)',
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
    const decimalExtra = parseFloat(binaryArray[8]) * 0.5 + parseFloat(binaryArray[9]) * 0.25;

    return decimal + decimalExtra;
  }

  updateNumberContainers() {
    const buttons = this.numberContainer.querySelectorAll('button.keystroke');
    const binaryArray = Array.from(buttons).map(button => button.textContent);
    const binary = binaryArray.slice(0, 8).join('');
    const binaryFraction = binaryArray.slice(8).join('');
    const decimal = this.calculateDecimal();

    const decimalPlaceValues = this._decimalArray
      .map((val, idx) => {
        if (parseFloat(binaryArray[idx]) === 1) {
          return val;
        }
        return '';
      })
      .filter(val => val)
      .join(' + ');

    this.BinPlaceValuesContainer.contentText = `${decimalPlaceValues || '0'} = ${binary}.${binaryFraction}`;
    this.DecimalNumberContainer.contentText = decimal.toString();
  }
}

