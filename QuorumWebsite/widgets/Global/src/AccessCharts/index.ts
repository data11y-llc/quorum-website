import { updateElement } from "../util/helper.js";
import { AccessChart } from "./elements.js";

document.addEventListener('DOMContentLoaded', function() {
  const Loader = document.querySelectorAll(".data11y-access-chart") as NodeListOf<HTMLDivElement>;

  const acCache: { [key: string]: AccessChart } = {};
  if (Loader) {
    for (const acContainer of Loader) {
      const preId = acContainer.id;

      const randomID = `data11y_${acContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
      updateElement(acContainer, {
        id: randomID,
      });
      acCache[preId] = new AccessChart({ id: randomID });
    }
  }
})
