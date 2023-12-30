import { FaceDetector } from "./FaceDetector.js";
import * as faceapi from 'face-api.js';
import { PixelatedImageCarousel } from "./PixelatedImageCarousel.js";
import { createElement } from "../util/helper.js";
import { ImageStats } from "../util/ImageStats.js";
import { convertRGBValuesToEnglishNames } from "../util/colorNames.js";
import { ValueOf } from "../UiKit/helperTypes.js";
import { FaceDetectionOptions } from "./Settings.js";

export class TileCreator {
  uniqueId: string;
  container: HTMLDivElement;
  grid: HTMLDivElement[][];
  numRows: number;
  numCols: number;
  imageSrc: string;

  onTileClick: (row: number, col: number, tile: string | string[], zoomDelay: boolean) => void;
  selectedTiles: Set<string>;
  imageCarousel: PixelatedImageCarousel;
  faceDetector: FaceDetector;
  nosePoints: faceapi.Point[] | null = null;
  autoDetect: ValueOf<FaceDetectionOptions>;

  imageStats: ImageStats | null = null;
  zoomDelay: boolean;

  constructor(id: string, imageSrc: string, imageCarousel: PixelatedImageCarousel, selectedTiles: Set<string>, onTileClick: (row: number, col: number, tile: string | string[], zoomDelay: boolean) => void, faceDetector: FaceDetector, autoDetect: ValueOf<FaceDetectionOptions>, numRows = 14, numCols = 25) {
    console.log("TileCreator constructor");
    this.uniqueId = id;
    this.numRows = numRows;
    this.numCols = numCols;
    this.onTileClick = onTileClick;
    this.imageSrc = imageSrc;
    this.selectedTiles = selectedTiles;
    this.imageCarousel = imageCarousel;
    this.faceDetector = faceDetector;
    this.imageStats = new ImageStats();
    this.autoDetect = autoDetect;

    this.container = this.createContainer();
    this.addMainImage(imageSrc);
    this.createGrid();
  }

  createContainer(): HTMLDivElement {
    const container = createElement("div", {
      uniqueIdPrefix: this.uniqueId,
      id: `tile-container`,
      role: "grid",
      addStyle: {
        position: "relative",
        width: "100%",
        height: "100%"
      }
    });
    return container;
  }

  async addMainImage(imageSrc: string): Promise<void> {
    console.log(`autoDetect: ${this.autoDetect}`);
    const mainImage = new Image();
    mainImage.src = imageSrc;
    mainImage.style.width = "100%";
    mainImage.style.height = "100%";
    mainImage.style.objectFit = "cover";
    this.container.appendChild(mainImage);

    if (this.autoDetect !== "None") {
      try {
        const face = await this.faceDetector.detectFace(mainImage);
        if (face) {
          const landmarks = await faceapi.detectFaceLandmarks(mainImage) as faceapi.FaceLandmarks68
          if (landmarks) {
            let allPoints: faceapi.Point[] = [];
            if (this.autoDetect === "Nose") {
              const nose = landmarks.getNose()
              allPoints = nose
            }
            if (this.autoDetect === "Face") {
              const nose = landmarks.getNose()
              const eye1 = landmarks.getLeftEye()
              const eye2 = landmarks.getRightEye()
              const mouth = landmarks.getMouth()
              allPoints = nose.concat(eye1, eye2, mouth)
            }
            //concat all the points
            this.storeNosePoints(allPoints); // Store the nose points here
          }
        }
      } catch (error) {
        console.error("Failed to detect face landmarks:", error);
      }
    } else {
      console.log("Not zoomed or auto detect is none")
    }
  }

  highlightNoseArea(nose: faceapi.Point[]): void {
    const mainImage = this.container.querySelector('img');
    this.zoomDelay = true;
    if (!mainImage) {
      console.error('Main image not found');
      return;
    }

    const scaleX = this.container.clientWidth / mainImage.naturalWidth;
    const scaleY = this.container.clientHeight / mainImage.naturalHeight;

    const xMin = Math.min(...nose.map((point) => point.x * scaleX));
    const xMax = Math.max(...nose.map((point) => point.x * scaleX));
    const yMin = Math.min(...nose.map((point) => point.y * scaleY));
    const yMax = Math.max(...nose.map((point) => point.y * scaleY));

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const tile = this.grid[row][col];
        const tileX = parseFloat(tile.style.left) * this.container.clientWidth / 100;
        const tileY = parseFloat(tile.style.top) * this.container.clientHeight / 100;
        const tileWidth = parseFloat(tile.style.width) * this.container.clientWidth / 100;
        const tileHeight = parseFloat(tile.style.height) * this.container.clientHeight / 100;

        if (
          tileX + tileWidth > xMin &&
          tileX < xMax &&
          tileY + tileHeight > yMin &&
          tileY < yMax
        ) {
          // Check the current aria-selected attribute value
          const isSelected = tile.getAttribute("aria-selected") === "true";

          // Update the aria-selected attribute and the style of the tile in the nose area only if it's not already selected
          if (!isSelected) {
            tile.click();
          }
        }
      }
    }
    setTimeout(() => {
      this.zoomDelay = false;
    }, 1000);
  }

  async createGrid(): Promise<void> {
    this.grid = [];
    this.container.setAttribute("aria-rowcount", this.numRows.toString());
    this.container.setAttribute("aria-colcount", this.numCols.toString());
    for (let row = 0; row < this.numRows; row++) {
      const rowDiv = createElement("div", {
        role: "row",
      });
      this.grid[row] = [];
      for (let col = 0; col < this.numCols; col++) {
        const tile = await this.createTile(row, col);
        this.grid[row][col] = tile;
        rowDiv.appendChild(tile);
      }
      this.container.appendChild(rowDiv);
    }
  }

  async createTile(row: number, col: number): Promise<HTMLButtonElement> {
    const tileId = `${this.uniqueId}${row}-${col}`;
    const tile = createElement("button", {
      uniqueIdPrefix: this.uniqueId,
      ariaRowIndex: row.toString(),
      ariaColIndex: col.toString(),
      addStyle: {
        position: "absolute",
        width: `${100 / this.numCols}%`,
        height: `${100 / this.numRows}%`,
        left: `${(col * 100) / this.numCols}%`,
        top: `${(row * 100) / this.numRows}%`,
        border: "1px solid rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
        pointerEvents: "auto",
        background: "rgba(0, 0, 0, 0.5)",
        padding: "0",
        cursor: "pointer",
      },
      id: `${row}-${col}`,
      addDataset: {
        row: row.toString(),
        col: col.toString(),
      }
    });

    if (row === 0 && col === 0) {
      tile.setAttribute("tabindex", "0"); // Set the first tile as initially focusable
    } else {
      tile.setAttribute("tabindex", "-1"); // Make all other tiles not focusable using the Tab key
    }

    if (this.selectedTiles.has(tileId)) {
      tile.setAttribute("aria-selected", "true");
      tile.style.background = "transparent";
    } else {
      tile.setAttribute("aria-selected", "false");
      tile.style.background = "rgba(0, 0, 0, 0.5)";
    }

    // ARIA attributes
    tile.setAttribute("role", "gridcell");
    tile.setAttribute("aria-labelledby", `tile-${row}-${col}-label ${tile.getAttribute("aria-selected")}`);
    tile.setAttribute("aria-describedby", `tile-${row}-${col}-desc ${tile.getAttribute("aria-selected")}`);

    // Event listeners
    tile.addEventListener("click", async (event) => {
      const target = event.target as HTMLElement;
      const selectedRow = parseInt(target.dataset.row);
      const selectedCol = parseInt(target.dataset.col);
      const { imageElement, dataUrl: tileImageSrc } = await this.getTileImage(selectedRow, selectedCol);
      this.onTileClick(selectedRow, selectedCol, tileImageSrc, this.zoomDelay);
      // Toggle aria-selected and update the opacity

      const modeStats = await this.imageStats?.calculateModeForSingleImage(imageElement);

      imageElement.remove();

      const isSelected = tile.getAttribute("aria-selected") === "true";
      tile.setAttribute("aria-selected", String(!isSelected));

      tile.setAttribute("aria-label", `
      ${tile.getAttribute("aria-selected") === "true" ? "selected" : "not selected"},
      Row ${row + 1} and Column ${col + 1},
      ${convertRGBValuesToEnglishNames(modeStats.red!, modeStats.green!, modeStats.blue!)},
      color mode, red ${modeStats?.red} green ${modeStats?.green} blue ${modeStats?.blue},`)

      tile.style.background = isSelected ? "rgba(0, 0, 0, 0.5)" : "transparent";

      // Update the selectedTiles set
      if (!isSelected) {
        this.selectedTiles.add(tileId);
      } else {
        this.selectedTiles.delete(tileId);
      }
      target.focus();
    });

    // Keyboard navigation
    tile.addEventListener("keydown", async (event) => {
      const target = event.target as HTMLElement;
      const currentRow = parseInt(target.dataset.row);
      const currentCol = parseInt(target.dataset.col);
      let newRow = currentRow;
      let newCol = currentCol;

      if (event.key === "ArrowUp" && currentRow > 0) {
        newRow--;
      } else if (event.key === "ArrowDown" && currentRow < this.numRows - 1) {
        newRow++;
      } else if (event.key === "ArrowLeft" && currentCol > 0) {
        newCol--;
      } else if (event.key === "ArrowRight" && currentCol < this.numCols - 1) {
        newCol++;
      } else {
        return; // Do nothing if a different key is pressed
      }

      // Update tabindex
      target.setAttribute("tabindex", "-1");
      this.grid[newRow][newCol].setAttribute("tabindex", "0");

      // Get the image of the new tile
      const { imageElement } = await this.getTileImage(newRow, newCol);

      event.preventDefault();
      // Calculate the color mode for the new tile
      const modeStats = await this.imageStats?.calculateModeForSingleImage(imageElement);

      imageElement.remove();

      // Update the 'aria-label' of the new tile with the color mode
      this.grid[newRow][newCol].setAttribute("aria-label", `
      ${this.grid[newRow][newCol].getAttribute("aria-selected") === "true" ? "selected" : "not selected"}, 
      Row ${newRow + 1} and Column ${newCol + 1},
      ${convertRGBValuesToEnglishNames(modeStats.red!, modeStats.green!, modeStats.blue!)},
      color mode, red ${modeStats?.red} green ${modeStats?.green} blue ${modeStats?.blue}`);

      this.grid[newRow][newCol].focus();
    });

    return tile;
  }

  async getTileImage(row: number, col: number): Promise<{ dataUrl: string, imageElement: HTMLImageElement, tileImageData: ImageData }> {
    const mainImage = new Image();
    mainImage.src = this.imageSrc;
    await mainImage.decode(); // Wait for the image to be loaded

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const tileWidth = mainImage.width / this.numCols;
    const tileHeight = mainImage.height / this.numRows;

    canvas.width = tileWidth;
    canvas.height = tileHeight;

    if (!ctx) {
      throw new Error("Could not get 2D context for canvas");
    }

    ctx.drawImage(mainImage, col * tileWidth, row * tileHeight, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

    //make image element
    const imageElement = createElement('img', {
      src: canvas.toDataURL(),
      width: tileWidth,
      height: tileHeight,
    })

    const tileImageData = ctx.getImageData(0, 0, imageElement.width, imageElement.height);
    return { dataUrl: canvas.toDataURL(), imageElement, tileImageData };

  }

  storeNosePoints(nose: faceapi.Point[]): void {
    this.nosePoints = nose;
  }

  replaceChild(mainContainer: HTMLDivElement, replacing: HTMLElement): void {
    mainContainer.replaceChild(this.container, replacing);
    setTimeout(() => {
      if (this.nosePoints) {
        this.highlightNoseArea(this.nosePoints);
      }
    }, 2000);
  }
}

