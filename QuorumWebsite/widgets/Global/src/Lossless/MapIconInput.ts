import { createElement } from "../util/helper";
import { iconMap } from "./iconMap";

export class MapTextInput {
  private container: HTMLDivElement;
  private textArea: HTMLTextAreaElement;
  private lineNumbers: HTMLElement;
  liveRegion: HTMLElement;
  private currentLine: number = 0;
  iconValueMap: { [key: string]: { icon: string, value: string } } = {}; // Add this line
  private callback: (newMap: { [key: string]: { icon: string, value: string } }) => void;
  private uniqueId: string;
  private lastLineCount: number = 0;
  private chWidth: number;


  constructor(id: string, parent: HTMLDivElement, callback: (newMap: { [key: string]: { icon: string, value: string } }) => void) {
    this.uniqueId = id;
    this.callback = callback;

    // Create container for heading and the main div
    const wrapperContainer = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      id: 'outerTextInputContainer',
      addStyle: {
        display: 'flex',
        height: '50ch',
        flexDirection: 'column',
        backgroundColor: 'lightgrey',
        borderRadius: '8px',
      },
      appendTo: parent,
    });

    // Create heading
    createElement('h3', {
      uniqueIdPrefix: this.uniqueId,
      id: 'repeatedWordsHeading',
      textContent: 'Enter repeated words',
      addStyle: {
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'left',
        fontSize: '16px',
        marginLeft: '16px',
        fontWeight: 'bold',
      },
      appendTo: wrapperContainer,
    });

    // Create main container
    this.container = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      id: 'mapTextInputContainer',
      addStyle: {
        display: 'flex',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f2f2f2',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        paddingBottom: '16px',
      },
      appendTo: wrapperContainer,
    });

    // Create line numbers container
    this.lineNumbers = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      id: 'lineNumbers',
      addClass: 'lossless-line-number',
      appendTo: this.container,
    });


    // Create text area
    this.textArea = createElement('textarea', {
      uniqueIdPrefix: this.uniqueId,
      id: 'textArea',
      addClass: 'lossless-text-area',
      spellcheck: false,
      appendTo: this.container,
    });

    // Set up event listeners
    this.liveRegion = createElement('div', {
      addStyle: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
      ariaLive: 'polite',
      appendTo: parent,
    });

    // Set up event listeners
    this.textArea.addEventListener('input', this.onInput.bind(this));
    this.textArea.addEventListener('scroll', this.scroll.bind(this));
    this.textArea.addEventListener('click', this.onClick.bind(this));
    this.textArea.addEventListener('keyup', this.onKeyUp.bind(this));

    // Initial update
    this.updateTextAndCursor();
    this.updateLineNumberAndSvg();
    this.scroll();

    window.addEventListener('resize', this.calculateColumns.bind(this));
  }

  private onInput() {
    const newLineCount = this.textArea.value.split('\n').length;
    if (newLineCount < this.lastLineCount) {
      this.removeDeletedLineKeys(newLineCount);
    }
    this.lastLineCount = newLineCount;

    this.updateTextAndCursor();
    this.updateLineNumberAndSvg();
    this.logIconValueMap();
    this.calculateColumns();
  }

  private onClick() {
    this.updateLineNumberAndSvg();
  }

  private onKeyUp() {
    this.updateLineNumberAndSvg();
  }

  private updateTextAndCursor() {
    let text = this.textArea.value;
    const cursorStart = this.textArea.selectionStart;
    text = text.replace(/ /g, '_');
    this.textArea.value = text;
    this.textArea.setSelectionRange(cursorStart, cursorStart);
  }

  private removeDeletedLineKeys(newLineCount: number) {
    const keys = Object.keys(this.iconValueMap);
    for (let i = newLineCount; i < this.lastLineCount; i++) {
      if (keys[i]) {
        delete this.iconValueMap[keys[i]];
      }
    }
  }


  private updateLineNumberAndSvg() {
    const text = this.textArea.value;
    const cursorStart = this.textArea.selectionStart;
    const lines = text.split('\n');
    const iconKeys = Object.keys(iconMap);
    const currentLine = text.substr(0, cursorStart).split('\n').length;
    let lineNumbersHtml = '';

    if (this.currentLine !== currentLine && currentLine <= iconKeys.length) {
      const svgKey = iconKeys[currentLine - 1];
      this.liveRegion.textContent = `Moved to line with icon: ${svgKey}`;
      this.currentLine = currentLine;
    }

    for (let i = 0; i < lines.length; i++) {
      const requiredHeight = this.calculateRequiredHeight(lines[i]);
      const { svgIcon, classToApply } = this.getSvgAndClass(i, iconKeys, currentLine);

      lineNumbersHtml += `<div class="${classToApply}" style="height:${requiredHeight}px">${svgIcon}</div>`;

      if (svgIcon) {
        const svgKey = iconKeys[i];
        this.iconValueMap[svgKey] = { icon: svgIcon, value: lines[i] };
      }
    }
    this.lineNumbers.innerHTML = lineNumbersHtml;
  }

  private logIconValueMap() {
    this.callback(this.iconValueMap);
  }

  private calculateRequiredHeight(line: string): number {
    const numChars = line.length;
    const charsPerLine = this.chWidth;
    const lineHeight = 24;

    const requiredHeight = Math.ceil(numChars / charsPerLine) * lineHeight;
    return Math.max(requiredHeight, lineHeight);
  }

  private getSvgAndClass(index: number, svgKeys: string[], currentLine: number) {
    let svgIcon = '';
    let classToApply = 'lossless-line-number';
    if (index < svgKeys.length) {
      const svgKey = svgKeys[index];
      svgIcon = iconMap[svgKey];
    }
    if (currentLine === index + 1) {
      classToApply = 'lossless-line-number active';
    }
    return { svgIcon, classToApply };
  }

  private scroll() {
    this.lineNumbers.scrollTop = this.textArea.scrollTop;
  }

  // Function to calculate the number of columns in a textarea
  private calculateColumns() {
    // Get the computed styles of the textarea
    const computedStyle = window.getComputedStyle(this.textArea);

    // Calculate the actual width by considering the padding and border
    const actualWidth = this.textArea.clientWidth
      - parseFloat(computedStyle.paddingLeft)
      - parseFloat(computedStyle.paddingRight)
      - parseFloat(computedStyle.borderLeftWidth)
      - parseFloat(computedStyle.borderRightWidth);

    // Get the font size and family
    const fontFamily = computedStyle.getPropertyValue('font-family');
    const fontSize = computedStyle.getPropertyValue('font-size');

    // Create a canvas element to measure the width of a character
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${fontSize} ${fontFamily}`;

    // Measure the width of a character (assuming monospace font)
    const charWidth = ctx.measureText("W").width;

    // Calculate the number of columns
    const columns = Math.floor(actualWidth / charWidth);

    this.chWidth = columns
    this.updateLineNumberAndSvg();
  }
}

