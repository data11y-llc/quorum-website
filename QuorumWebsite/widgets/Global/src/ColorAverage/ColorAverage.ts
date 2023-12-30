import { Button } from "../UiKit/atoms/buttons/buttons.js";
import { ValueOf } from "../UiKit/helperTypes.js";
import { Header } from "../UiKit/molecules/header/header.js";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher.js";
import { UiKitColors } from "../util/UiKit.js";
import { createElement } from "../util/helper.js";
import { PixelatedImageCarousel } from "./PixelatedImageCarousel.js";
import { Results } from "./Results.js";
import { FaceDetectionOptions, Settings } from "./Settings.js";

export class AccessImages {
  id: string;
  mainContainer: HTMLDivElement;
  contentContainer: HTMLDivElement;
  //header elements
  header: Header;
  contentLabel: HTMLLabelElement;
  clearButton: Button;
  saveButton: Button;
  uploadButton: Button;
  //instructions
  instructions: HTMLDivElement;
  //image carousel
  imageCarousel: PixelatedImageCarousel
  //results
  results: Results;
  //settings
  settings: Settings;
  private debounceTimeout: NodeJS.Timeout | null = null;
  private themeModal: ThemeSettingsModal<AccessImages>;

  dataType: 'rgb' | 'english' = 'rgb';

  //make a map to hold a number as key and string as value
  contentMap: Map<number, string> = new Map();

  constructor(id: string) {
    this.id = id;
    this.mainContainer = document.getElementById(id) as HTMLDivElement;
    this.contentContainer = createElement("div", { addClass: "color-average-content-container", role: "main" });
    this.header = this.createHeader();
    this.instructions = this.createInstructions();
    this.contentLabel = createElement("label", {
      //make role label the image content

      addStyle: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      },
      addClass: "typo_title-title4"
    });
    this.imageCarousel = new PixelatedImageCarousel(this.id, (tiles, zoomDelay) => { this.tileChangeAction(tiles, zoomDelay) }, (tiles, zoomDelay) => { this.mainImageChangeAction(tiles, zoomDelay) });

    this.dataType = this.mainContainer.dataset.type as 'rgb' | 'english';

    this.results = new Results(this.id, this.dataType, (id, index) => {
      //remove the matching id from tileIds
      this.imageCarousel.selectedTilesMap.get(index)?.tileIds.delete(id);
      this.imageCarousel.selectedTilesMap.get(index)?.tileImages.delete(id);
      this.imageCarousel.goToImage(index)
    });

    this.settings = new Settings(this.id, (contentValue) => {
      //set this.imageCarousel.currentImageIndex as key and contentValue as value
      this.contentMap.set(0, contentValue);
      this.contentLabel.textContent = contentValue;
    });

    this.settings.setAutoDetectionAction(() => {
      this.autoDetectAction();
    });

    this.themeModal = new ThemeSettingsModal({ id: "themeSettingsModal", uniqueIdPrefix: "themeSettingsModal", theme: "light", comingFrom: this });
    this.header.settingsButton.onClick(() => {
      this.themeModal.open();
    });
  }

  init(): void {
    this.contentMap = new Map();
    this.imageCarousel.init();
    this.results.init();
  }

  createInstructions(): HTMLDivElement {
    return createElement("div", {
      innerText: "Select an image to get the average color of the image",
      className: "instructions"
    })
  }

  createHeader(): Header {
    const header = new Header({ title: "AccessImages", theme: "light", uniqueId: this.id })
    header.rightSettings.style.columnGap = "8px";

    this.uploadButton = new Button({ text: "Upload", className: "btn-xsmall-primary-var1", uniqueIdPrefix: this.id, id: "upload-button" })
    this.uploadButton.onClick(() => { this.uploadAction() })
    header.rightSettings.prepend(this.uploadButton.getElement());

    this.saveButton = new Button({ text: "Save Data", className: "btn-xsmall-secondary-var1", uniqueIdPrefix: this.id, id: "save-button" })
    this.saveButton.onClick(() => { this.saveAction() })
    header.rightSettings.prepend(this.saveButton.getElement());

    this.clearButton = new Button({ text: "Clear", className: "btn-xsmall-secondary-var1", uniqueIdPrefix: this.id, id: "clear-button" })
    this.clearButton.onClick(() => { this.init() })
    header.rightSettings.prepend(this.clearButton.getElement());

    return header;
  }

  uploadAction(): void {
    const input = document.createElement("input");
    document.body.append(input)
    input.style.display = "none";
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*"; // Only accept image files

    input.addEventListener("change", async (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (!files) return;

      const filePromises = Array.from(files).map(async (file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
      });

      try {
        const images = await Promise.all(filePromises);
        const resizedImages = await Promise.all(images.map(async (image) => {
          const img = new Image();
          img.src = image;
          await img.decode();
          const canvas = document.createElement('canvas');
          canvas.width = img.width; // decrease the width by half
          canvas.height = img.height; // decrease the height by half
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL();
        }));
        this.imageCarousel.addImages(resizedImages);
      } catch (error) {
        console.error("Error reading image files:", error);
      }
    });

    input.click();
  }

  saveAction(): void {
    this.results.saveDataToCSV(this.contentMap, this.dataType);
  }

  async tileChangeAction(tiles: Map<number, { tileIds: Set<string>, tileImages: Map<string, string> }>, zoomDelay?: boolean): Promise<void> {
    // Clear the previous timeout if it exists
    if (zoomDelay) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(async () => {
        this.results.currentImageIndex = this.imageCarousel.currentImageIndex;
        this.results.selectedTiles = tiles;

        await this.results.updateIndividualImageTileMap();
        await this.results.calculateStatsForAllPixels();
        await this.results.renderRGBResults();
      }, 2000);  // 1000ms = 1 second delay
    } else {
      this.results.currentImageIndex = this.imageCarousel.currentImageIndex;
      this.results.selectedTiles = tiles;

      await this.results.updateIndividualImageTileMap();
      await this.results.calculateStatsForAllPixels();
      await this.results.renderRGBResults();
    }
  }

  async mainImageChangeAction(tiles: Map<number, { tileIds: Set<string>, tileImages: Map<string, string> }>, zoomDelay?: boolean): Promise<void> {
    //get the data-zoomed attribute of the current image
    let autoDetect = this.imageCarousel.thumbnails[this.imageCarousel.currentImageIndex].getAttribute("data-auto-detect") as ValueOf<FaceDetectionOptions>
    if (autoDetect === undefined) {
      autoDetect = "None";
    }
    this.settings.resetAutoDetection(autoDetect);

    this.results.currentImageIndex = this.imageCarousel.currentImageIndex;
    this.results.selectedTiles = tiles;

    this.contentLabel.textContent = this.contentMap.get(0) || "";

    if (zoomDelay) {
      this.debounceTimeout = setTimeout(async () => {
        this.results.currentImageIndex = this.imageCarousel.currentImageIndex;
        this.results.selectedTiles = tiles;

        await this.results.updateIndividualImageTileMap();
        await this.results.calculateStatsForAllPixels();
        await this.results.renderRGBResults();
      }, 1000);  // 1000ms = 1 second delay
    } else {
      await this.results.updateIndividualImageTileMap();
      await this.results.calculateStatsForAllPixels();
      await this.results.renderRGBResults();
    }
  }

  autoDetectAction(): void {
    this.imageCarousel.toggleZoom(this.imageCarousel.currentImageIndex, this.settings.radioGroup.value);
  }


  switchTheme(theme: 'light' | 'dark' | 'high-contrast') {
    this.header.switchTheme(theme);
    this.settings.radioGroup.switchTheme(theme);
    this.results.pixelList.switchTheme(theme);
    this.settings.contentInput.switchTheme(theme);

    let svgColor: string;

    switch (theme) {
      case 'light':
        this.mainContainer.style.backgroundColor = UiKitColors.neutral.white;
        this.imageCarousel.container.style.backgroundColor = UiKitColors.neutral.white;
        this.mainContainer.style.color = UiKitColors.neutral.black; // Black text for light theme
        svgColor = UiKitColors.neutral.black;
        break;
      case 'dark':
        this.mainContainer.style.backgroundColor = UiKitColors.neutral.grey._65
        this.imageCarousel.container.style.backgroundColor = UiKitColors.neutral.grey._65
        this.mainContainer.style.color = UiKitColors.neutral.white; // White text for dark theme
        svgColor = UiKitColors.neutral.white;
        break;
      case 'high-contrast':
        this.mainContainer.style.backgroundColor = UiKitColors.neutral.black;
        this.imageCarousel.container.style.backgroundColor = UiKitColors.neutral.black;
        this.mainContainer.style.color = UiKitColors.neutral.white; // White text for high-contrast theme
        svgColor = UiKitColors.neutral.white;
        break;
    }

    // Change the SVG color in the leftArrow and rightArrow buttons
    const leftArrowSVG = this.imageCarousel.leftArrow.getElement().querySelector('svg');
    const rightArrowSVG = this.imageCarousel.rightArrow.getElement().querySelector('svg');
    if (leftArrowSVG) leftArrowSVG.style.fill = svgColor;
    if (rightArrowSVG) rightArrowSVG.style.fill = svgColor;
  }


  render(): void {
    this.header.render(this.mainContainer);
    this.mainContainer.appendChild(this.contentContainer);
    this.contentContainer.appendChild(this.instructions);
    this.contentContainer.appendChild(this.contentLabel);
    this.imageCarousel.render(this.contentContainer);
    this.settings.render(this.contentContainer);
    this.results.render(this.contentContainer);

    this.init();
  }
}
