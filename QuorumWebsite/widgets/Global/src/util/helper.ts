import type * as CSSType from 'csstype';
import { ClassNames } from '../main.scss';

export function hoverStyle(div: HTMLElement, ogStyle: CSSType.Properties, hoverStyle: CSSType.Properties) {
  div.onmouseover = function() {
    Object.assign(div.style, hoverStyle);
  }
  div.onmouseout = function() {
    Object.assign(div.style, ogStyle);
  }
  div.onblur = function() {
    Object.assign(div.style, ogStyle);
  }
}

export function focusStyle(div: HTMLElement, ogStyle: CSSType.Properties, focusStyle: CSSType.Properties) {
  div.onfocus = function() {
    Object.assign(div.style, focusStyle);
  }
  div.onblur = function() {
    Object.assign(div.style, ogStyle);
  }
}

export function activeStyle(div: HTMLElement, ogStyle: CSSType.Properties, activeStyle: CSSType.Properties) {
  div.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      Object.assign(div.style, activeStyle);
    }
  });

  div.addEventListener('keyup', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      Object.assign(div.style, ogStyle);
    }
  });
  div.onmousedown = function() {
    Object.assign(div.style, activeStyle);
  }
  div.onmouseup = function() {
    Object.assign(div.style, ogStyle);
  }
}

export function disabledStyle(div: HTMLElement, ogStyle: CSSType.Properties, disabledStyle: CSSType.Properties) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
        if (div.hasAttribute('disabled')) {
          Object.assign(div.style, disabledStyle);
        } else {
          Object.assign(div.style, ogStyle);
        }
      }
    });
  });

  observer.observe(div, { attributes: true });

  div.addEventListener('click', () => {
    if (!div.hasAttribute('disabled')) {
      Object.assign(div.style, ogStyle);
    }
  });
}

// type HTMLElementType = keyof HTMLElementTagNameMap;
export type AdditionalTypes = {
  /** CSS style to be added to the element*/
  addStyle?: CSSType.Properties,
  /** Children to be added to the element */
  addChildren?: HTMLElement[],
  /** Data to be added to the element */
  addDataset?: Record<string, string>
  /** Element to append the element to */
  appendTo?: HTMLElement
  /** add class to the element */
  addClass?: ClassNames | ClassNames[];
  /** remove class from the element */
  removeClass?: ClassNames | ClassNames[];
  /** add updateClass to the element */
  updateClass?: ClassNames | ClassNames[];
  /** add unique prefix to beginning of id */
  uniqueIdPrefix?: string
  //add aria-labelledby?: string
  addAriaLabelledBy?: string
  /** add onchange event that matches the type of the element */
  addOnChange?: (event: Event) => void
  /** CSS style to be added to the element on hover */
  addHoverStyle?: CSSType.Properties
  /** add active state to the element */
  addActiveState?: CSSType.Properties
  /** add disabled state to the element */
  addDisabledState?: CSSType.Properties
  /** add focus state to the element */
  addFocusState?: CSSType.Properties
  /** add aria described by to the element */
  addAriaDescribedBy?: string
}

type HTMLElementAttrs<T extends keyof HTMLElementTagNameMap> = {
  type: T;
  attrs: Partial<HTMLElementTagNameMap[T]> & AdditionalTypes;
};

export function createElement<T extends keyof HTMLElementTagNameMap>(
  type: T,
  attrs: HTMLElementAttrs<T>["attrs"] & AdditionalTypes
): HTMLElementTagNameMap[T] & AdditionalTypes {
  const element = document.createElement(type);

  // If attrs.id exists, ensure the 'test' dataset is set or merged
  if (attrs.id) {
    // Ensure we don't overwrite an existing `test` key in addDataset
    attrs.addDataset = { test: attrs.id, ...attrs.addDataset };
    if (attrs.id === 'IdeInput') {
      console.log(attrs.addDataset);
    }
  }

  // Merge addDataset into element.dataset
  if (attrs.addDataset) {
    Object.assign(element.dataset, attrs.addDataset);
  }

  if (attrs.uniqueIdPrefix && attrs.id) {
    attrs.id = attrs.uniqueIdPrefix + attrs.id;
  }
  if (attrs.appendTo) {
    attrs.appendTo.appendChild(element);
  }
  Object.assign(element, attrs);
  //clears out any default styles
  if (attrs.addStyle) {
    Object.assign(element.style, attrs.addStyle);
  }
  if (attrs.addAriaLabelledBy) {
    element.setAttribute("aria-labelledby", attrs.addAriaLabelledBy);
  }
  if (attrs.addChildren) {
    attrs.addChildren.forEach((child) => element.appendChild(child));
  }

  if (attrs.addAriaDescribedBy) {
    element.setAttribute("aria-describedby", attrs.addAriaDescribedBy);
  }

  if (attrs.addClass) {
    if (Array.isArray(attrs.addClass)) {
      attrs.addClass.forEach((className) => element.classList.add(className));
    } else {
      element.classList.add(attrs.addClass);
    }
  }
  return element as HTMLElementTagNameMap[T];
}


export function updateElement<T extends keyof HTMLElementTagNameMap>(element: HTMLElementTagNameMap[T], updates: Partial<HTMLElementAttrs<T>["attrs"] & AdditionalTypes>) {
  // Use Object.assign() to update the element's attributes
  Object.assign(element, updates);

  if (updates.addDataset) {
    Object.assign(element.dataset, updates.addDataset);
  }

  // If updates contain an id, update the 'test' dataset, 
  // otherwise leave the 'test' dataset unchanged
  if (updates.id) {
    element.dataset.test = updates.id;
  }
  if (updates.addStyle) {
    Object.assign(element.style, updates.addStyle);
  }
  if (updates.addChildren) {
    updates.addChildren.forEach((child) => element.appendChild(child));
  }
  if (updates.addHoverStyle && updates.addStyle) {
    hoverStyle(element, updates.addStyle, updates.addHoverStyle);
  }
  if (updates.removeClass) {
    if (Array.isArray(updates.removeClass)) {
      updates.removeClass.forEach((className) => element.classList.remove(className));
    } else {
      element.classList.remove(updates.removeClass);
    }
  }
  if (updates.appendTo) {
    updates.appendTo.appendChild(element);
  }
  if (updates.addClass) {
    if (Array.isArray(updates.addClass)) {
      updates.addClass.forEach((className) => element.classList.add(className));
    } else {
      element.classList.add(updates.addClass);
    }
  }
  if (updates.updateClass) {
    element.classList = '';
    if (Array.isArray(updates.updateClass)) {
      updates.updateClass.forEach((className) => element.classList.add(className));
    } else {
      element.classList.add(updates.updateClass);
    }
  }
  return element as HTMLElementTagNameMap[T];
}
export function updateSVG<T extends keyof SVGElementTagNameMap>(
  element: SVGElementTagNameMap[T],
  updates: AdditionalTypes
) {
  if (updates.addStyle) {
    Object.assign(element.style, updates.addStyle);
  }
  if (updates.addClass) {
    if (Array.isArray(updates.addClass)) {
      updates.addClass.forEach((className) => element.classList.add(className));
    } else {
      element.classList.add(updates.addClass);
    }
  }
  if (updates.removeClass) {
    if (Array.isArray(updates.removeClass)) {
      updates.removeClass.forEach((className) => element.classList.remove(className));
    } else {
      element.classList.remove(updates.removeClass);
    }
  }
  return element as SVGElementTagNameMap[T];
}



export const html = (html: TemplateStringsArray) => {
  const template = document.createElement("template");
  template.innerHTML = html.join("");
  return template.content;
}

export function ariaLiveReader(text: string) {
  const ariaLive = document.getElementById("ariaLive");
  if (ariaLive) {
    ariaLive.innerHTML = text;
  }
}

export function throttle(callback: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return function throttledCallback(...args: any[]) {
    const context = this;
    const elapsed = performance.now() - lastExecTime;

    function invokeCallback() {
      lastExecTime = performance.now();
      callback.apply(context, args);
    }

    if (!timeoutId) {
      invokeCallback();
      timeoutId = setTimeout(function() {
        timeoutId = null;
      }, delay);
    } else if (elapsed >= delay) {
      clearTimeout(timeoutId);
      invokeCallback();
      timeoutId = setTimeout(function() {
        timeoutId = null;
      }, delay);
    }
  }
}

export function LoadScript(url: string, isModule: boolean = false): Promise<HTMLScriptElement> {
  return new Promise(function(resolve, reject) {
    const scripts = document.getElementsByTagName("script");
    const urlWithoutParams = new URL(url.split('?')[0], window.location.href);

    for (const script of scripts) {
      const scriptUrlWithoutParams = new URL(script.src.split('?')[0], window.location.href);
      if (scriptUrlWithoutParams.href === urlWithoutParams.href) {
        if (script.src !== url) {
          console.log(`Duplicate script with different parameters found: ${script.src}`);
          console.log(`Using the existing script: ${script.src}`);
          console.log(`did not load ${url}`);
        }
        resolve(script);
        return;
      }
    }

    const script = document.createElement("script");
    if (isModule) {
      script.type = "module";
    }
    script.src = url;
    script.defer = true;
    script.onload = () => {
      resolve(script);
    };
    script.onerror = () => {
      console.error(`Script load error for ${url}`);
      reject(new Error(`Script load error for ${url}`));
    };
    document.head.appendChild(script);
  });
}



export function LinkCSS(url: string) {
  return new Promise(function(resolve, reject) {
    // Check if the URL is already loaded
    const links = Array.from(document.getElementsByTagName("link"));
    const urlWithoutParams = new URL(url.split('?')[0], window.location.href);

    for (const link of links) {
      const linkHrefWithoutParams = new URL(link.href.split('?')[0], window.location.href);
      if (linkHrefWithoutParams.href === urlWithoutParams.href) {
        if (link.href !== url) {
          console.log(`Duplicate CSS with different parameters found: ${link.href}`);
          console.log(`Using the existing CSS: ${link.href}`);
          console.log(`did not load ${url}`);
        }
        resolve(link);
        return;
      }
    }

    // Create a new link element for the CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.head.appendChild(link);
    link.onload = () => {
      resolve(link);
    };
    link.onerror = () => {
      console.error(`CSS load error for ${url}`);
      reject(new Error(`CSS load error for ${url}`));
    };
  });
}


export function getExcelLikeAddress(x: number, y: number): string {
  let columnLetter = '';
  const baseCharCode = 65; // ASCII code for 'A'

  do {
    columnLetter = String.fromCharCode(baseCharCode + x % 26) + columnLetter;
    x = Math.floor(x / 26) - 1;
  } while (x >= 0);

  return `${columnLetter}${y + 1}`;
}

export function reverseExcelLikeAddress(address: string): { x: number, y: number } {
  let columnLetter = '';
  let rowNumber = '';

  for (let i = 0; i < address.length; i++) {
    const char = address.charAt(i);
    if (/\d/.test(char)) {
      rowNumber += char;
    } else {
      columnLetter += char;
    }
  }

  let x = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    const char = columnLetter.charAt(i);
    x = x * 26 + (char.charCodeAt(0) - 64);
  }

  const y = parseInt(rowNumber) - 1;
  x -= 1;

  return { x, y };
}

export function isIOS() {
  return /iPhone|iPod/.test(navigator.platform);
}

export function isAndroid() {
  return /Android/.test(navigator.userAgent);
}
