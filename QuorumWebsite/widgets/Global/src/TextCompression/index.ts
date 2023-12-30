import { updateElement } from "../util/helper.js";
import { TextCompression } from "./TextCompression.js";

const Loader = document.querySelectorAll(".data11y-text-compression") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: TextCompression } = {};
if (Loader) {
  for (const container of Loader) {
    const preId = container.id;

    const randomID = `data11y_${container.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(container, {
      id: randomID,
    });
    console.log(randomID);
    acCache[preId] = new TextCompression(randomID);
  }
}

