
import { updateElement } from "../util/helper.js";
import { FlippyDo } from "./FlippyDo.js";
import { FlippyDoPro } from "./FlippyDoPro";

const Loader = document.querySelectorAll(".data11y-flippydo") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: FlippyDo } = {};
if (Loader) {
  for (const flippyDoContainer of Loader) {
    const preId = flippyDoContainer.id;

    const randomID = `data11y_${flippyDoContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(flippyDoContainer, {
      id: randomID,
    });
    if (flippyDoContainer.dataset.pro === "true") {
      acCache[preId] = new FlippyDoPro(randomID);
    } else {
      acCache[preId] = new FlippyDo(randomID);
    }
  }
}

