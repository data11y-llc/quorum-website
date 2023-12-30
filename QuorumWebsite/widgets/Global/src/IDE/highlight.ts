import { createElement, AdditionalTypes, updateElement } from "../util/helper.js";
import { resizeWordBreakWord } from "./settingsModal.js";
import { styleGlobals, CSS, THEME } from "./style/style.js";
import { IdeElements } from "./types.js";

declare const Prism: any;

export const ideCache: { [key: string]: IdeElements } = {}

export function createCache(preId: string, onlyTheme: boolean = false, ideTheme: 'light' | 'dark' | 'high-contrast' = 'light'): void {
  // If the cache already has all properties, return early.
  if (ideCache[preId] && Object.keys(ideCache[preId]).length === 17 && !onlyTheme) {
    return; // all properties are already there, just return the cache
  }

  if (onlyTheme) {
    // If onlyTheme is true, set only the theme property
    ideCache[preId] = ideCache[preId] || { theme: ideTheme };
  } else {
    // If onlyTheme is false, add or update all properties except the theme
    ideCache[preId] = {
      ...ideCache[preId],
      codeDivs: ideCache[preId]?.codeDivs || [],
      preElements: ideCache[preId]?.preElements || [],
      codeElements: ideCache[preId]?.codeElements || [],
      lineNumbers: ideCache[preId]?.lineNumbers || [],
      codeBlockCharPositions: ideCache[preId]?.codeBlockCharPositions || [],
      lineNumberDiv: ideCache[preId]?.lineNumberDiv || document.querySelector(`#${preId}lineNumberDiv`) as HTMLDivElement,
      codeBlocks: ideCache[preId]?.codeBlocks || document.querySelector(`#${preId}codeBlocks`) as HTMLDivElement,
      cursorBlockLocation: ideCache[preId]?.cursorBlockLocation || 1,
      previousCursorLocation: ideCache[preId]?.previousCursorLocation || 1,
      preStyles: ideCache[preId]?.preStyles || {} as CSSStyleDeclaration,
      multiLineComment: ideCache[preId]?.multiLineComment || [],
      prevLines: ideCache[preId]?.prevLines || [''],
      lineHeightsMap: ideCache[preId]?.lineHeightsMap || new Map(),
      longestLineLength: ideCache[preId]?.longestLineLength || 0,
      tabValues: ideCache[preId]?.tabValues || [''],
      currentTab: ideCache[preId]?.currentTab || NaN,
      // Do not overwrite the theme if it already exists
      theme: ideCache[preId]?.theme || THEME
    };
  }
}


interface getLineDiffReturn {
  newLines: number[],
  deletedLines: number[],
  updatedLines: number[],
  commentLines: Array<[number, number]>
}

function getLineDiffs(lines: string[], preId: string): getLineDiffReturn {

  const prevLines = ideCache[preId].prevLines;
  const minLen = Math.min(lines.length, prevLines.length);

  const diff = {
    newLines: [] as number[],
    deletedLines: [] as number[],
    updatedLines: [] as number[],
    commentLines: getLineRangesInComment(lines)
  };

  for (let i = 0; i < minLen; i++) {
    if (lines[i] !== prevLines[i]) {
      diff.updatedLines.push(i + 1);
    }
  }

  if (lines.length > prevLines.length) {
    for (let i = prevLines.length; i < lines.length; i++) {
      diff.newLines.push(i + 1);
    }
  } else if (lines.length < prevLines.length) {
    for (let i = lines.length; i < prevLines.length; i++) {
      diff.deletedLines.push(i + 1);
    }
  }

  return diff;
}

export function updateCodeEditorDisplay(element: (HTMLTextAreaElement & AdditionalTypes)): void {
  if (!element.uniqueIdPrefix) return;
  const preId = element.uniqueIdPrefix;
  const currentTab = element.dataset.currentTab as string;
  let text: string;
  if (ideCache[preId].currentTab !== +currentTab && ideCache[preId].currentTab !== undefined) {
    text = ideCache[preId].tabValues[+currentTab];
    element.value = text;
    ideCache[preId].currentTab = +currentTab;
  } else {
    text = element.value;
    ideCache[preId].currentTab = +currentTab;
    ideCache[preId].tabValues[+currentTab] = text;
  }

  ideCache[preId].lineNumberDiv = ideCache[preId].lineNumberDiv || document.getElementById(preId + 'lineNumberDiv') as HTMLDivElement;
  ideCache[preId].codeBlocks = ideCache[preId].codeBlocks || document.getElementById(preId + 'codeBlocks') as HTMLDivElement;
  if (!(ideCache[preId].lineNumberDiv instanceof HTMLDivElement)) return console.error('lineNumberDiv not a div element');
  if (!(ideCache[preId].codeBlocks instanceof HTMLDivElement)) return console.error('codeBlocks not a div element');

  const lines: string[] = text.split(/\r|\r\n|\n/);
  const diffDetails = getLineDiffs(lines, preId);

  const newLines = diffDetails.newLines;
  const updatedLines = diffDetails.updatedLines;

  let lineNumber = 1;
  let codeDiv = ideCache[preId].codeDivs[lineNumber - 1] || document.getElementById(preId + `codeBlock${lineNumber}`) as HTMLDivElement;
  let singleCode = ideCache[preId].codeElements[lineNumber - 1] || document.getElementById(preId + `code${lineNumber}`) as HTMLElement;
  let codeLine = ideCache[preId].preElements[lineNumber - 1] || document.getElementById(preId + `codeLine${lineNumber}`) as HTMLPreElement;
  let lineNumberEl = ideCache[preId].lineNumbers[lineNumber - 1] || document.getElementById(preId + `lineNumberEl${lineNumber}`) as HTMLDivElement;
  ideCache[preId].codeBlockCharPositions = [];
  const unWrappedHeight = window.getComputedStyle(ideCache[preId].codeElements[0]).height;

  for (const i of newLines) {
    const index = i - 1;

    const line = lines[index].replace(/[<>]/g, function(match) {
      return { '<': '&lt;', '>': '&gt;' }[match];
    });

    lineNumber = i;
    codeDiv = ideCache[preId].codeDivs[index] || document.getElementById(preId + `codeBlock${lineNumber}`) as HTMLDivElement;
    codeLine = ideCache[preId].preElements[index] || document.getElementById(preId + `codeLine${lineNumber}`) as HTMLPreElement;
    singleCode = ideCache[preId].codeElements[index] || document.getElementById(preId + `code${lineNumber}`) as HTMLDivElement;
    lineNumberEl = ideCache[preId].lineNumbers[index] || document.getElementById(preId + `lineNumberEl${lineNumber}`) as HTMLDivElement;
    if (!codeDiv) {
      lineNumberEl = createElement("div", {
        addStyle: { ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber },
        id: preId + `lineNumberEl${lineNumber}`,
        addClass: ['line-number'],
        ariaHidden: 'true'
      });
      lineNumberEl.textContent = `${lineNumber}`;
      ideCache[preId].lineNumbers[index] = lineNumberEl;
      ideCache[preId].lineNumberDiv.appendChild(lineNumberEl);

      codeLine = createElement("pre", {
        addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.pre,
        uniqueIdPrefix: preId,
        id: `codeLine${lineNumber}`,
        addClass: ['language-quorum', 'highlighting-content', 'pre-code'],
        tabIndex: -1,
      });

      singleCode = createElement("code", {
        addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code,
        id: preId + `code${lineNumber}`,
        addClass: ['code-line'],
        appendTo: codeLine,
        innerHTML: line
      });

      codeDiv = createElement("div", {
        addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.block,
        id: preId + `codeBlock${lineNumber}`,
        addClass: ['code-block', 'hide-scrollbar'],
        addChildren: [codeLine],
      });

      ideCache[preId].codeBlocks.appendChild(codeDiv);
      Prism.highlightElement(singleCode);

      ideCache[preId].codeDivs[index] = codeDiv;
      ideCache[preId].preElements[index] = codeLine;
      ideCache[preId].codeElements[index] = singleCode;
      updateLineHeight(preId, element, codeDiv, codeLine, lineNumberEl, singleCode, line, unWrappedHeight);
    }
  }


  //if lineHeightsMap is greater than 1000 lines, clear it
  if (ideCache[preId].lineHeightsMap.size > 1000) {
    ideCache[preId].lineHeightsMap.clear()
  }

  let index: number;
  let line: string
  for (const lineNumber of updatedLines) {
    index = lineNumber - 1;

    codeDiv = ideCache[preId].codeDivs[index]
    codeLine = ideCache[preId].preElements[index]
    singleCode = ideCache[preId].codeElements[index]
    lineNumberEl = ideCache[preId].lineNumbers[index]

    // line = lines[lineNumber - 1].replace(/&/g, "&").replace(/</g, "<").replace(/ /g, " ");
    line = lines[lineNumber - 1].replace(/[<>]/g, function(match) {
      return { '<': '&lt;', '>': '&gt;' }[match];
    });

    lineNumberEl.textContent = `${lineNumber}`;
    ideCache[preId].codeElements[lineNumber - 1].innerHTML = line;
    Prism.highlightElement(ideCache[preId].codeElements[lineNumber - 1]);

    updateLineHeight(preId, element, codeDiv, codeLine, lineNumberEl, singleCode, line, unWrappedHeight);
  }


  hiMultiLineComments(preId, diffDetails.commentLines);
  ideCache[preId].multiLineComment = diffDetails.commentLines;


  removeExtraLines(lines, preId);

  if (element.wrap === 'off') {
    resizeWordBreakWord(element, false)
  }

  ideCache[preId].prevLines = lines;
  highlightCursorLocation(element);
  editAreaSyncScroll(element);
}

function removeExtraLines(lines: string[], preId: string): void {
  while (ideCache[preId].codeDivs.length > lines.length) {
    const codeToRemove = ideCache[preId].codeDivs.pop();
    if (codeToRemove) {
      codeToRemove.remove();
    }
    const lineNumberToRemove = ideCache[preId].lineNumbers.pop();
    if (lineNumberToRemove) {
      lineNumberToRemove.remove();
    }
  }
}

function getLineRangesInComment(lines: string[]): Array<[number, number]> {
  const commentRanges = [] as Array<[number, number]>;
  let startLine = -1;
  let endLine = -1;
  let inComment = false;
  let inString = false;
  let inLineComment = false;
  //if all lines dont have a comment, return empty array
  if (!lines.some(line => line.includes('/*'))) {
    return commentRanges;
  }


  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const currentChar = line[j];

      // Check for the start of a string
      if (currentChar === '"' && !inComment && !inLineComment) {
        inString = !inString;
      }

      // Check for the start of a line comment
      if (!inComment && !inString && currentChar === '/' && line[j + 1] === '/') {
        inLineComment = true;
        j++;
        continue;
      }

      // Check for the start of a block comment
      if (!inComment && !inString && !inLineComment && currentChar === '/' && line[j + 1] === '*') {
        inComment = true;
        startLine = i;
        j++;
        continue;
      }

      // Check for the end of a block comment
      if (inComment && !inString && !inLineComment && currentChar === '*' && line[j + 1] === '/') {
        inComment = false;
        endLine = i;
        if (commentRanges.length > 0 && commentRanges[commentRanges.length - 1][1] === startLine + 1) {
          commentRanges[commentRanges.length - 1][1] = endLine + 1;
        } else {
          commentRanges.push([startLine + 1, endLine + 1]);
        }
        j++;
      }
    }

    // Reset line comment flag
    inLineComment = false;
  }

  if (inComment) {
    if (commentRanges.length > 0 && commentRanges[commentRanges.length - 1][1] === startLine + 1) {
      commentRanges[commentRanges.length - 1][1] = lines.length;
    } else {
      commentRanges.push([startLine + 1, lines.length]);
    }
  }

  return commentRanges;
}


/**
 * @description highlights multi-line comments
 * @keepEyeOnThis
 */

function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!arraysEqual(a[i], b[i])) return false;
    } else if (a[i] !== b[i]) return false;
  }
  return true;
}

function hiMultiLineComments(preId: string, commentRanges: Array<[number, number]>): void {
  const codeElements: HTMLElement[] = ideCache[preId].codeElements;

  if (!arraysEqual(ideCache[preId].multiLineComment, commentRanges)) {
    const difference = ideCache[preId].multiLineComment.filter(
      (comment) => !commentRanges.some((range) => range[0] === comment[0] && range[1] === comment[1])
    );

    const affectedLines = difference.reduce((lines, range) => {
      for (let i = range[0] - 1; i < range[1]; i++) {
        lines.add(i);
      }
      return lines;
    }, new Set<number>());

    affectedLines.forEach((i) => {
      Prism.highlightElement(codeElements[i]);
    });
  }

  if (commentRanges.length === 0) return;

  const codeElement = document.createElement('pre');
  codeElement.classList.add('highlighting-content', 'language-quorum');

  commentRanges.forEach((range) => {
    const startLine = range[0] - 1;
    const endLine = range[1] - 1;
    let code = '';
    for (let i = startLine; i <= endLine; i++) {
      code += codeElements[i].textContent + '\n';
    }

    codeElement.textContent = code;
    Prism.highlightElement(codeElement);

    const highlightedCode = codeElement.innerHTML;

    const newCode = highlightedCode.replace(/(\n)/g, '</span>$1<span class="token comment">');

    const codeLines = newCode.split('\n');

    for (let i = startLine; i <= endLine; i++) {
      codeElements[i].innerHTML = codeLines[i - startLine];
    }
  });
}


export function mimicTextAreaStyle(textArea: HTMLTextAreaElement & AdditionalTypes, delayHeight: boolean = false): void {
  const preId = textArea.uniqueIdPrefix;
  if (!preId) return console.error('No unique id prefix found');

  const height = textArea.clientHeight + 'px';
  const width = textArea.clientWidth + 'px';
  createCache(preId);

  ideCache[preId].lineNumberDiv.style.height = height;
  ideCache[preId].codeBlocks.style.width = width;
  ideCache[preId].codeBlocks.style.maxWidth = width;

  ideCache[preId].codeBlocks.style.height = height;
  ideCache[preId].codeBlocks.style.maxHeight = height;
  ideCache[preId].codeBlocks.style.minHeight = height;

  ideCache[preId].codeDivs = Array.from(ideCache[preId].codeBlocks.querySelectorAll(`[id^="${preId}"] .code-block`));
  ideCache[preId].preElements = Array.from(ideCache[preId].codeBlocks.querySelectorAll(`[id^="${preId}"] .pre-code`));
  ideCache[preId].lineNumbers = Array.from(ideCache[preId].lineNumberDiv.querySelectorAll(`[id^="${preId}"] .line-number`));
  ideCache[preId].codeElements = Array.from(ideCache[preId].codeBlocks.querySelectorAll(`[id^="${preId}"] .code-line`));

  const codeDivsLength = ideCache[preId].codeDivs.length;

  const noWrapHeight = `${Math.round(parseFloat(styleGlobals.lineHeight) * parseFloat(styleGlobals.fontSize))}px`;
  const text = textArea.value;
  const lines: string[] = text.split(/\r|\r\n|\n/);
  for (let i = 0; i < codeDivsLength; i++) {
    const line = lines[i];
    if (textArea.wrap !== 'off') {
      ideCache[preId].codeDivs[i].style.width = width;
      ideCache[preId].preElements[i].style.width = width;
      ideCache[preId].codeDivs[i].style.minWidth = width;
      ideCache[preId].preElements[i].style.minWidth = width;
    } else {
      ideCache[preId].codeDivs[i].style.width = '100%';
      ideCache[preId].preElements[i].style.width = '100%';
      ideCache[preId].codeDivs[i].style.minWidth = '100%';
      ideCache[preId].preElements[i].style.minWidth = '100%';
    }
    updateLineHeight(preId, textArea, ideCache[preId].codeDivs[i], ideCache[preId].preElements[i], ideCache[preId].lineNumbers[i], ideCache[preId].codeElements[i], line, noWrapHeight, delayHeight);
  }
}

export function editAreaSyncScroll(element: HTMLTextAreaElement & AdditionalTypes): void {
  const preId = element.uniqueIdPrefix;
  if (!preId) return console.error('No unique id prefix found');
  const top = element.scrollTop;
  requestAnimationFrame(() => {
    if (element.wrap === 'off') {
      const left = element.scrollLeft;
      const codeDivs = ideCache[preId].codeDivs;
      const preElements = ideCache[preId].preElements;
      const length = codeDivs.length;

      for (let i = 0; i < length; i++) {
        preElements[i].scrollLeft = left;
        codeDivs[i].scrollLeft = left;
      }
    }

    ideCache[preId].codeBlocks.scrollTop = top;
    ideCache[preId].lineNumberDiv.scrollTop = top;
  });
}

export function highlightCursorLocation(element: HTMLTextAreaElement & AdditionalTypes): void {
  const colorCode = '80';
  const preId = element.uniqueIdPrefix;
  if (!preId) return console.error('No unique id prefix found');
  const cursorLocation = element.selectionStart;
  const lines = element.value.split(/\r|\r\n|\n/);

  let blockLocation = 0;
  let charPosition = 0;

  for (let i = 0; i < lines.length; i++) {
    charPosition += lines[i].length + (i === 0 ? 0 : 1);

    if (cursorLocation <= charPosition) {
      blockLocation = i + 1;
      break;
    }
  }

  ideCache[preId].cursorBlockLocation = blockLocation;
  ideCache[preId].lineNumbers[blockLocation - 1].style.color = ideCache[preId].theme === 'light' ? 'blue' : 'yellow';
  ideCache[preId].lineNumbers[blockLocation - 1].style.backgroundColor = `rgba(${colorCode}, ${colorCode}, ${colorCode}, 0.07)`;
  ideCache[preId].lineNumbers[blockLocation - 1].style.fontWeight = `bold`;
  ideCache[preId].codeDivs[blockLocation - 1].style.backgroundColor = `rgba(${colorCode}, ${colorCode}, ${colorCode}, 0.07)`;

  if (ideCache[preId].previousCursorLocation !== blockLocation && ideCache[preId].lineNumbers[ideCache[preId].previousCursorLocation - 1]) {
    updateElement(ideCache[preId].lineNumbers[ideCache[preId].previousCursorLocation - 1], {
      addStyle: {
        color: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.color,
        backgroundColor: 'transparent',
        fontWeight: 'normal',
      }
    });
    ideCache[preId].codeDivs[ideCache[preId].previousCursorLocation - 1].style.backgroundColor = 'transparent';
  }
  ideCache[preId].previousCursorLocation = blockLocation;
}



//when textarea is resized, resize the code blocks
export const mimicStyleAndClearCache = (textarea: HTMLTextAreaElement & AdditionalTypes) => {
  if (textarea.uniqueIdPrefix === undefined) return console.error('No unique id prefix found');
  mimicTextAreaStyle(textarea);
  ideCache[textarea.uniqueIdPrefix].lineHeightsMap.clear();
};

function debounce<F extends (...args: any[]) => void>(func: F, timeout = 300): (...args: Parameters<F>) => void {
  let timer: number | undefined;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => func(...args), timeout);
  };
}


export function syncResizeArea(textarea: HTMLTextAreaElement & AdditionalTypes): void {
  // Here, the debounced function expects no arguments, as it's wrapping a function that takes none.
  const mimicStyleAndClearCacheDebounced = debounce(() => mimicStyleAndClearCache(textarea));

  const observer = new ResizeObserver(() => {
    mimicStyleAndClearCacheDebounced();
  });

  observer.observe(textarea);
}



function updateLineHeight(
  preId: string,
  textArea: HTMLTextAreaElement,
  codeDiv: HTMLElement,
  preElement: HTMLElement,
  lineNumber: HTMLElement,
  singleCode: HTMLElement,
  line: string,
  unWrappedHeight: string,
  delayHeight: boolean = false
): void {
  function updateHeight() {
    let lineHeight: string;
    let computedHeight: number;

    if (textArea.wrap !== 'off') {
      if (ideCache[preId].lineHeightsMap.has(line)) {
        lineHeight = ideCache[preId].lineHeightsMap.get(line) as string;
      } else {
        const singleCodeStyle = window.getComputedStyle(singleCode);
        computedHeight = parseFloat(singleCodeStyle.height);
        if (isNaN(computedHeight) || computedHeight === 0) {
          lineHeight = `${parseFloat(styleGlobals.lineHeight) * parseFloat(styleGlobals.fontSize)}px`;
        } else {
          lineHeight = `${computedHeight}px`;
        }
        ideCache[preId].lineHeightsMap.set(line, lineHeight);
      }

      codeDiv.style.height = lineHeight;
      codeDiv.style.minHeight = lineHeight;
      preElement.style.height = lineHeight;
      preElement.style.minHeight = lineHeight;
      lineNumber.style.height = lineHeight;
      lineNumber.style.minHeight = lineHeight;
    } else {
      codeDiv.style.height = unWrappedHeight;
      codeDiv.style.minHeight = unWrappedHeight;
      preElement.style.height = unWrappedHeight;
      preElement.style.minHeight = unWrappedHeight;
      lineNumber.style.height = unWrappedHeight;
      lineNumber.style.minHeight = unWrappedHeight;
    }
    editAreaSyncScroll(textArea);
  }
  if (delayHeight) {
    ideCache[preId].lineHeightsMap.clear();
    setTimeout(updateHeight, 100);
  } else {
    updateHeight();
  }
}

