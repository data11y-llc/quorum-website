import { Theme, TupleToUnion, ValueOf } from "../UiKit/helperTypes";
import { createElement, getExcelLikeAddress } from "../util/helper";
import { pwColorOptions } from "./PixelWidget";
import { convertRGBValuesToEnglishNames } from '../util/colorNames.js';
import { UiKitColors } from "../util/UiKit";

export class PixelGrid {
  #outerContainer: HTMLDivElement;
  #container: HTMLDivElement;
  #initWidth: number;
  #initHeight: number;
  #width: number;
  #height: number;
  #pixels: Pixel[][] = [];

  #resetColor: string;
  #pixelBorderColor: string;

  #bitPerColor: number = 1;
  #bitInputValue: string = '';
  #colorOptions: ValueOf<pwColorOptions> = 'Black and White';

  #previousBitInputValue: string = '';
  #previousBitPerColor: number = 0;
  #previousColorOptions: ValueOf<pwColorOptions> = 'Black and White';

  constructor(width: number, height: number) {
    this.#initWidth = width;
    this.#initHeight = height;
    this.#width = 0;
    this.#height = 0;

    const containerSize = 'calc(50vh - 64px)';

    this.#outerContainer = createElement('div', {
      addStyle: {
        display: 'grid',
        boxSizing: 'border-box',
        width: containerSize,
        height: containerSize,
        maxWidth: containerSize,
        maxHeight: containerSize,
        minWidth: containerSize,
        minHeight: containerSize,
        border: `1px solid ${UiKitColors.quorum.blue._100}`,
        backgroundColor: 'transparent',
      },
    }) as HTMLDivElement;

    this.#container = createElement('div', {
      addStyle: {
        display: 'grid',
        boxSizing: 'border-box',
        width: 'fit-content',
        height: 'fit-content',
      },
    }) as HTMLDivElement;

    this.#outerContainer.appendChild(this.#container);
  }

  get colorOptions(): ValueOf<pwColorOptions> {
    return this.#colorOptions;
  }

  set colorOptions(value: ValueOf<pwColorOptions>) {
    console.log(`Setting color options to ${value}`);
    this.#colorOptions = value;
    this.updateColorPixelsIfNeeded();
  }

  get bitPerColor(): number {
    return this.#bitPerColor;
  }

  set bitPerColor(value: number) {
    console.log(`Setting bit per color to ${value}`);
    this.#bitPerColor = value;
    this.updateColorPixelsIfNeeded();
  }

  get bitInputValue(): string {
    return this.#bitInputValue;
  }

  set bitInputValue(value: string) {
    console.log(`Setting bit input value to ${value}`);
    this.#bitInputValue = value;
    this.updateColorPixelsIfNeeded();
  }


  colorPixels() {
    console.log(this.#pixels);
    if (this.#pixels.length !== 0) {
      for (let row = 0; row < this.#height; row++) {
        for (let col = 0; col < this.#width; col++) {
          const pixelIndex = row * this.#width + col;
          this.#pixels[row][col].setColorFromBitInput(this.#bitInputValue, this.#bitPerColor, this.#colorOptions, pixelIndex);
        }
      }
    }
  }


  get width(): number {
    return this.#width;
  }

  set width(value: number) {
    this.#width = value;
    this.#container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    this.resize();
    this.colorPixels();
  }

  get height(): number {
    return this.#height;
  }

  set height(value: number) {
    this.#height = value;
    this.#container.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    this.resize();
    this.colorPixels();
  }


  get pixels(): Pixel[][] {
    return this.#pixels;
  }

  get outerContainer(): HTMLDivElement {
    return this.#outerContainer;
  }

  get container(): HTMLDivElement {
    return this.#container;
  }

  updateColorPixelsIfNeeded() {
    if (this.#previousBitInputValue !== this.#bitInputValue ||
      this.#previousBitPerColor !== this.#bitPerColor ||
      this.#previousColorOptions !== this.#colorOptions) {
      this.colorPixels();
      this.#previousBitInputValue = this.#bitInputValue;
      this.#previousBitPerColor = this.#bitPerColor;
      this.#previousColorOptions = this.#colorOptions;
    }
  }


  resize() {
    console.log('Resizing pixel grid');
    const outerContainerWidth = this.#outerContainer.clientWidth;
    const outerContainerHeight = this.#outerContainer.clientHeight;
    const gridGap = 0;


    // Determine the primary dimension for resizing
    const primaryDimension = this.#width > this.#height ? this.#width : this.#height;

    // Calculate the new size based on the primary dimension
    const newSize = ((primaryDimension === this.#width ? outerContainerWidth : outerContainerHeight)) / primaryDimension;

    const pixelSize = `${newSize}px`;
    const containerWidth = this.#width * newSize + gridGap * (this.#width);
    const containerHeight = this.#height * newSize + gridGap * (this.#height);

    this.#container.style.width = `${containerWidth}px`;
    this.#container.style.height = `${containerHeight}px`;

    this.#container.style.setProperty('--pixel-size', pixelSize);
  }


  updateGrid(newWidth: number, newHeight: number) {
    console.log(`Updating grid to ${newWidth}x${newHeight}`);
    const widthDiff = newWidth - this.width;
    const heightDiff = newHeight - this.height;

    // Update height first
    if (heightDiff > 0) {
      for (let row = this.height; row < newHeight; row++) {
        for (let col = 0; col < this.width; col++) {
          const newPixel = new Pixel(col, row, this, this.#resetColor, this.#pixelBorderColor);
          this.#pixels[row] = this.#pixels[row] || [];
          this.#pixels[row][col] = newPixel;
          this.#container.appendChild(newPixel.container);
        }
      }
    } else if (heightDiff < 0) {
      for (let row = this.height - 1; row >= newHeight; row--) {
        for (let col = 0; col < this.width; col++) {
          this.#container.removeChild(this.#pixels[row][col].container);
        }
      }
    }

    // Update width
    if (widthDiff > 0) {
      for (let col = this.width; col < newWidth; col++) {
        for (let row = 0; row < newHeight; row++) {
          const newPixel = new Pixel(col, row, this, this.#resetColor, this.#pixelBorderColor);
          this.#pixels[row] = this.#pixels[row] || [];
          this.#pixels[row][col] = newPixel;
          this.#container.appendChild(newPixel.container);
        }
      }
    } else if (widthDiff < 0) {
      for (let col = this.width - 1; col >= newWidth; col--) {
        for (let row = 0; row < newHeight; row++) {
          this.#container.removeChild(this.#pixels[row][col].container);
          this.#pixels[row].pop();
        }
      }
    }

    this.width = newWidth;
    this.height = newHeight;
  }

  switchTheme(theme: TupleToUnion<Theme>) {
    //switch theme for all the pixels in the grid
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        this.#pixels[row][col].switchTheme(theme);
        if (this.#pixels[row][col].englishColorName === 'Not Set') {
          this.#pixels[row][col].uncolor();
        }
      }
    }

    if (theme === 'light') {
      this.#resetColor = '#f0f0f0';
      this.#pixelBorderColor = UiKitColors.quorum.blue._100;
      this.outerContainer.style.border = `1px solid ${UiKitColors.quorum.blue._100}`;
    } else if (theme === 'dark') {
      this.#resetColor = UiKitColors.neutral.grey._95;
      this.#pixelBorderColor = UiKitColors.neutral.grey._50;
      this.outerContainer.style.border = `1px solid ${UiKitColors.neutral.grey._50}`;

    } else if (theme === 'high-contrast') {
      this.#resetColor = UiKitColors.neutral.black;
      this.#pixelBorderColor = UiKitColors.neutral.white;
      this.outerContainer.style.border = `1px solid ${UiKitColors.neutral.white}`;
    }

  }

  render(parent: HTMLElement) {
    parent.appendChild(this.#outerContainer);


    this.updateGrid(this.#initWidth, this.#initHeight);

    // Set initial pixel size
    this.resize();

    // Update pixel size when the window is resized
    window.addEventListener('resize', () => this.resize());
  }
}


class Pixel {
  #container: HTMLDivElement;
  #color: string;
  #x: number;
  #y: number;
  #address: string;
  #gridRow: number;
  #gridColumn: number;
  #pixelGrid: PixelGrid;
  #englishColorName: string | undefined
  //make reset color a little darker than white
  #resetColor: string;
  #borderColor: string;


  constructor(x: number, y: number, pixelGrid: PixelGrid, resetColor: string = '#f0f0f0', borderColor: string = UiKitColors.quorum.blue._100) {
    this.#pixelGrid = pixelGrid;
    this.#gridRow = y + 1;
    this.#gridColumn = x + 1;
    this.#resetColor = resetColor;
    this.#borderColor = borderColor;

    this.#container = createElement('div', {
      addStyle: {
        backgroundColor: this.#resetColor,
        width: 'var(--pixel-size)',
        height: 'var(--pixel-size)',
        gridRow: this.#gridRow,
        gridColumn: this.#gridColumn,
        borderBottom: `1px solid ${this.#borderColor}`,
        borderRight: `1px solid ${this.#borderColor}`,
        boxSizing: 'border-box',
      },
      role: 'gridcell',
      tabIndex: x === 0 && y === 0 ? 0 : -1,
    }) as HTMLDivElement;

    this.#color = this.#resetColor;
    this.#x = x;
    this.#y = y;

    // Calculate the Excel-like address
    this.#address = getExcelLikeAddress(x, y);

    // Create a popup element
    const popup = createElement('div', {
      addStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        //place the popup below the pixel
        top: 'calc(var(--pixel-size) + 4px)',
        left: '0px',
        border: '1px solid black',
        padding: '4px',
        display: 'none',
        zIndex: '1',
        fontFamily: 'Montserrat',
      },
    }) as HTMLDivElement;

    // Show popup when the pixel gets focus
    this.#container.addEventListener('focus', () => {
      popup.style.display = 'block'
      popup.textContent = `Address: ${this.address}, Color: ${this.englishColorName}`;
      this.container.classList.add('cell-focused');
    });

    // Hide popup when the pixel loses focus
    this.#container.addEventListener('blur', () => {
      popup.style.display = 'none';
      this.container.classList.remove('cell-focused');
    });

    // Navigate pixels using arrow keys
    this.#container.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();

        let targetRow = this.#y;
        let targetCol = this.#x;
        switch (event.key) {
          case 'ArrowUp':
            targetRow = this.#y > 0 ? this.#y - 1 : this.#pixelGrid.height - 1;
            break;
          case 'ArrowDown':
            targetRow = this.#y < this.#pixelGrid.height - 1 ? this.#y + 1 : 0;
            break;
          case 'ArrowLeft':
            targetCol = this.#x > 0 ? this.#x - 1 : this.#pixelGrid.width - 1;
            break;
          case 'ArrowRight':
            targetCol = this.#x < this.#pixelGrid.width - 1 ? this.#x + 1 : 0;
            break;
        }

        this.#pixelGrid.pixels[targetRow][targetCol].container.focus();
        this.#pixelGrid.pixels[targetRow][targetCol].container.tabIndex = 0;
        this.#container.tabIndex = -1;
        this.#pixelGrid.pixels[targetRow][targetCol].container.classList.add('cell-focused');
        this.container.classList.remove('cell-focused');
      }
    });


    this.#container.appendChild(popup);

  }

  get color(): string {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
    this.#container.style.backgroundColor = value;
  }

  get x(): number {
    return this.#x;
  }
  set x(value: number) {
    this.#x = value;
  }

  get y(): number {
    return this.#y;
  }

  set y(value: number) {
    this.#y = value;
  }

  get container(): HTMLDivElement {
    return this.#container;
  }

  get address(): string {
    return this.#address;
  }

  set address(value: string) {
    this.#address = value;
  }

  get englishColorName(): string | undefined {
    return this.#englishColorName;
  }

  set englishColorName(value: string | undefined) {
    this.#englishColorName = value;
  }

  getColumnLetter(x: number): string {
    let columnLetter = '';
    const baseCharCode = 65; // ASCII code for 'A'

    do {
      columnLetter = String.fromCharCode(baseCharCode + x % 26) + columnLetter;
      x = Math.floor(x / 26) - 1;
    } while (x >= 0);

    return columnLetter;
  }

  binaryToDecimal(bitInputString: string) {
    //convert bitInput to decimal
    let decimal = 0;
    const bitInputArray = bitInputString.split('');
    let fullValue = 0;
    for (let i = 0; i < bitInputArray.length; i++) {
      decimal += +bitInputArray[i] * Math.pow(2, bitInputArray.length - i - 1);
      fullValue += 1 * Math.pow(2, bitInputArray.length - i - 1);
    }

    const rgb = 255 / fullValue;
    const rgbDecimal = decimal * rgb;
    return rgbDecimal;
  }

  focusOnNextElement() {
    if (this.#pixelGrid.outerContainer.parentElement) {
      const nextFocusableElement = this.#container.nextElementSibling || this.#pixelGrid.outerContainer.parentElement.nextElementSibling;
      if (nextFocusableElement) {
        (nextFocusableElement as HTMLElement).focus();
      }
    }
  }


  setColorFromBitInput(bitInputValue: string, bitPerColor: number, colorOptions: ValueOf<pwColorOptions>, pixelIndex: number) {
    this.uncolor();
    const bitString = bitInputValue
    const startIndex = pixelIndex * bitPerColor;
    const endIndex = startIndex + bitPerColor;

    if (bitString.length >= endIndex) {
      const groupBits = bitString.slice(startIndex, endIndex);

      if (colorOptions === 'Black and White') {
        const B_W = this.binaryToDecimal(groupBits);
        const color = `rgb(${B_W},${B_W},${B_W})`;
        this.englishColorName = convertRGBValuesToEnglishNames(B_W, B_W, B_W);
        this.color = color;
      } else if (colorOptions === 'Full Color') {
        let rBits, gBits, bBits;

        if (bitPerColor === 1) {
          rBits = bitString.charAt(startIndex * 3);
          gBits = bitString.charAt(startIndex * 3 + 1);
          bBits = bitString.charAt(startIndex * 3 + 2);
        } else {
          rBits = bitString.slice(startIndex * 3, startIndex * 3 + bitPerColor);
          gBits = bitString.slice(startIndex * 3 + bitPerColor, startIndex * 3 + (bitPerColor * 2));
          bBits = bitString.slice(startIndex * 3 + (bitPerColor * 2), startIndex * 3 + (bitPerColor * 3));
        }

        if (bitString.length >= startIndex * 3 + (bitPerColor * 3)) {
          const r = this.binaryToDecimal(rBits);
          const g = this.binaryToDecimal(gBits);
          const b = this.binaryToDecimal(bBits);

          this.color = `rgb(${r},${g},${b})`;
          this.englishColorName = convertRGBValuesToEnglishNames(r, g, b);
        }
      }
    }
  }

  uncolor() {
    this.color = this.#resetColor;
    this.englishColorName = 'Not Set';
  }

  switchTheme(theme: TupleToUnion<Theme>) {
    if (theme === 'light') {
      this.#resetColor = '#f0f0f0';
      this.#borderColor = UiKitColors.quorum.blue._100;
      this.container.style.borderRight = `1px solid ${this.#borderColor}`
      this.container.style.borderBottom = `1px solid ${this.#borderColor}`
    } else if (theme === 'dark') {
      this.#resetColor = UiKitColors.neutral.grey._95;
      this.#borderColor = UiKitColors.neutral.grey._50;
      this.container.style.borderRight = `1px solid ${this.#borderColor}`
      this.container.style.borderBottom = `1px solid ${this.#borderColor}`
    } else if (theme === 'high-contrast') {
      this.#resetColor = UiKitColors.neutral.black;
      this.#borderColor = UiKitColors.neutral.white;
      this.container.style.borderRight = `1px solid ${this.#borderColor}`
      this.container.style.borderBottom = `1px solid ${this.#borderColor}`
    }
  }
}

