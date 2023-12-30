import { Button } from "../UiKit/atoms/buttons/buttons";
import { leftArrowIcon, rightArrowIcon } from "../UiKit/atoms/icons/icons";
import { ValueOf } from "../UiKit/helperTypes";
import { createElement } from "../util/helper";
import { FaceDetector } from "./FaceDetector";
import { FaceDetectionOptions } from "./Settings";

export class ImageCarousel {
  uniqueId: string;
  container: HTMLDivElement;
  mainImage: HTMLImageElement;
  thumbnailsContainer: HTMLDivElement;
  thumbnails: HTMLImageElement[];
  currentImageIndex: number;
  faceDetector: FaceDetector;

  imageCount: HTMLElement
  leftArrow: Button;
  imageCountText: HTMLSpanElement;
  rightArrow: Button;

  totalImages: number;

  constructor(id: string) {
    this.uniqueId = id;
    this.faceDetector = new FaceDetector();
    this.container = createElement("div", { className: "image-carousel-container" });
    this.container.id = `${this.uniqueId}-image-carousel`;

    this.mainImage = createElement("img", { className: "data11y-main-image" });
    this.mainImage.id = `${this.uniqueId}-main-image`;
    this.container.appendChild(this.mainImage);

    this.thumbnailsContainer = createElement("div", { addClass: "data11y-thumbnails-container" });
    this.thumbnailsContainer.id = `${this.uniqueId}-thumbnail-group`;
    this.thumbnailsContainer.setAttribute("aria-labelledby", `${this.uniqueId}-thumbnail-group-label`);
    this.container.appendChild(this.thumbnailsContainer);

    this.thumbnails = [];
    this.currentImageIndex = 0;

    this.imageCount = this.createImageCount();

    this.container.appendChild(this.imageCount);

    this.leftArrow.onClick(() => {
      this.prevImage();
    });

    this.rightArrow.onClick(() => {
      this.nextImage();
    });

    this.totalImages = 0;
  }


  async init(): Promise<void> {
    this.container.innerHTML = '';
    this.mainImage = createElement("img", { className: "data11y-main-image" });
    this.mainImage.id = `${this.uniqueId}-main-image`;
    this.container.appendChild(this.mainImage);

    this.thumbnailsContainer = createElement("div", { addClass: "data11y-thumbnails-container", role: 'radiogroup' });
    this.thumbnailsContainer.id = `${this.uniqueId}-thumbnail-group`;
    this.thumbnailsContainer.setAttribute("aria-labelledby", `${this.uniqueId}-thumbnail-group-label`);
    this.container.appendChild(this.thumbnailsContainer);

    this.thumbnails = [];
    this.currentImageIndex = 0;

    this.imageCount = this.createImageCount();
    this.container.appendChild(this.imageCount);

    this.leftArrow.onClick(() => {
      this.prevImage();
    });

    this.rightArrow.onClick(() => {
      this.nextImage();
    });

    this.totalImages = 0;
    this.updateImageCount();
  }


  async addImages(images: string[]): Promise<void> {
    const newThumbnails = await Promise.all(
      images.map(async (imageSrc, index) => {
        const thumbnail = await this.createThumbnail(imageSrc, this.totalImages + index, "None");
        return thumbnail;
      })
    );
    newThumbnails.forEach((thumbnail, index) => {
      this.totalImages = this.totalImages + 1;
      this.thumbnailsContainer.appendChild(thumbnail);
      thumbnail.addEventListener("keydown", this.thumbnailNavigationHandler(this.totalImages - 1));
    });
    this.thumbnails = this.thumbnails.concat(newThumbnails); // Concatenate the new thumbnails to the existing array
    if (images.length > 0) {
      this.setMainImage(images[0], 0);
    }

    this.updateImageCount();
  }


  async createThumbnail(src: string, index: number, autoDetect: ValueOf<FaceDetectionOptions>): Promise<HTMLImageElement> {
    console.log(`createThumbnail(src, ${index}, ${autoDetect})`);
    const createThumbnailElement = (src: string, zoomedSrc: string, index: number) => {
      const imageToUse = autoDetect !== "None" ? zoomedSrc : src;
      const thumbnail = createElement("img", {
        src: imageToUse,
        addClass: "data11y-thumbnail", tabIndex: index === this.currentImageIndex ? 0 : -1,
        addStyle: {
          opacity: index === this.currentImageIndex ? 1 : 0.7
        },
        uniqueIdPrefix: this.uniqueId,
        id: `thumbnail-${index}`,
        alt: `Thumbnail ${index + 1}`,
        role: "radio",
        ariaChecked: index === this.currentImageIndex ? "true" : "false",
        onclick: () => {
          this.setMainImage(imageToUse, index)
        },
        onkeydown: this.thumbnailNavigationHandler(index),
        addDataset: {
          originalSrc: src,
          zoomed: autoDetect !== "None" ? "true" : "false",
          autoDetect: autoDetect as string
        }
      });
      return thumbnail;
    };

    if (autoDetect !== "None") {
      const imageEl = new Image();
      imageEl.src = src;
      try {
        const face = await this.faceDetector.detectFace(imageEl)
        if (face) {
          const canvas = this.faceDetector.createCanvas(400, 400);
          const imageElement = new Image();
          imageElement.src = src;
          this.faceDetector.drawFaceOnCanvas(face, imageElement, canvas);
          const dataURL = canvas.toDataURL();
          return createThumbnailElement(src, dataURL, index);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return createThumbnailElement(src, src, index);
  }

  async toggleZoom(index: number, autoDetection: ValueOf<FaceDetectionOptions>): Promise<void> {
    if (index >= 0 && index < this.thumbnails.length) {
      const zoom = autoDetection !== "None" ? true : false;
      const thumbnail = this.thumbnails[index];
      const src = thumbnail.getAttribute("data-original-src") || thumbnail.src;

      const newThumbnail = await this.createThumbnail(src, index, autoDetection);
      newThumbnail.setAttribute("data-original-src", src);
      newThumbnail.setAttribute("data-zoomed", zoom ? "true" : "false");
      this.thumbnails[index] = newThumbnail;

      this.thumbnailsContainer.replaceChild(newThumbnail, thumbnail);

      if (index === this.currentImageIndex) {
        this.setMainImage(newThumbnail.src, index);
      }
    }
  }


  createImageCount(): HTMLDivElement {
    const imageCount = createElement("div", { addClass: "image-carousel-count", uniqueIdPrefix: this.uniqueId, id: 'imageCount' });
    this.imageCountText = createElement("span", { uniqueIdPrefix: this.uniqueId, id: 'imageCountText', ariaLabel: 'Image 0 of 0' });

    this.leftArrow = new Button({ icon: leftArrowIcon, className: "btn-icon", uniqueIdPrefix: this.uniqueId, id: 'leftArrow' });
    this.leftArrow.getElement().setAttribute("aria-describedby", this.uniqueId + 'imageCountText');
    this.leftArrow.getElement().title = "Previous Image";

    this.rightArrow = new Button({ icon: rightArrowIcon, className: "btn-icon", uniqueIdPrefix: this.uniqueId, id: 'rightArrow' });
    this.rightArrow.getElement().setAttribute("aria-describedby", this.uniqueId + 'imageCountText');
    this.rightArrow.getElement().title = "Next Image";


    //make the svg in the buttons fill black
    this.leftArrow.getElement().querySelector("svg").style.fill = "black";
    this.rightArrow.getElement().querySelector("svg").style.fill = "black";
    imageCount.appendChild(this.leftArrow.getElement());
    imageCount.appendChild(this.imageCountText);
    imageCount.appendChild(this.rightArrow.getElement());
    return imageCount;
  }

  thumbnailNavigationHandler(index: number) {
    return (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (index + 1) % this.thumbnails.length;
        this.thumbnails[index].setAttribute("tabIndex", "-1");
        this.thumbnails[nextIndex].setAttribute("tabIndex", "0");
        this.thumbnails[nextIndex].focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = (index - 1 + this.thumbnails.length) % this.thumbnails.length;
        this.thumbnails[index].setAttribute("tabIndex", "-1");
        this.thumbnails[prevIndex].setAttribute("tabIndex", "0");
        this.thumbnails[prevIndex].focus();
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.setMainImage(this.thumbnails[index].src, index);
      }
    };
  }

  setMainImage(imageSrc: string, index: number): void {
    console.log(this.currentImageIndex);
    this.mainImage.src = imageSrc;
    this.thumbnails[this.currentImageIndex].setAttribute("aria-checked", "false");
    this.thumbnails[this.currentImageIndex].setAttribute("tabIndex", "-1");
    this.currentImageIndex = index;
    this.thumbnails[this.currentImageIndex].setAttribute("aria-checked", "true");
    this.thumbnails[this.currentImageIndex].setAttribute("tabIndex", "0");
    this.updateImageCount();
  }

  prevImage(): void {
    const newIndex = (this.currentImageIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
    this.setMainImage(this.thumbnails[newIndex].src, newIndex);
  }

  nextImage(): void {
    const newIndex = (this.currentImageIndex + 1) % this.thumbnails.length;
    this.setMainImage(this.thumbnails[newIndex].src, newIndex);
  }

  goToImage(index: number): void {
    if (index >= 0 && index < this.thumbnails.length) {
      this.setMainImage(this.thumbnails[index].src, index);
    }
  }

  updateImageCount(): void {
    this.imageCountText.textContent = `${this.currentImageIndex + 1} / ${this.thumbnails.length}`;
    this.imageCountText.ariaLabel = `Image ${this.currentImageIndex + 1} of ${this.thumbnails.length}`;
  }


  render(parent: HTMLDivElement): void {
    parent.appendChild(this.container);
  }
}
