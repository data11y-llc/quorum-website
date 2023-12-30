import { updateElement } from "../../../util/helper";
import { loadingSpinner } from "../icons/icons.js";

export function createSpinner(UiKit: HTMLDivElement) {
  //get the value of the spinner
  const parser = new DOMParser();
  const iconHTML = parser.parseFromString(loadingSpinner, "image/svg+xml").querySelector("svg");
  if (iconHTML === null) return;
  iconHTML.removeAttribute('width');
  iconHTML.removeAttribute('height');

  const svg = updateElement(iconHTML, {
    addClass: "spinner",
  });

  UiKit.appendChild(svg);
}
