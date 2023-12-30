import { updateElement } from "../util/helper.js";
import { AssetSelector } from "./AssetSelector.js";

const Loader = document.querySelectorAll(".data11y-asset-getter") as NodeListOf<HTMLDivElement>;

const agCache: { [key: string]: AssetSelector } = {};
if (Loader) {
  for (const AssetGetter of Loader) {
    const preId = AssetGetter.id;

    const randomID = `data11y_${AssetGetter.id}_${Math.random().toString(36).substring(2, 8)}_`
    updateElement(AssetGetter, {
      id: randomID,
    });
    console.log(randomID);
    agCache[preId] = new AssetSelector(randomID);
  }
}
