import { updateElement } from "../util/helper.js";
import { Lossless } from "./Lossless.js";

const Loader = document.querySelectorAll(".data11y-lossless") as NodeListOf<HTMLDivElement>;

const lsCache: { [key: string]: Lossless } = {};
if (Loader) {
  for (const container of Loader) {
    const preId = container.id;
    console.log(`loading Lossless for ${preId}`);

    const randomID = `data11y_${container.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(container, {
      id: randomID,
      addClass: 'data11y-lossless',
    });
    console.log(`new id: ${container.id}`);
    lsCache[preId] = new Lossless(randomID);
    lsCache[preId].render();
  }
}

