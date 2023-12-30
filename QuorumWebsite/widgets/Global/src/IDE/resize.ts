import { AdditionalTypes, isAndroid, isIOS, throttle } from "../util/helper.js";
import { editAreaSyncScroll, mimicTextAreaStyle } from "./highlight.js";

export function resizeElements(
  IDE: HTMLElement & AdditionalTypes,
  resizeConsoleArea: HTMLElement & AdditionalTypes,
  resizeTextArea: HTMLElement & AdditionalTypes,
  resizeHandle: HTMLElement & AdditionalTypes,
  UiContainer: HTMLElement & AdditionalTypes,
  outerConsoleSection: HTMLElement & AdditionalTypes,
  inputAndGraphicSection: HTMLElement & AdditionalTypes,
  textarea: HTMLTextAreaElement & AdditionalTypes,
  lineNumberDiv: HTMLElement & AdditionalTypes,
) {
  let isResizing = false;
  let currentX: number
  let currentY: number
  let initialWidth = IDE.offsetWidth;
  let initialHeight = IDE.getBoundingClientRect().height;

  let isTextResizing = false;
  let currentTextX: number
  let initialTextWidth = UiContainer.offsetWidth;

  let isConsoleResizing = false;
  let currentConsoleY: number;
  let initialConsoleHeight = outerConsoleSection.offsetHeight;
  const contentSection = document.getElementById(outerConsoleSection.uniqueIdPrefix + 'codeOutput');

  let timeout: number | null = null;

  window.addEventListener("resize", () => {
    // Clear the timeout if it exists
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    // Set a new timeout
    timeout = setTimeout(() => {
      if (textarea) {
        textarea.style.width = `calc(100% - 6ch)`;
      }
      // Nullify the timeout variable
      timeout = null;
    }, 300); // 300ms delay; you can adjust this value
  });


  resizeHandle.addEventListener('pointerdown', (event) => {
    if (isIOS() || isAndroid()) return;
    event.preventDefault();
    console.log(getIsShowingCode(IDE.id));
    isResizing = true;
    currentX = event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
    currentY = event instanceof TouchEvent ? event.changedTouches[0].pageY : event.pageY;
    initialWidth = IDE.getBoundingClientRect().width;
    initialHeight = IDE.getBoundingClientRect().height;
    textarea.style.width = `calc(100% - 6ch)`;
    currentTextX = currentX;
    initialTextWidth = UiContainer.offsetWidth;
  });

  resizeTextArea.addEventListener('pointerdown', (event) => {
    if (isIOS() || isAndroid()) return;
    event.preventDefault();
    isTextResizing = true;
    textarea.style.width = `calc(100% - 6ch)`;
    currentTextX = event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
    initialTextWidth = UiContainer.offsetWidth;
  });

  resizeConsoleArea.addEventListener('pointerdown', (event) => {
    if (isIOS() || isAndroid()) return;
    event.preventDefault();
    isConsoleResizing = true;
    textarea.style.width = `calc(100% - 6ch)`;
    currentConsoleY = event instanceof TouchEvent ? event.changedTouches[0].pageY : event.pageY;
    initialConsoleHeight = outerConsoleSection.offsetHeight;
  });

  const scrollThreshold = 50; // Number of pixels from bottom to trigger scroll
  let isMouseDown = false;


  window.addEventListener('pointerup', () => {
    isMouseDown = false;
  });

  document.addEventListener('pointermove', throttle(resizeOnMove, 100));

  function resizeOnMove(event: PointerEvent | TouchEvent) {
    const incrementSize = 2;

    const container = document.getElementById(IDE.id + 'QuUiContainerSize');
    const textQCText = document.getElementById(IDE.id + 'QuUiContainerSizeText');
    if (container && textQCText) {
      const width = container.offsetWidth;

      // Adjust the width value according to when you want the span to disappear
      if (width <= 100) {
        textQCText.style.display = 'none';
      } else {
        textQCText.style.display = 'block';
      }
    }


    if (isConsoleResizing) {
      const diffY = event instanceof TouchEvent ? event.changedTouches[0].pageY - currentConsoleY : event.pageY - currentConsoleY;
      const height = initialConsoleHeight - (Math.round(diffY / incrementSize) * incrementSize);
      const contentSection = document.getElementById(outerConsoleSection.uniqueIdPrefix + 'codeOutput');

      if (inputAndGraphicSection && contentSection && ((contentSection.offsetHeight) > height)) {
        outerConsoleSection.style.height = `${height}px`;
        outerConsoleSection.style.minHeight = `${height}px`;
      }
    }
    else if (isTextResizing) {
      const diffX = event instanceof TouchEvent ? event.changedTouches[0].pageX - currentTextX : event.pageX - currentTextX;

      const width = initialTextWidth - (Math.round(diffX / incrementSize) * incrementSize);
      const lineNumberDivWidth = lineNumberDiv.offsetWidth;
      if ((inputAndGraphicSection.offsetWidth) > width) {
        UiContainer.style.width = `${width - lineNumberDivWidth - 8}px`;
        UiContainer.style.minWidth = `${width}px`;
      }
    }
    else if (isResizing) {
      const diffX = event instanceof TouchEvent ? event.changedTouches[0].pageX - currentX : event.pageX - currentX;
      const diffY = event instanceof TouchEvent ? event.changedTouches[0].pageY - currentY : event.pageY - currentY;
      IDE.style.width = `${roundToEven(initialWidth + (Math.round(diffX / incrementSize) * incrementSize))}px`;
      IDE.style.height = `${roundToEven(initialHeight + (Math.round(diffY / incrementSize) * incrementSize))}px`;

      if (!getIsShowingCode(IDE.id)) {
        const width = inputAndGraphicSection.getBoundingClientRect().width;
        UiContainer.style.width = `${width}px`;
        UiContainer.style.minWidth = `${width}px`;
        UiContainer.style.maxWidth = `${width}px`;
      } else {
        if (IDE.getBoundingClientRect().width < (UiContainer.getBoundingClientRect().width)) {
          const width = inputAndGraphicSection.getBoundingClientRect().width;
          UiContainer.style.width = `${width / 2.5}px`;
          UiContainer.style.minWidth = `${width / 2.5}px`;
        }
      }
      if (contentSection)
        isMouseDown = true;
      mimicTextAreaStyle(textarea, true);
      if ((event as PointerEvent).clientY >= window.innerHeight - scrollThreshold) {
        // Mouse is at bottom of page, start scrolling
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, 8); // Scroll down by 10 pixels
          if (!isMouseDown || window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            clearInterval(scrollInterval); // Stop scrolling if mouse is released or end of page is reached
          }
        }, 100); // Repeat scroll every 10 milliseconds
      }
    }
    if (isResizing || isTextResizing || isConsoleResizing) {
      mimicTextAreaStyle(textarea, true);
      editAreaSyncScroll(textarea);
    }
  }

  document.addEventListener('pointerup', () => {
    isMouseDown = false;
    if (lineNumberDiv.style.display == 'none') {
      lineNumberDiv.style.display = 'flex';
    }
    if (isTextResizing || isConsoleResizing || isResizing) {
      resizeToNearest2px(textarea);
      editAreaSyncScroll(textarea);
    }
    isTextResizing = false;
    isResizing = false;
    isConsoleResizing = false;
  });

  document.addEventListener('pointercancel', () => {
    if (isTextResizing || isConsoleResizing || isResizing) {
      isTextResizing = false;
      isResizing = false;
      isConsoleResizing = false;
    }
  });

}

export function updateWHQuorumBox(QuUiContainer: HTMLDivElement & AdditionalTypes): void {
  // const observer = new ResizeObserver((entries) => {
  //   entries.forEach(() => {
  //     const QuWHDisplay = document.getElementById(QuUiContainer.uniqueIdPrefix + 'QuUiContainerSizeText');
  //     const QuUiContainerWidth = QuUiContainer.offsetWidth;
  //     const QuUiContainerHeight = QuUiContainer.offsetHeight;
  //     if (QuWHDisplay)
  //       QuWHDisplay.textContent = `${QuUiContainerWidth} x ${QuUiContainerHeight}`;
  //   });
  // });
  // observer.observe(QuUiContainer);
}

function getIsShowingCode(preId: string): boolean {
  const inputAndGraphicSection = document.getElementById(preId + 'inputAndGraphicSection');
  if (inputAndGraphicSection) {
    if (inputAndGraphicSection.dataset.showingText) {
      return inputAndGraphicSection.dataset.showingText === 'true';
    }
  }
  return true;
}

export function resizeToNearest2px(textarea: HTMLTextAreaElement) {
  // Get the current width
  const currentWidth = textarea.offsetWidth;

  // Find the nearest multiple of 10
  const adjustedWidth = Math.round(currentWidth / 2) * 2;

  // Apply the adjusted width
  textarea.style.width = `${adjustedWidth}px`;
}

function roundToEven(value: number): number {
  //make value a whole number
  value = Math.round(value);
  const newValue = value % 2 === 0 ? value : value + 1;
  return newValue;
}


