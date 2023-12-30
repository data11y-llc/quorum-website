import { updateElement } from "../util/helper.js";
import { DataCommons } from "./DataCommons.js";

const Loader = document.querySelectorAll(".data11y-data-commons") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: DataCommons } = {};
if (Loader) {
  for (const dcContainer of Loader) {
    const preId = dcContainer.id;

    const randomID = `data11y_${dcContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(dcContainer, {
      id: randomID,
    });
    acCache[preId] = new DataCommons({ id: randomID });
  }
}

