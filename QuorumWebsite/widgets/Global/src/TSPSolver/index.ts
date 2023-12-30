import { updateElement } from "../util/helper.js";
import { TSPSolver } from "./TSPSolver.js";

const Loader = document.querySelectorAll(".data11y-tsp") as NodeListOf<HTMLDivElement>;

const acCache: { [key: string]: TSPSolver } = {};
if (Loader) {
  for (const dcContainer of Loader) {
    const preId = dcContainer.id;

    const randomID = `data11y_${dcContainer.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(dcContainer, {
      id: randomID,
    });
    acCache[preId] = new TSPSolver(randomID);
  }
}

