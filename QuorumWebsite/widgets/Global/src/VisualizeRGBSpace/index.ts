import { updateElement } from "../util/helper.js";
import { RGBWidget } from "./VisualizeRGBSpace.js";

const Loader = document.querySelectorAll(".data11y-visualize-rgb-space") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: RGBWidget } = {};
if (Loader) {
  for (const pixelWidgetContainer of Loader) {
    const preId = pixelWidgetContainer.id;

    const randomID = `data11y_${pixelWidgetContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(pixelWidgetContainer, {
      id: randomID,
    });
    console.log(randomID);
    acCache[preId] = new RGBWidget(randomID);
  }
}

