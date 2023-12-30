export class ImageStats {
  #redAverage: number;
  #greenAverage: number;
  #blueAverage: number;
  #redStdDev: number;
  #greenStdDev: number;
  #blueStdDev: number;
  #csvAverageText: string;
  #csvStdDevText: string;
  #csvFullAverageText: string;
  #csvFullStdDevText: string;
  #csvCombinedIndividualText: string;
  #csvCombinedFullText: string;
  results: Array<{ redAvg: number, greenAvg: number, blueAvg: number, redStd: number, greenStd: number, blueStd: number }> = [];


  constructor() {
    this.#csvAverageText = 'Red Average,Green Average,Blue Average\n';
    this.#csvStdDevText = 'Red Std Dev,Green Std Dev,Blue Std Dev\n';
    this.#csvFullAverageText = 'Red Average,Green Average,Blue Average\n';
    this.#csvFullStdDevText = 'Red Std Dev,Green Std Dev,Blue Std Dev\n';
    this.#csvCombinedIndividualText = 'Red Average,Green Average,Blue Average,Red Std Dev,Green Std Dev,Blue Std Dev\n';
    this.#csvCombinedFullText = 'Red Average,Green Average,Blue Average,Red Std Dev,Green Std Dev,Blue Std Dev\n';
  }

  async getImageData(img: HTMLImageElement): Promise<ImageData> {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get canvas context.");
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, img.width, img.height);
  }

  async calculateAverage(img: HTMLImageElement, index: number, imageData?: ImageData): Promise<{ red: number, green: number, blue: number }> {
    if (!imageData) imageData = await this.getImageData(img);
    const data = imageData.data;
    let redSum = 0,
      greenSum = 0,
      blueSum = 0;
    let nonTransparentPixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) { // Exclude transparent pixels
        redSum += data[i];
        greenSum += data[i + 1];
        blueSum += data[i + 2];
        nonTransparentPixelCount++;
      }
    }

    this.redAverage = redSum / nonTransparentPixelCount;
    this.greenAverage = greenSum / nonTransparentPixelCount;
    this.blueAverage = blueSum / nonTransparentPixelCount;

    this.#csvAverageText += `${this.redAverage},${this.greenAverage},${this.blueAverage}\n`;

    this.#csvCombinedIndividualText += `${this.redAverage},${this.greenAverage},${this.blueAverage},`;
    this.results[index] = { ...this.results[index], redAvg: this.redAverage, greenAvg: this.greenAverage, blueAvg: this.blueAverage };

    return {
      red: this.redAverage,
      green: this.greenAverage,
      blue: this.blueAverage
    };
  }

  async calculateMode(img: HTMLImageElement, index: number, imageData?: ImageData): Promise<{ red: number, green: number, blue: number }> {
    if (!imageData) imageData = await this.getImageData(img);
    const data = imageData.data;
    const colorCounts: { [key: string]: number } = {};

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) { // Exclude transparent pixels
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const colorKey = `${red},${green},${blue}`;

        if (colorCounts[colorKey]) {
          colorCounts[colorKey]++;
        } else {
          colorCounts[colorKey] = 1;
        }
      }
    }

    let modeColorKey = '';
    let maxCount = 0;

    for (const colorKey in colorCounts) {
      if (colorCounts[colorKey] > maxCount) {
        maxCount = colorCounts[colorKey];
        modeColorKey = colorKey;
      }
    }

    const [redMode, greenMode, blueMode] = modeColorKey.split(',').map((colorComponent) => parseInt(colorComponent));


    return {
      red: redMode,
      green: greenMode,
      blue: blueMode
    };
  }


  async calculateStdDev(img: HTMLImageElement, index: number): Promise<{ red: number, green: number, blue: number }> {
    const imageData = await this.getImageData(img)
    const data = imageData.data;
    let redSum = 0,
      greenSum = 0,
      blueSum = 0;
    let nonTransparentPixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) { // Exclude transparent pixels
        redSum += Math.pow(data[i] - this.redAverage, 2);
        greenSum += Math.pow(data[i + 1] - this.greenAverage, 2);
        blueSum += Math.pow(data[i + 2] - this.blueAverage, 2);
        nonTransparentPixelCount++;
      }
    }

    this.redStdDev = Math.sqrt(redSum / nonTransparentPixelCount);
    this.greenStdDev = Math.sqrt(greenSum / nonTransparentPixelCount);
    this.blueStdDev = Math.sqrt(blueSum / nonTransparentPixelCount);

    this.#csvStdDevText += `${this.redStdDev},${this.greenStdDev},${this.blueStdDev}\n`;


    this.results[index] = { ...this.results[index], redStd: this.redStdDev, greenStd: this.greenStdDev, blueStd: this.blueStdDev };

    return {
      red: this.redStdDev,
      green: this.greenStdDev,
      blue: this.blueStdDev
    };
  }

  async calculateModeForMultipleImages(images: HTMLImageElement[]): Promise<{ red: number; green: number; blue: number }> {
    const colorCounts: { [key: string]: number } = {};

    for (const img of images) {
      const imgMode = await this.calculateMode(img, 0);
      const colorKey = `${imgMode.red},${imgMode.green},${imgMode.blue}`;

      if (colorCounts[colorKey]) {
        colorCounts[colorKey]++;
      } else {
        colorCounts[colorKey] = 1;
      }
    }

    let modeColorKey = '';
    let maxCount = 0;

    for (const colorKey in colorCounts) {
      if (colorCounts[colorKey] > maxCount) {
        maxCount = colorCounts[colorKey];
        modeColorKey = colorKey;
      }
    }

    const [redMode, greenMode, blueMode] = modeColorKey.split(',').map((colorComponent) => parseInt(colorComponent));

    return {
      red: redMode,
      green: greenMode,
      blue: blueMode,
    };
  }


  async calculateAverageForMultipleImages(
    images: HTMLImageElement[]
  ): Promise<{ red: number; green: number; blue: number }> {
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;

    let i = 0;
    for (const img of images) {
      const imgAverage = await this.calculateAverage(img, i)
      redSum += imgAverage.red;
      greenSum += imgAverage.green;
      blueSum += imgAverage.blue;
      i++;
    }

    const numImages = images.length;
    this.redAverage = redSum / numImages;
    this.greenAverage = greenSum / numImages;
    this.blueAverage = blueSum / numImages;

    if (isNaN(this.redAverage)) this.redAverage = 0;
    if (isNaN(this.greenAverage)) this.greenAverage = 0;
    if (isNaN(this.blueAverage)) this.blueAverage = 0;

    return {
      red: this.redAverage,
      green: this.greenAverage,
      blue: this.blueAverage,
    };
  }

  async calculateStdDevForMultipleImages(
    images: HTMLImageElement[]
  ): Promise<{ red: number; green: number; blue: number }> {
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;

    let i = 0
    for (const img of images) {
      const imgStdDev = await this.calculateStdDev(img, i);
      redSum += imgStdDev.red;
      greenSum += imgStdDev.green;
      blueSum += imgStdDev.blue;
      i++;
    }

    const numImages = images.length;
    this.redStdDev = redSum / numImages;
    this.greenStdDev = greenSum / numImages;
    this.blueStdDev = blueSum / numImages;

    if (isNaN(this.redStdDev)) this.redStdDev = 0;
    if (isNaN(this.greenStdDev)) this.greenStdDev = 0;
    if (isNaN(this.blueStdDev)) this.blueStdDev = 0;

    return {
      red: this.redStdDev,
      green: this.greenStdDev,
      blue: this.blueStdDev,
    };
  }


  async calculateAverageForSingleImage(img: HTMLImageElement): Promise<{ red: number, green: number, blue: number }> {
    const imageData = await this.getImageData(img);
    return this.calculateAverage(img, 0, imageData);
  }

  async calculateModeForSingleImage(img: HTMLImageElement): Promise<{ red: number, green: number, blue: number }> {
    const imageData = await this.getImageData(img);
    return this.calculateMode(img, 0, imageData);
  }

  async calculateStdDevForSingleImage(img: HTMLImageElement): Promise<{ red: number, green: number, blue: number }> {
    const imageData = await this.getImageData(img);
    await this.calculateAverage(img, 0, imageData); // We need to calculate average first as it's used in std dev calculation
    return this.calculateStdDev(img, 0);
  }

  // Average
  get redAverage(): number {
    return this.#redAverage;
  }
  set redAverage(value: number) {
    this.#redAverage = this.format(value, 0, 255);
  }
  get greenAverage(): number {
    return this.#greenAverage;
  }
  set greenAverage(value: number) {
    this.#greenAverage = this.format(value, 0, 255);
  }
  get blueAverage(): number {
    return this.#blueAverage;
  }
  set blueAverage(value: number) {
    this.#blueAverage = this.format(value, 0, 255);
  }

  // Standard Deviation
  get redStdDev(): number {
    return this.#redStdDev;
  }
  set redStdDev(value: number) {
    this.#redStdDev = this.format(value, 0, 255);
  }
  get greenStdDev(): number {
    return this.#greenStdDev;
  }
  set greenStdDev(value: number) {
    this.#greenStdDev = this.format(value, 0, 255);
  }
  get blueStdDev(): number {
    return this.#blueStdDev;
  }
  set blueStdDev(value: number) {
    this.#blueStdDev = this.format(value, 0, 255);
  }

  private format(value: number, min: number, max: number): number {
    return Math.floor(Math.min(Math.max(value, min), max));
  }

  public getCombinedCsvIndividualText(): string {
    let hasAvg = false;
    let hasStd = false;

    this.results.forEach(result => {
      if (result.redAvg !== undefined || result.greenAvg !== undefined || result.blueAvg !== undefined) {
        hasAvg = true;
      }
      if (result.redStd !== undefined || result.greenStd !== undefined || result.blueStd !== undefined) {
        hasStd = true;
      }
    });

    if (hasAvg) {
      this.#csvCombinedIndividualText = `Red Avg,Green Avg,Blue Avg`;
    }
    if (hasStd) {
      this.#csvCombinedIndividualText += hasAvg ? `,Red Std Dev,Green Std Dev,Blue Std Dev\n` : `Red Std Dev,Green Std Dev,Blue Std Dev\n`;
    } else {
      this.#csvCombinedIndividualText += '\n';
    }

    this.#csvCombinedIndividualText += this.results
      .map(result => {
        const redAvg = result.redAvg !== undefined ? result.redAvg : '';
        const greenAvg = result.greenAvg !== undefined ? result.greenAvg : '';
        const blueAvg = result.blueAvg !== undefined ? result.blueAvg : '';
        const redStd = result.redStd !== undefined ? result.redStd : '';
        const greenStd = result.greenStd !== undefined ? result.greenStd : '';
        const blueStd = result.blueStd !== undefined ? result.blueStd : '';

        if (hasAvg && hasStd) {
          return `${redAvg},${greenAvg},${blueAvg},${redStd},${greenStd},${blueStd}`;
        } else if (hasAvg) {
          return `${redAvg},${greenAvg},${blueAvg}`;
        } else if (hasStd) {
          return `${redStd},${greenStd},${blueStd}`;
        } else {
          return '';
        }
      })
      .join('\n');

    return this.#csvCombinedIndividualText;
  }


  public getCombinedFullCsvText(): string {
    this.#csvCombinedFullText += `${this.redAverage},${this.greenAverage},${this.blueAverage},${this.redStdDev},${this.greenStdDev},${this.blueStdDev} \n`;
    return this.#csvCombinedFullText;
  }
}
