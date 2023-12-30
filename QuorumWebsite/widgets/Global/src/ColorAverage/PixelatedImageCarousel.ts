import { ValueOf } from "../UiKit/helperTypes";
import { ImageCarousel } from "./ImageCarousel";
import { FaceDetectionOptions } from "./Settings";
import { TileCreator } from "./TileCreator";

export class PixelatedImageCarousel extends ImageCarousel {
  selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>;
  mainImagesData: Map<number, { id: string; image: string }>;
  tileCallback: (selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>, zoomDelay?: boolean) => void;
  imageChangeCallback: (selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>, zoomDelay?: boolean) => void;
  autoDetect: ValueOf<FaceDetectionOptions>;

  constructor(id: string, tileCallback: (selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>, zoomDelay?: boolean) => void, imageChangeCallback: (selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>, zoomDelay?: boolean) => void) {
    super(id);
    this.selectedTilesMap = new Map();
    this.mainImagesData = new Map();
    this.tileCallback = tileCallback;
    this.imageChangeCallback = imageChangeCallback;
  }

  async addImages(imageSrc: string[]): Promise<void> {
    // Call the parent class addImage method
    super.addImages(imageSrc);

    // Get the current number of images already in the selectedTilesMap
    const currentImageCount = this.selectedTilesMap.size;

    // Make an entry in the selectedTilesMap for each image
    imageSrc.forEach((image, index) => {
      // Add the currentImageCount to the index to get the correct key
      const newIndex = currentImageCount + index;

      this.selectedTilesMap.set(newIndex, { tileIds: new Set(), tileImages: new Map() });
      this.mainImagesData.set(newIndex, { id: `${this.uniqueId}-main-image-${newIndex}`, image: image });
    });
  }

  async toggleZoom(index: number, autoDetect: ValueOf<FaceDetectionOptions>): Promise<void> {
    this.autoDetect = autoDetect;
    super.toggleZoom(index, autoDetect);
    this.clearSelectedTilesData(index);
  }

  async init(): Promise<void> {
    await super.init();
    this.selectedTilesMap = new Map();
    this.mainImagesData = new Map();
  }

  clearSelectedTilesData(index: number): void {
    const selectedTilesData = this.selectedTilesMap.get(index);
    if (selectedTilesData) {
      selectedTilesData.tileIds.clear();
      selectedTilesData.tileImages.clear();
    }
  }

  updateThumbnails(index: number) {
    this.thumbnails[this.currentImageIndex].setAttribute("aria-checked", "false");
    this.thumbnails[this.currentImageIndex].setAttribute("tabIndex", "-1");
    this.thumbnails[this.currentImageIndex].style.opacity = "0.7";
    this.currentImageIndex = index;
    this.thumbnails[this.currentImageIndex].setAttribute("aria-checked", "true");
    this.thumbnails[this.currentImageIndex].setAttribute("tabIndex", "0");
    this.thumbnails[this.currentImageIndex].style.opacity = "1";
    this.updateImageCount();
  }

  setMainImage(imageSrc: string, index: number): void {
    this.updateThumbnails(index);
    this.autoDetect = this.thumbnails[this.currentImageIndex].dataset.autoDetect as ValueOf<FaceDetectionOptions>;

    const selectedTilesData = this.selectedTilesMap.get(index) || { tileIds: new Set(), tileImages: new Map() };
    const selectedTiles = selectedTilesData.tileIds;

    // Create and render the TileCreator
    const tileCreator = new TileCreator(`${this.uniqueId}-tile-`, imageSrc, this, selectedTiles, (row, col, tileImageSrc, zoomDelay) => {
      const tileId = `${this.uniqueId}-tile-${row}-${col}`;
      if (selectedTiles.has(tileId)) {
        selectedTilesData.tileImages.delete(tileId);
        this.tileCallback(this.selectedTilesMap, zoomDelay);
      } else {
        selectedTilesData.tileImages.set(tileId, tileImageSrc);
        this.tileCallback(this.selectedTilesMap, zoomDelay);
      }
    }, this.faceDetector, this.autoDetect);
    const tileContainer = tileCreator.container;

    // Replace mainImage with tileContainer
    // this.container.replaceChild(tileContainer, this.mainImage);
    tileCreator.replaceChild(this.container, this.mainImage);
    this.mainImage = tileContainer as HTMLImageElement;

    // Update the selectedTilesMap with the selectedTilesData for the current image
    this.selectedTilesMap.set(index, selectedTilesData);

    // Store the ID and image URL for the current main image
    const mainImageId = `${this.uniqueId}-main-image-${index}`;
    this.mainImagesData.set(index, { id: mainImageId, image: imageSrc });

    // Update the imageChangeCallback
    this.imageChangeCallback(this.selectedTilesMap);

  }
}
