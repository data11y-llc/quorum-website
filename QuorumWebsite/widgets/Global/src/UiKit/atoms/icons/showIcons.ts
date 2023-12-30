//import all from ./icons.ts
import { updateSVG } from "../../../util/helper.js";
import iconStyle from "../icons/icons.scss";
import spinnerStyle from '../spinner/spinner.scss';

interface IconOptions {
  icon: string;
  addClass: AllClassNames;
  onClick?: () => void;
  uniqueIdPrefix: string;
  id: string;
}

type SpinnerClassNames = keyof typeof spinnerStyle & string;
type IconClassNames = keyof typeof iconStyle & string;

type AllClassNames = SpinnerClassNames | IconClassNames;

export function formatSVG(svg: string, addClass: AllClassNames): SVGElement | undefined {
  const parser = new DOMParser();
  const svgElement = parser.parseFromString(svg, "image/svg+xml").querySelector("svg");
  if (svgElement === null) return;
  svgElement.removeAttribute('width');
  svgElement.removeAttribute('height');
  if (addClass !== "spinner") {
    svgElement.removeAttribute('fill');
  }

  const updatedSVG = updateSVG(svgElement, {
    addClass: addClass,
  });

  return updatedSVG;
}

export class Icon {
  private _svg: SVGElement | undefined;
  private onClick?: () => void;
  private _uniqueIdPrefix: string;
  private _id: string;

  constructor(options: IconOptions) {
    const { icon: svg, addClass, onClick, uniqueIdPrefix, id } = options;

    const testSVG = this.formatSVG(svg, addClass);
    this._uniqueIdPrefix = uniqueIdPrefix;
    this._id = id;
    if (testSVG === undefined) return;
    this._svg = testSVG;
    this._svg.id = this._uniqueIdPrefix + this._id;

    if (onClick) {
      this.onClick = onClick;
      this._svg.addEventListener("click", onClick);
    }
  }

  get svg(): SVGElement | undefined {
    return this._svg;
  }
  set svg(svg: SVGElement | undefined) {
    this._svg = svg;
  }
  get id(): string {
    return this._id;
  }

  formatSVG(svg: string, addClass: AllClassNames): SVGElement | undefined {
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svg, "image/svg+xml").querySelector("svg");
    if (svgElement === null) return;
    svgElement.removeAttribute('width');
    svgElement.removeAttribute('height');
    if (addClass !== "spinner") {
      svgElement.removeAttribute('fill');
    }

    const updatedSVG = updateSVG(svgElement, {
      addClass: addClass,
    });

    return updatedSVG;
  }

  public setOnClick(onClick: () => void) {
    if (this.svg === undefined) return console.error("No SVG element found");
    if (this.onClick) {
      this.svg.removeEventListener("click", this.onClick);
    }

    this.onClick = onClick;
    this.svg.addEventListener("click", onClick);
  }

  render(parent: HTMLElement) {
    if (this.svg === undefined) return;
    parent.appendChild(this.svg);
  }

  destroy() {
    if (this.svg === undefined) return;
    this.svg.remove();
  }

}

