import type * as CSSTYPE from "csstype";
import { AdditionalTypes, createElement, updateElement } from "../util/helper.js";
import { updateCodeEditorDisplay, mimicTextAreaStyle, ideCache } from "./highlight.js";
import { exportIcon, helpIcon, hideCodeIcon, hideDisplayIcon, loadFileIcon, settingsIcon, showConsoleIcon } from "./icons.js";
import { CSS, mainDesktopContainer, mainMobileContainer } from "./style/style.js";
import { focusTrap } from "../util/focusTrap";
import { fullscreenIcon } from "../UiKit/atoms/icons/icons";
import { resizeWordBreakWord } from "./settingsModal.js";
import { resizeToNearest2px } from "./resize.js";
import JSZIP from 'jszip';


export function makeSidebar(
  contentSection: HTMLDivElement & AdditionalTypes,
  IDE: HTMLDivElement,
  preId: string
) {
  const sidebar = createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.sideBarStyle.container,
    uniqueIdPrefix: IDE.id,
    id: 'sideBar',
    appendTo: contentSection,
  });

  const topSidebar = createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.sideBarStyle.TopSection,
    uniqueIdPrefix: IDE.id,
    id: 'topSidebar',
    appendTo: sidebar,
  });

  const buttonStyle: CSSTYPE.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: ideCache[preId].theme === 'light' ? 'black' : 'white',
    border: 'none',
    padding: '10px',
    fontSize: '12px',
    width: '100%',
    lineHeight: '1.5',
    fontFamily: 'Montserrat',
  };

  createElement('button', {
    innerHTML: exportIcon,
    addStyle: buttonStyle,
    uniqueIdPrefix: IDE.id,
    ariaLabel: 'Export Code',
    id: 'exportButton',
    onclick: function(this) {
      console.clear();
      const that = this as HTMLButtonElement & AdditionalTypes;
      const prefix = that.uniqueIdPrefix;
      const elements = Array.from(document.querySelectorAll(`[id^=${prefix}]`));
      const tabs = elements.filter(el => el.id.endsWith('tabText'));

      const textarea = document.getElementById(
        that.uniqueIdPrefix + 'IdeInput'
      ) as HTMLTextAreaElement;



      if (tabs.length === 1) {
        let title = IDE.dataset.title;
        title = title ? title : 'MyCode.quorum';
        downloadFile(textarea.value, title);
      } else {
        const zip = new JSZIP();

        tabs.forEach((tab, index) => {
          textarea.dataset.currentTab = index.toString();
          updateCodeEditorDisplay(textarea);
          if (tab.textContent) {
            const fileName =
              tab.textContent.trim() || `untitled${index}.quorum`;
            const content = textarea.value;
            zip.file(fileName, content);
          } else {
            console.log('tab does not have textContent');
          }
        });

        zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
          saveAs(content, 'code_tabs.zip');
        });
      }
    },
    addChildren: [
      createElement('span', {
        textContent: 'Export Code',
        addStyle: {
          textAlign: 'center',
          marginTop: '3px',
        },
      }),
    ],
    appendTo: topSidebar,
  });

  createElement('button', {
    innerHTML: loadFileIcon,
    uniqueIdPrefix: IDE.id,
    ariaLabel: 'Load File',
    id: 'loadFileButton',
    tabIndex: 0,
    onclick: function(this) {
      const loadFileButton = this as HTMLButtonElement & AdditionalTypes;
      if (!loadFileButton.uniqueIdPrefix) return;
      const fileInput = document.getElementById(
        loadFileButton.uniqueIdPrefix + 'fileInput'
      ) as HTMLInputElement;
      fileInput.click();
    },
    addStyle: buttonStyle,
    addChildren: [
      createElement('div', {
        textContent: 'Load File',
        addStyle: {
          textAlign: 'center',
          marginTop: '3px',
        },
      }),
      createElement('input', {
        type: 'file',
        title: 'Load File',
        ariaHidden: 'true',
        addDataset: {
          fileId: IDE.id,
        },
        uniqueIdPrefix: IDE.id,
        id: 'fileInput',
        addStyle: {
          marginTop: '3px',
          width: '0px',
          height: '0px',
          display: 'none',
        },
        onchange: function(this) {
          const fileInput = this as HTMLInputElement & AdditionalTypes;
          if (!fileInput || !fileInput.uniqueIdPrefix || !fileInput.files) return console.log(`no fileInput: ${fileInput} or no uniqueIdPrefix: ${fileInput.uniqueIdPrefix} or no files: ${fileInput.files}`);

          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function() {
            const textarea = document.getElementById(
              fileInput.dataset.fileId + 'IdeInput'
            ) as HTMLTextAreaElement;

            // Collect all elements starting with uniqueIdPrefix
            const elements = Array.from(document.querySelectorAll(`[id^=${fileInput.dataset.fileId}]`));

            // Filter elements to match those ending with 'tabText' and the currentTab
            const tabButton = elements.find(el => el.id.endsWith('tabText' + textarea.dataset.currentTab)) as HTMLButtonElement;

            if (tabButton) {
              let innerHTML = tabButton.innerHTML;
              //get value up the the &nbsp;
              innerHTML = innerHTML.substring(0, innerHTML.indexOf('&nbsp;') + 6);
              tabButton.innerHTML = innerHTML + file.name;
            }

            if (!fileInput.dataset.fileId) return console.log('no file id');
            if (!textarea.dataset.currentTab) return console.log('no current tab');

            ideCache[fileInput.dataset.fileId].tabValues[
              +textarea.dataset.currentTab
            ] = reader.result as string;
            textarea.value = reader.result as string;
            updateCodeEditorDisplay(textarea);
          }.bind(this);
          reader.readAsText(file);
        },
      }),
    ],
    appendTo: topSidebar,
  });

  createElement('button', {
    innerHTML: hideCodeIcon,
    addStyle: buttonStyle,
    ariaLabel: 'Hide Code Panel',
    uniqueIdPrefix: IDE.id,
    id: 'hideCodeButton',
    onclick: function(this) {
      const hideButton = this as HTMLButtonElement & AdditionalTypes;
      if (!hideButton.uniqueIdPrefix) return;
      const inputSection = document.getElementById(
        hideButton.uniqueIdPrefix + 'inputAndGraphicSection'
      ) as HTMLDivElement;
      inputSection.dataset.showingText =
        inputSection.dataset.showingText === 'true' ? 'false' : 'true';
      hideDisplay(hideButton.uniqueIdPrefix);
    },
    addChildren: [
      createElement('div', {
        textContent: 'Hide Code',
        uniqueIdPrefix: IDE.id,
        id: 'hideCodeText',
        addStyle: {
          marginTop: '3px',
          textAlign: 'center',
        },
      }),
    ],
    appendTo: topSidebar,
  });

  createElement('button', {
    innerHTML: hideDisplayIcon,
    addStyle: buttonStyle,
    ariaLabel: 'Hide Graphics Panel',
    uniqueIdPrefix: IDE.id,
    id: 'hideDisplayButton',
    onclick: function(this) {
      const hideGraphicButton = this as HTMLButtonElement & AdditionalTypes;
      if (!hideGraphicButton.uniqueIdPrefix) return;
      const inputSection = document.getElementById(
        hideGraphicButton.uniqueIdPrefix + 'inputAndGraphicSection'
      ) as HTMLDivElement;
      inputSection.dataset.showingGraphic =
        inputSection.dataset.showingGraphic === 'true' ? 'false' : 'true';
      hideDisplay(hideGraphicButton.uniqueIdPrefix);
    },

    addChildren: [
      createElement('div', {
        textContent: 'Hide Display',
        uniqueIdPrefix: IDE.id,
        id: 'hideDisplayText',
        addStyle: {
          textAlign: 'center',
          marginTop: '3px',
          justifyContent: 'flex-end',
        },
      }),
    ],
    appendTo: topSidebar,
  });

  createElement('button', {
    innerHTML: showConsoleIcon,
    addStyle: buttonStyle,
    ariaLabel: 'Show/Hide Console',
    uniqueIdPrefix: IDE.id,
    id: 'showConsoleButton',
    addChildren: [
      createElement('div', {
        textContent: 'Hide Console',
        uniqueIdPrefix: IDE.id,
        id: 'hideConsoleText',
        addStyle: {
          marginTop: '3px',
          textAlign: 'center',
          justifyContent: 'flex-end',
        },
      }),
    ],
    onclick: function(this) {
      const showConsoleButton = this as HTMLButtonElement & AdditionalTypes;
      if (!showConsoleButton.uniqueIdPrefix) return;
      showHideConsole(showConsoleButton.uniqueIdPrefix);
    },
    appendTo: topSidebar,
  });

  createElement('button', {
    innerHTML: fullscreenIcon,
    addStyle: buttonStyle,
    ariaLabel: 'Full Screen',
    uniqueIdPrefix: IDE.id,
    id: 'fullScreenButton',
    addChildren: [
      createElement('div', {
        textContent: 'Full Screen',
        uniqueIdPrefix: IDE.id,
        id: 'fullScreenText',
        addStyle: {
          marginTop: '3px',
          textAlign: 'center',
          justifyContent: 'flex-end',
        },
      }),
    ],
    onclick: function(this) {
      const fullScreenButton = this as HTMLButtonElement & AdditionalTypes;
      if (!fullScreenButton.uniqueIdPrefix) return;
      fullScreenIDE(fullScreenButton.uniqueIdPrefix);
      const textArea = document.getElementById(IDE.id + 'IdeInput') as HTMLTextAreaElement;
      if (textArea.wrap === 'off') {
        resizeWordBreakWord(textArea, true);
      }
    },
    appendTo: topSidebar,
  });

  const bottomSidebar = createElement('div', {
    addStyle: {},
    uniqueIdPrefix: IDE.id,
    id: 'bottomSidebar',
    appendTo: sidebar,
  });

  createElement('button', {
    innerHTML: helpIcon,
    uniqueIdPrefix: IDE.id,
    id: 'helpButton',
    ariaLabel: 'Help Information',
    addStyle: buttonStyle,
    addChildren: [
      createElement('div', {
        textContent: 'Help',
        addStyle: {
          textAlign: 'center',
          marginTop: '3px',
        },
      }),
    ],
    onclick: function(this) {
      const helpButton = this as HTMLButtonElement & AdditionalTypes;
      if (!helpButton.uniqueIdPrefix) return;
      const modal = document.getElementById(helpButton.uniqueIdPrefix + 'helpModal');
      if (modal) {
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
          modal.ariaHidden = 'true';
          modal.tabIndex = -1;
        } else {
          modal.style.display = 'block';
          modal.ariaHidden = 'false';
          modal.tabIndex = 0;
          modal.focus();
          const outerHelpModal = document.getElementById(
            IDE.id + 'helpModal'
          ) as HTMLDivElement;
          //get the first and last focusable elements
          const focusableElements = outerHelpModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          const firstFocusableElement = focusableElements.item(0) as HTMLElement;
          const lastFocusableElement = focusableElements.item(
            focusableElements.length - 1
          );
          lastFocusableElement.addEventListener('keydown', (event) => {
            const keyboardEvent = event as KeyboardEvent;
            if (keyboardEvent.key === 'Tab' && !keyboardEvent.shiftKey) {
              event.preventDefault();
              firstFocusableElement.focus();
            }
          });
        }
      }
    },
    appendTo: bottomSidebar,
  });

  createElement('button', {
    innerHTML: settingsIcon,
    addStyle: buttonStyle,
    tabIndex: 0,
    uniqueIdPrefix: IDE.id,
    id: 'settingsButton',
    onclick: function(this) {
      const settingsButton = this as HTMLButtonElement & AdditionalTypes;
      if (!settingsButton.uniqueIdPrefix) return;
      const modal = document.getElementById(
        settingsButton.uniqueIdPrefix + 'settingsModal'
      ) as HTMLDivElement;
      if (modal) {
        if (modal.style.display === 'block') {
          closeSettingsModal(modal);
        } else {
          openSettingsModal(modal);
        }
      }
    },
    addChildren: [
      createElement('div', {
        textContent: 'Settings',
        addStyle: {
          textAlign: 'center',
        },
      }),
    ],
    appendTo: bottomSidebar,
  });

  document.addEventListener('click', function(event) {

    const modal = document.getElementById(IDE.id + 'settingsModal') as HTMLDivElement;
    const settingsButton = document.getElementById(IDE.id + 'settingsButton');
    if (
      event.target &&
      settingsButton &&
      modal &&
      event.target !== modal &&
      !modal.contains((event.target as Node)) &&
      event.target !== settingsButton &&
      !settingsButton.contains(event.target as Node)
    ) {
      if (modal.style.display === 'block') {
        closeSettingsModal(modal);
      }
    }
  });

  document.addEventListener('click', function(event) {
    const modal = document.getElementById(IDE.id + 'helpModal') as HTMLDivElement;
    const helpButton = document.getElementById(IDE.id + 'helpButton');
    if (
      event.target &&
      helpButton &&
      modal &&
      event.target !== modal &&
      !modal.contains(event.target as Node) &&
      event.target !== helpButton &&
      !helpButton.contains(event.target as Node)
    ) {
      if (modal.style.display === 'block') {
        closeSettingsModal(modal);
      }
    }
  });


  //get the element with the id hideDisplay inside of the sideBar element 
  //make this on resize
  return sidebar;
}

export function downloadFile(codeValue: string, fileName: string) {
  // Check if filename has a .quorum extension, if not, append it
  if (!fileName.endsWith('.quorum')) {
    fileName += '.quorum';
  }

  const blob = new Blob([codeValue], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, fileName);
}

function saveAs(blob: Blob, fileName: string) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}


function openSettingsModal(modal: HTMLDivElement & AdditionalTypes) {
  modal.style.display = 'block';
  modal.ariaHidden = 'false';
  modal.tabIndex = 0;
  modal.focus();
  const outerSettingsModal = document.getElementById(
    modal.uniqueIdPrefix + 'settingsModal'
  ) as HTMLDivElement;
  //get the first and last focusable elements
  const focusableElements = outerSettingsModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusableElement = focusableElements.item(0) as HTMLElement;
  const lastFocusableElement = focusableElements.item(
    focusableElements.length - 1
  );
  lastFocusableElement.addEventListener('keydown', (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Tab' && !keyboardEvent.shiftKey) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  });
}

function closeSettingsModal(modal: HTMLDivElement & AdditionalTypes) {
  modal.style.display = 'none';
  modal.ariaHidden = 'true';
  modal.tabIndex = -1;
}

export function hideDisplay(preId: string) {
  const getEl = (suffix: string) => document.getElementById(`${preId}${suffix}`);
  const getDiv = (suffix: string) => getEl(suffix) as HTMLDivElement;
  const inputSection = getEl("inputAndGraphicSection");
  const QuUiContainer = getDiv("UiContainer");
  const lineNumberDiv = getDiv("lineNumberDiv");
  const runButton = getDiv("runButton");


  if (!inputSection || !QuUiContainer || !lineNumberDiv || !runButton) return;

  //set focus to QuUiContainer
  //if the focus was somewhere in the IDE then focus on the runButton
  if (document.activeElement && document.activeElement.id.startsWith(preId)) {
    console.log('focus on run button: ' + preId);
    runButton.focus();
  }


  const computedWidth = getComputedStyle(inputSection).getPropertyValue('width');
  const halfComputedWidth = (parseInt(computedWidth) / 2).toString() + 'px';
  const TorF = `${inputSection.dataset.showingText},${inputSection.dataset.showingGraphic}`;
  const textResizeBar = getDiv("resizeIdeHandle");
  const textarea = getEl("IdeInput") as HTMLTextAreaElement;
  const hideCodeText = getEl("hideCodeText") as HTMLButtonElement;
  const hideDisplayText = getEl("hideDisplayText") as HTMLButtonElement;
  const QuSizeText = getEl("QuUiContainerSizeText") as HTMLSpanElement
  const inputAndTabBar = getDiv("inputAndTabBar");

  function setTextareaWidth() {
    textarea.style.width = 'calc(100% - 6ch)';
    resizeToNearest2px(textarea);
    mimicTextAreaStyle(textarea, true);
  }

  function setQuUiContainerWidth(width: string) {
    QuUiContainer.style.width = width;
    QuUiContainer.style.maxWidth = width;
    QuUiContainer.style.minWidth = width;
  }

  switch (TorF) {
    case 'false,false':
    case 'true,true':
      QuUiContainer.style.display = 'flex';
      lineNumberDiv.style.display = 'flex';
      setQuUiContainerWidth(halfComputedWidth);
      inputSection.dataset.showingGraphic = 'true';
      inputSection.dataset.showingText = 'true';
      inputAndTabBar.style.display = 'flex';
      hideCodeText.textContent = 'Hide Code';
      hideDisplayText.textContent = 'Hide Display';
      textResizeBar.style.display = 'block';
      textResizeBar.style.width = '8px';
      QuSizeText.style.display = 'block';
      setTextareaWidth();
      break;
    case 'true,false':
      setQuUiContainerWidth('0px');
      inputAndTabBar.style.display = 'flex';
      hideCodeText.textContent = 'Hide Code';
      hideDisplayText.textContent = 'Show Display';
      textResizeBar.style.display = 'none';
      textResizeBar.style.width = '0px';
      QuSizeText.style.display = 'none';
      setTextareaWidth();
      break;
    case 'false,true':
      lineNumberDiv.style.display = 'none';
      inputAndTabBar.style.display = 'none';
      setQuUiContainerWidth(computedWidth);
      hideCodeText.textContent = 'Show Code';
      hideDisplayText.textContent = 'Hide Display';
      QuSizeText.style.display = 'block';
      textResizeBar.style.width = '0px';
      textResizeBar.style.display = 'none';
      break;
  }

  ideCache[preId].lineHeightsMap.clear();
  mimicTextAreaStyle(textarea);
}


export function showHideConsole(preId: string) {
  const outerConsoleSection = document.getElementById(
    `${preId}outerConsole`
  ) as HTMLDivElement;
  const hideConsoleText = document.getElementById(
    `${preId}hideConsoleText`
  ) as HTMLButtonElement;

  if (outerConsoleSection.style.height == '0px') {
    outerConsoleSection.style.height = '100px';
    outerConsoleSection.style.minHeight = '100px';
    outerConsoleSection.style.maxHeight = '100px';
    hideConsoleText.textContent = 'Hide Console';
  } else {
    outerConsoleSection.style.height = '0px';
    outerConsoleSection.style.minHeight = '0px';
    outerConsoleSection.style.maxHeight = '0px';
    hideConsoleText.textContent = 'Show Console';
  }
  const textarea = document.getElementById(
    `${preId}IdeInput`
  ) as HTMLTextAreaElement;
  updateCodeEditorDisplay(textarea);
  mimicTextAreaStyle(textarea);
}

let originalParent: HTMLElement | null = null;
let originalNextSibling: HTMLElement | null = null;

export function fullScreenIDE(preId: string) {
  const IDE = document.getElementById(`${preId}`) as HTMLDivElement;
  const inputAndTabBar = document.getElementById(`${preId}inputAndTabBar`) as HTMLTextAreaElement;
  const UiContainer = document.getElementById(`${preId}UiContainer`) as HTMLTextAreaElement;
  const resizeIdeHandle = document.getElementById(`${preId}resizeIdeHandle`) as HTMLTextAreaElement;
  const textarea = document.getElementById(`${preId}IdeInput`) as HTMLTextAreaElement;
  const inputAndGraphicSection = document.getElementById(`${preId}inputAndGraphicSection`) as HTMLTextAreaElement;
  const hideCodeText = document.getElementById(preId + "hideCodeText") as HTMLButtonElement;
  const hideDisplayText = document.getElementById(preId + "hideDisplayText") as HTMLButtonElement;

  inputAndTabBar.style.display = 'flex';
  resizeIdeHandle.style.display = 'block';
  resizeIdeHandle.style.width = '8px';


  hideCodeText.textContent = 'Hide Code';
  hideDisplayText.textContent = 'Hide Display';


  //make the ide full screen
  if (IDE.style.zIndex !== '1000') {
    originalParent = IDE.parentElement;
    originalNextSibling = IDE.nextElementSibling as HTMLElement;

    updateElement(IDE, {
      addStyle: {
        zIndex: '1000',
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100dvw',
        height: '100dvh',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        margin: '0px',
      },
      appendTo: document.body,
    });
  }
  //make the ide not full screen
  else {
    const isMobile = window.matchMedia('(max-width: 760px)').matches;

    updateElement(IDE, {
      addStyle: isMobile ? mainMobileContainer : mainDesktopContainer,
    });
    focusTrap(IDE).deactivate();

    if (originalParent && originalNextSibling) {
      originalParent.insertBefore(IDE, originalNextSibling);
    } else if (originalParent) {
      originalParent.appendChild(IDE);
    }
    UiContainer.style.width = '40%';
    UiContainer.style.minWidth = '40%';
  }

  inputAndGraphicSection.dataset.showingGraphic = 'true';
  inputAndGraphicSection.dataset.showingText = 'true';

  textarea.style.width = 'calc(100% - 6ch)';
  mimicTextAreaStyle(textarea, true);

  //focus on the Full screen button
  setTimeout(() => {
    const fullScreenButton = document.getElementById(
      `${preId}fullScreenButton`
    ) as HTMLButtonElement;
    fullScreenButton.focus();

    const textarea = document.getElementById(
      `${preId}IdeInput`
    ) as HTMLTextAreaElement;
    ideCache[preId].lineHeightsMap.clear();
    mimicTextAreaStyle(textarea);
    updateCodeEditorDisplay(textarea);
  }, 1000);
}

