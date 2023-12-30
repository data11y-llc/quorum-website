export class TextCompression {
  #value: string;
  #startSize: number;
  #compressionRate: number;
  #symbols: string[];
  #newLine: string;
  #compressionRules: string;
  #quote: string;
  #running: boolean;
  #mainContainer: HTMLElement;
  #textarea: HTMLTextAreaElement;
  #compressBtn: HTMLButtonElement;
  #dictionaryContainer: HTMLDivElement;
  #compressionRateContainer: HTMLDivElement;

  constructor(id: string) {
    this.#mainContainer = document.getElementById(id) as HTMLElement;


    // Create UI elements
    this.#textarea = document.createElement('textarea');
    this.#textarea.placeholder = 'Enter text to compress, or leave this.#blank to use the default text instead. Do not use any numbers.';
    this.#mainContainer.appendChild(this.#textarea);

    this.#compressBtn = document.createElement('button');
    this.#compressBtn.textContent = 'Compress';
    this.#compressBtn.addEventListener('click', () => {
      this.run();
    });
    this.#mainContainer.appendChild(this.#compressBtn);

    this.#dictionaryContainer = document.createElement('div');
    this.#mainContainer.appendChild(this.#dictionaryContainer);

    this.#compressionRateContainer = document.createElement('div');
    this.#mainContainer.appendChild(this.#compressionRateContainer);

    // Initialize properties
    this.#value = '';
    this.#startSize = 0;
    this.#compressionRate = 0;
    this.#symbols = [];
    this.#newLine = '\n';
    this.#compressionRules = '';
    this.#quote = '"';
    this.#running = false;
  }

  async run() {
    // Get value from textarea
    this.#value = this.#textarea.value.toLowerCase();

    if (this.#value === '') {
      this.#value = "she sells sea shells on the sea shore the shells that she sells are sea shells i'm sure So if she sells sea shells on the sea shore i'm sure that the shells are sea shore shells";
    }

    // Reset UI elements
    this.#compressionRules = '';
    this.#compressionRate = 0;
    this.#symbols = [];
    this.#startSize = this.#value.length;
    this.#running = true;

    // Clear dictionary container
    this.#dictionaryContainer.innerHTML = '';

    // Clear compression rate container
    this.#compressionRateContainer.innerHTML = '';

    while (this.#running) {
      const toCompress = prompt(this.#value + this.#compressionRules + this.#newLine + this.#newLine + this.#compressionRate + "%" + this.#newLine + this.#newLine + "Enter a portion of the text to compress, or leave this.#blank") || '';
      if (toCompress === '') {
        this.#running = false;
      } else {
        if (this.#compressionRules === '') {
          this.#compressionRules = this.#newLine;
        }

        const symbol = this.#symbols.length;
        this.#symbols.push(toCompress);

        while (this.#value.includes(toCompress)) {
          this.#value = this.#value.replace(toCompress, symbol.toString());
        }

        let symbolSize = 0;
        let counter = 0;

        while (counter < this.#symbols.length) {
          symbolSize = 1 + this.#symbols[counter].length;
          counter++;
        }

        this.#compressionRate = 100 - 100 * ((this.#value.length + symbolSize) / this.#startSize);
        this.#compressionRules += this.#newLine + symbol + ": " + this.#quote + toCompress + this.#quote;

        // Create dictionary item element
        const dictionaryItem = document.createElement('div');
        dictionaryItem.textContent = `${symbol}: "${toCompress}"`;
        dictionaryItem.addEventListener('click', () => {
          const selectionStart = this.#textarea.selectionStart;
          const selectionEnd = this.#textarea.selectionEnd;
          const selectedText = this.#textarea.value.substring(selectionStart, selectionEnd);
          if (selectedText === toCompress) {
            this.#textarea.setRangeText(symbol.toString(), selectionStart, selectionEnd);
          }
        });
        this.#dictionaryContainer.appendChild(dictionaryItem);
        if (this.#symbols.length >= 10) {
          console.log("Reached maximum of 10 symbols in the dictionary, stopping.");
          this.#running = false;
        }
      }
    }

    // Create compression rate element
    const compressionRateText = document.createElement('p');
    compressionRateText.textContent = `Final compression rate: ${this.#compressionRate}`;
    this.#compressionRateContainer.appendChild(compressionRateText);

    // Show dictionary and final value in console
    console.log("Final compression rate: " + this.#compressionRate);
    this.#compressionRules = this.#compressionRules.substring(1);
    console.log("Dictionary: " + this.#compressionRules);
    console.log("Final value: ");
    console.log(this.#value);
  }
}
