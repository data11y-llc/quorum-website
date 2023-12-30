import { updateElement } from "../util/helper.js";
import { PixelWidget } from "./PixelWidget.js";

const Loader = document.querySelectorAll(".data11y-pixel-widget") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: PixelWidget } = {};
if (Loader) {
  for (const pixelWidgetContainer of Loader) {
    const preId = pixelWidgetContainer.id;

    const randomID = `data11y_${pixelWidgetContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(pixelWidgetContainer, {
      id: randomID,
    });
    console.log(randomID);
    acCache[preId] = new PixelWidget(randomID);
  }
}

