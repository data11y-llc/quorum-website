import { updateElement } from "../util/helper.js";
import { AccessImages } from "./ColorAverage.js";

const Loader = document.querySelectorAll(".data11y-color-average") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: AccessImages } = {};
if (Loader) {
  for (const container of Loader) {
    const preId = container.id;
    console.log(`loading ColorAverage for ${preId}`);

    const randomID = `data11y_${container.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(container, {
      id: randomID,
      addClass: 'data11y-color-average'
    });
    console.log(`new id: ${container.id}`);
    acCache[preId] = new AccessImages(randomID);
    acCache[preId].render();
  }
}

