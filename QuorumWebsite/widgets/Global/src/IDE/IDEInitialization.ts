import { Tabs } from "../UiKit/atoms/tabs/tabs";
import { Theme, TupleToUnion } from "../UiKit/helperTypes";
import { AdditionalTypes, createElement, updateElement } from "../util/helper";
import { setSimpleIDE } from "./SimpleIDE";
import { makeHeaderSection } from "./headerSection";
import { createHelpModal } from "./helpModal";
import { createCache, editAreaSyncScroll, ideCache, mimicTextAreaStyle, syncResizeArea, updateCodeEditorDisplay } from "./highlight";
import { createKeyboardShortcuts } from "./keyboardShortcuts";
import { resizeElements, updateWHQuorumBox } from "./resize";
import { createSettingsModal } from "./settingsModal";
import { makeSidebar } from "./sideBar";
import { CSS, Offsets, createCssForIDE } from "./style/style";
import { createTextArea } from "./textArea";

export function createIDE(ideElement: HTMLDivElement & AdditionalTypes): HTMLDivElement {
  const uniqueIDEid = `data11y_${ideElement.id}_${Math.random().toString(36).substring(2, 8)}_`;
  createCssForIDE(uniqueIDEid, "desktop");

  const ide = updateElement(ideElement, {
    uniqueIdPrefix: uniqueIDEid,
    id: uniqueIDEid,
    addStyle: CSS[uniqueIDEid].mainContainer,
    onkeydown: handleIDEKeyDown.bind(null, uniqueIDEid),
  }) as HTMLDivElement & AdditionalTypes;

  const setColorTheme = ide.dataset.ideTheme ? ide.dataset.ideTheme as TupleToUnion<Theme> : 'light';
  //create cache for the individual IDEs
  createCache(uniqueIDEid, true, setColorTheme);


  makeHeaderSection(ide, uniqueIDEid);
  const contentSection = createContentSection(ide, uniqueIDEid);
  const tabs = createTabsComponent(uniqueIDEid);
  makeSidebar(contentSection, ide, uniqueIDEid);
  createHelpModal(ide);
  createSettingsModal(ide, tabs);

  const textAreaComponents = createTextArea(ide, uniqueIDEid, contentSection, tabs);
  const resizeConsoleHandle = createResizeConsoleHandle(ide, uniqueIDEid, textAreaComponents.codeAndOutput);
  const outerConsole = createOuterConsoleSection(ide, uniqueIDEid, textAreaComponents.codeAndOutput);

  const resizeHandle = createResizeHandle(ide, uniqueIDEid);
  addResizeFunctionality(ide, resizeConsoleHandle, outerConsole, textAreaComponents, resizeHandle);

  return ide;
}

/**
 * Updates the appearance of the IDE based on the current theme and other settings.
 * @param ideElement - The HTML element representing the IDE.
 */
export function updateIDEAppearance(IDE: HTMLDivElement & AdditionalTypes): void {
  if (!IDE || !IDE.uniqueIdPrefix) return
  const preId = IDE.uniqueIdPrefix;

  if (IDE.dataset.simple === "true") {
    setSimpleIDE(IDE, preId);
  }

  if (IDE.dataset.qdWidth && IDE.dataset.qdHeight) {

    const UiContainer = document.getElementById(preId + 'UiContainer');
    if (UiContainer) {
      UiContainer.style.width = IDE.dataset.qdWidth;
      UiContainer.style.minWidth = IDE.dataset.qdWidth;
      UiContainer.style.maxWidth = IDE.dataset.qdWidth;

      if (IDE.dataset.hideCode === 'true') {
        const resizeIdeHandle = document.getElementById(preId + 'resizeIdeHandle') as HTMLDivElement;
        resizeIdeHandle.style.display = 'none';
        IDE.style.width = (parseInt(IDE.dataset.qdWidth) + Offsets.sideBarOffset) + "px";
      }

      if (IDE.dataset.qdHeight) {
        const height = parseInt(IDE.dataset.qdHeight) + 217;
        IDE.style.height = height + "px";
      }
    }
  }

  if (IDE.dataset.hideCode === 'true') {
    const hideCodeButton = document.getElementById(preId + 'hideCodeButton');
    if (hideCodeButton)
      hideCodeButton.click();
  }
  if (IDE.dataset.hideDisplay === 'true') {
    const hideDisplayButton = document.getElementById(preId + 'hideDisplayButton');
    if (hideDisplayButton)
      hideDisplayButton.click();
  }

  const textArea = document.getElementById(`${preId}IdeInput`) as HTMLTextAreaElement;
  updateCodeEditorDisplay(textArea);
  mimicTextAreaStyle(textArea, true);
  editAreaSyncScroll(textArea);
}


/**
 * functions to create the IDE
 */

function handleIDEKeyDown(preId: string, event: KeyboardEvent) {
  createKeyboardShortcuts(event, preId);
}

function createContentSection(IDE: HTMLDivElement & AdditionalTypes, preId: string) {
  return createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.container,
    uniqueIdPrefix: preId,
    id: 'contentSection',
    appendTo: IDE
  });
}

function createTabsComponent(preId: string): Tabs {
  const tabs = new Tabs({
    theme: 'light',
    size: 'sm',
    uniqueIdPrefix: preId,
    id: 'tabBar',
    shouldHaveCloseButton: false,
    shouldHavePlusButton: false
  });
  tabs.switchTheme(ideCache[preId].theme);
  return tabs;
}

function createResizeConsoleHandle(IDE: HTMLDivElement & AdditionalTypes, preId: string, codeAndOutput: HTMLDivElement & AdditionalTypes) {
  return createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
      .consoleSectionStyle.resizeBar,
    uniqueIdPrefix: IDE.id,
    id: 'resizeConsoleHandle',
    addClass: ['resize-console-handle'],
    ariaLabel: 'Resize Console Area, use up and down arrow keys to resize',
    role: 'separator',
    appendTo: codeAndOutput,
    tabIndex: 0,
    onkeydown: function(event) {
      if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
        event.preventDefault();
        adjustConsoleHeight(preId, event.key);
      }
    }
  });
}

function adjustConsoleHeight(preId: string, key: string) {
  const contentSection = document.getElementById(preId + 'contentSection');
  const outerConsole = document.getElementById(preId + 'outerConsole');
  if (outerConsole && contentSection) {
    let height = outerConsole.clientHeight + (key === 'ArrowUp' ? 10 : -10);
    height = Math.round(height / 10) * 10;
    if (key === 'ArrowUp' && contentSection.clientHeight - 20 > outerConsole.clientHeight ||
      key === 'ArrowDown' && height >= 0) {
      outerConsole.style.height = `${height}px`;
      outerConsole.style.minHeight = `${height}px`;
      outerConsole.style.maxHeight = `${height}px`;
    }
  }
}

function createOuterConsoleSection(IDE: HTMLDivElement & AdditionalTypes, preId: string, codeAndOutput: HTMLDivElement & AdditionalTypes) {
  return createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
      .consoleSectionStyle.outerContainer,
    uniqueIdPrefix: IDE.id,
    id: 'outerConsole',
    appendTo: codeAndOutput,
    addChildren: [
      createElement('div', {
        addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
          .consoleSectionStyle.text,
        tabIndex: 0,
        ariaLabel: 'Console Output',
        role: 'log',
        uniqueIdPrefix: IDE.id,
        id: 'consoleSection',
      }),
    ],
  });
}

function createResizeHandle(IDE: HTMLDivElement & AdditionalTypes, preId: string) {
  return createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].resizeBar,
    uniqueIdPrefix: IDE.id,
    id: 'resizeHandle',
    addClass: ['resize-handle'],
    role: 'separator',
    tabIndex: 0,
    ariaLabel: 'Resize IDE, use arrow keys to resize',
    appendTo: IDE,
    onkeydown: function(event) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        adjustIDESize(IDE, event);
      }
    }
  });
}

function adjustIDESize(IDE: HTMLDivElement & AdditionalTypes, event: KeyboardEvent) {
  event.preventDefault();
  switch (event.key) {
    case 'ArrowUp':
      IDE.style.height = IDE.clientHeight - 10 + 'px';
      break;
    case 'ArrowDown':
      IDE.style.height = IDE.clientHeight + 10 + 'px';
      break;
    case 'ArrowLeft':
      IDE.style.width = IDE.clientWidth - 10 + 'px';
      break;
    case 'ArrowRight':
      IDE.style.width = IDE.clientWidth + 10 + 'px';
      break;
  }
  const textArea = document.getElementById(`${IDE.id}IdeInput`) as HTMLTextAreaElement;
  updateCodeEditorDisplay(textArea);
  mimicTextAreaStyle(textArea, true);
  editAreaSyncScroll(textArea);
}

function addResizeFunctionality(ide: HTMLDivElement & AdditionalTypes, resizeConsoleHandle: HTMLDivElement & AdditionalTypes, outerConsole: HTMLDivElement & AdditionalTypes, textAreaComponents: ReturnType<typeof createTextArea>, resizeHandle: HTMLDivElement & AdditionalTypes) {
  resizeElements(
    ide,
    resizeConsoleHandle,
    textAreaComponents.resizeTextArea,
    resizeHandle,
    textAreaComponents.UiContainer,
    outerConsole,
    textAreaComponents.inputAndGraphicSection,
    textAreaComponents.textarea,
    textAreaComponents.lineNumberDiv
  );
  updateWHQuorumBox(textAreaComponents.QuUiContainer);
  syncResizeArea(textAreaComponents.textarea);
}


