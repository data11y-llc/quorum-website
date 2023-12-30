import { Button } from '../UiKit/atoms/buttons/buttons';
import { Tabs } from '../UiKit/atoms/tabs/tabs';
import { AdditionalTypes, createElement, updateElement } from '../util/helper.js';
import {
  editAreaSyncScroll,
  updateCodeEditorDisplay,
  highlightCursorLocation,
  ideCache,
  mimicTextAreaStyle,
} from './highlight.js';
import { saveDisplayIcon } from './icons.js';
import { resizeToNearest2px } from './resize';
import { CSS } from './style/style.js';

let scrollbarTimeout: NodeJS.Timeout;

export function createTextArea(
  IDE: HTMLDivElement,
  preId: string,
  contentSection: HTMLDivElement,
  tabs: Tabs,
  testInput?: string
) {
  const originalValue = testInput as string;
  let newValue = originalValue;
  const leadingSpacesRegex = /^ +/gm;

  while (leadingSpacesRegex.test(newValue)) {
    newValue = newValue.replace(leadingSpacesRegex, (match) => {
      const spaceCount = match.length;
      const tabCount = Math.floor(spaceCount / 2);
      const remainingSpaces = spaceCount % 2;
      return '\t'.repeat(tabCount) + ' '.repeat(remainingSpaces);
    });
  }

  testInput = newValue;

  const codeAndOutput = createElement('div', {
    addStyle: CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.container,
    uniqueIdPrefix: IDE.id,
    id: 'codeOutput',
    appendTo: contentSection,
  });

  const inputAndGraphicSection = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.container,
    },
    uniqueIdPrefix: IDE.id,
    id: 'inputAndGraphicSection',
    addDataset: {
      showingText: 'true',
      showingGraphic: 'true',
    },
    appendTo: codeAndOutput,
  });

  //find if we are on mobile or noe
  const isMobile = window.innerWidth < 768;

  const UiContainer = createElement('div', {
    addStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: isMobile ? '100%' : '40%',
    },
    uniqueIdPrefix: IDE.id,
    id: 'UiContainer',
    appendTo: inputAndGraphicSection,
  });

  const QuUiContainer = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.graphicSectionStyle.container,
      overflow: 'auto',
    },
    uniqueIdPrefix: IDE.id,
    id: 'QuorumUIContainer',
    ariaLabel: 'Quorum UI Container',
    appendTo: UiContainer,
  });

  //add a small box on the bottom of QuUiContainer showing the width and height in px
  const UiSizeBox = createElement('div', {
    addStyle:
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox,
    uniqueIdPrefix: IDE.id,
    // textContent: `${QuUiContainer.clientWidth}x${QuUiContainer.clientHeight}`,
    id: 'QuUiContainerSize',
    appendTo: UiContainer,
  });

  const saveImageButton = new Button({
    text: 'Save',
    icon: saveDisplayIcon,
    iconSize: 'xsmall',
    className: 'btn-xsmall-primary-var1',
    uniqueIdPrefix: IDE.id,
    id: 'saveImageButton',
  });
  saveImageButton
    .getElement()
    .setAttribute('aria-label', 'Save Image of Quorum UI');
  saveImageButton.render(UiSizeBox);
  saveImageButton.onClick(() => {
    const title = IDE.dataset.title || 'Game';
    saveImage(title);
  });

  createElement('span', {
    addStyle: {
      whiteSpace: 'nowrap',
      width: '10ch',
      textAlign: 'center',
    },
    uniqueIdPrefix: IDE.id,
    textContent: `${QuUiContainer.clientWidth}x${QuUiContainer.clientHeight}`,
    id: 'QuUiContainerSizeText',
    appendTo: UiSizeBox,
  });

  const resizeTextArea = createElement('div', {
    addStyle:
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.resizeBar,
    uniqueIdPrefix: IDE.id,
    id: 'resizeIdeHandle',
    addClass: ['resize-ide-handle'],
    ariaLabel: 'Resize Text Area, use left and right arrow keys to resize',
    role: 'separator',
    tabIndex: 0,
    appendTo: inputAndGraphicSection,
    onkeydown: function(event) {
      const resizeIdeHandle = this as HTMLDivElement & AdditionalTypes;
      if (!resizeIdeHandle.uniqueIdPrefix) return console.log('no uniqueIdPrefix');
      if (event.key == 'ArrowLeft') {
        const inputAndGraphicSection = document.getElementById(
          resizeIdeHandle.uniqueIdPrefix + 'inputAndGraphicSection'
        );
        const QuorumUIContainer = document.getElementById(
          resizeIdeHandle.uniqueIdPrefix + 'UiContainer'
        );
        if (QuorumUIContainer) {
          let width = QuorumUIContainer.clientWidth + 10;
          width = Math.round(width / 10) * 10;
          if (inputAndGraphicSection && inputAndGraphicSection.offsetWidth > width) {
            QuorumUIContainer.style.width = `${width}px`;
            QuorumUIContainer.style.minWidth = `${width}px`;
          }
          textarea.style.width = `calc(100% - 6ch)`;
          resizeToNearest2px(textarea);
          mimicTextAreaStyle(textarea, true);
        }
      }
      if (event.key == 'ArrowRight') {
        const QuorumUIContainer = document.getElementById(
          resizeIdeHandle.uniqueIdPrefix + 'UiContainer'
        );
        if (QuorumUIContainer) {
          let width = QuorumUIContainer.clientWidth - 10;
          //round to nearest 10
          width = Math.round(width / 10) * 10;
          if (width >= 0) {
            QuorumUIContainer.style.width = `${width}px`;
            QuorumUIContainer.style.minWidth = `${width}px`;
          }
          textarea.style.width = `calc(100% - 6ch)`;
          resizeToNearest2px(textarea);
          mimicTextAreaStyle(textarea, true);
        }
      }
    },
  });

  const inputAndTabBar = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.container,
      width: 'inherit',
      overflow: 'auto',
      flexDirection: 'column',
    },
    uniqueIdPrefix: IDE.id,
    id: 'inputAndTabBar',
    appendTo: inputAndGraphicSection,
  });

  const tabBar = createElement('div', {
    addStyle:
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.tabBar.container,
    addClass: ['tab-scrollbar'],
    uniqueIdPrefix: IDE.id,
    id: 'tabBar',
    appendTo: inputAndTabBar,
    onkeydown: function(event) {
      //add proper aria keydown events
      if (event.key == 'ArrowLeft') {
        //get it by aria selected
        const activeTab = document.querySelector(
          `[id^="${preId}"][id*="textTab"][aria-selected="true"]`
        );
        if (activeTab) {
          const prevTab = activeTab.previousElementSibling as HTMLElement;
          if (prevTab) {
            prevTab.click();
          }
        }
      }
      if (event.key == 'ArrowRight') {
        const activeTab = document.querySelector(
          `[id^="${preId}"][id*="textTab"][aria-selected="true"]`
        );
        if (activeTab) {
          const nextTab = activeTab.nextElementSibling as HTMLElement;
          if (nextTab) {
            nextTab.click();
          }
        }
      }
    },
  });

  //content is the files input to html
  let dataFiles = IDE.dataset.content?.split(',') || [''];

  //remove whitespace
  dataFiles = dataFiles.map((file) => file.trim());

  const inputSection = createElement('div', {
    addStyle:
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.container,
    uniqueIdPrefix: IDE.id,
    id: 'inputSection',
    tabIndex: 0,
    addClass: ['hide-scrollbar-y'],
    ariaLabel: 'Text Area Section, press enter to focus the text area',
    role: 'application',
    onkeydown: function(event) {
      const inputSection = this as HTMLDivElement & AdditionalTypes;
      if (!inputSection.uniqueIdPrefix) return console.log('no uniqueIdPrefix');
      if (event.key === 'Enter' && inputSection === document.activeElement) {
        event.preventDefault();
        const inputArea = document.getElementById(
          inputSection.uniqueIdPrefix + 'IdeInput'
        ) as HTMLTextAreaElement;
        if (inputArea === null) {
          return;
        }
        //focus the input area
        inputArea.focus();
      }
    },
    appendTo: inputAndTabBar,
  });

  const lineNumberDiv = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumberDiv,
    },
    uniqueIdPrefix: IDE.id,
    id: 'lineNumberDiv',
    ariaHidden: 'true',
    addClass: ['lineNumberDiv'],
    appendTo: inputSection,
  });

  const textarea = createElement('textarea', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.textAndpre,
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.text,
      tabSize: 2,
    },
    addDataset: {
      currentTab: '0',
    },
    uniqueIdPrefix: IDE.id,
    title: 'Code Editor',
    id: 'IdeInput',
    appendTo: inputSection,
    wrap: 'soft',
    autocapitalize: 'off',
    autocomplete: 'off',
    value: '',
    spellcheck: false,
    tabIndex: -1,
    ariaMultiLine: 'true',
    addClass: ['ideEditing', 'text-scrollbar'],
    onclick: function() {
      mimicTextAreaStyle(textarea);
    },
  });

  //this function fixes an issue where the scrollbar
  //would jump to the top when entering a new line
  handleChromeTextarea(textarea, true);

  const codeBlocks = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.blocks,
    },
    uniqueIdPrefix: IDE.id,
    id: 'codeBlocks',
    title: 'Code Editor',
    appendTo: inputSection,
    autocapitalize: 'false',
    spellcheck: false,
    tabIndex: -1,
    ariaMultiLine: 'true',
    role: 'textbox',
    addClass: ['ideEditing', 'hide-scrollbar-y'],
  });

  const codeBlock = createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.block,
    },
    id: 'codeBlock' + 1,
    uniqueIdPrefix: IDE.id,
    addClass: ['hide-scrollbar', 'code-block'],
    appendTo: codeBlocks,
  });

  createElement('div', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber,
    },
    id: 'lineNumberEl' + '1',
    uniqueIdPrefix: IDE.id,
    textContent: '1',
    addClass: ['line-number'],
    ariaHidden: 'true',
    appendTo: lineNumberDiv,
  });

  const pre = createElement('pre', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.pre,
    },
    uniqueIdPrefix: IDE.id,
    tabIndex: -1,
    id: 'codeLine' + '1',
    role: 'presentation',
    appendTo: codeBlock,
    addClass: [
      'hide-scrollbar',
      'language-quorum',
      'highlighting-content',
      'pre-code',
    ],
  });

  createElement('code', {
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code,
    },
    uniqueIdPrefix: IDE.id,
    id: 'code' + '1',
    appendTo: pre,
    addClass: ['code-line'],
  });

  tabs.render(tabBar);
  //make it if dataFiles[0] does not end with an extension

  if (IDE.dataset.codeForIde) {
    console.log('using codeForIde' + IDE.dataset.codeForIde);
    //IDE.dataset.textContent = 
    //'[
    //  {
    //   "file": "Main.quorum", 
    //   "data": "class Main\\n   action Main\\n      // Your code here\\n   end\\nend"
    //  }, 
    //  {
    //   "file": "Utilities.quorum", 
    //   "data": "class Utilities\\n   // Utility methods here\\nend"
    //  }
    //]';
    const data = JSON.parse(IDE.dataset.codeForIde);

    for (let i = 0; i < data.length; i++) {
      const fileObj = data[i];
      console.count('fileObj');
      const fileName = fileObj.file;
      const fileText = fileObj.data;

      const currentIndex = i;

      const { newTabButton: tab } = tabs.newTab(
        'text.quorum',
        i === 0 ? 'true' : 'false',
        [`tab-sm-${ideCache[preId].theme}`],
        'textTab' + currentIndex,
        IDE.id
      );

      tab.onclick = () => {
        selectTab(IDE.id, currentIndex);
      };

      if (fileText != undefined && tab.uniqueIdPrefix) {
        if (currentIndex === 0) {
          const textArea = document.getElementById(
            tab.uniqueIdPrefix + 'IdeInput'
          ) as HTMLTextAreaElement;
          if (textArea) {
            updateElement(textArea, {
              value: fileText,
            });
          }
          mimicTextAreaStyle(textArea, true);
        }

        tabs.changeTabText(tab.id, fileName);
        ideCache[tab.uniqueIdPrefix].tabValues[currentIndex] = fileText;

        const tabBar0 = document.getElementById(
          preId + 'textTab' + 0 + '_tabAndCloseButton'
        ) as HTMLTextAreaElement;

        if (currentIndex === 0) {
          //add tab_selected class to tab0
          tabBar0.classList.add('tab_selected');
          tabBar0.ariaSelected = 'true';
        }
      }
    }
  }

  return {
    resizeTextArea,
    codeAndOutput,
    UiContainer,
    QuUiContainer,
    inputAndGraphicSection,
    textarea,
    lineNumberDiv,
  };
}

//get assignment files from server
async function retrieveCode(projectName: string) {
  return fetch(projectName)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const result = Object.values(data).map((obj) => {
        return {
          file: Object.values(obj)[0] as string,
          data: Object.values(obj)[1] as string,
        };
      });

      //order data so that Main.quorum is first
      result.sort((a, b) => {
        if (a.file === 'Main.quorum') {
          return -1;
        } else if (b.file === 'Main.quorum') {
          return 1;
        } else {
          return 0;
        }
      });
      return result;
    })
    .catch((error) => {
      console.log(
        'There was a problem with the fetch operation: ' + error.message
      );
    });
}


//got help from here fixes scrolling issue
//https://codesandbox.io/s/simple-array-devextreme-data-grid-forked-y8ebz?file=/src/app/app.component.ts:3056-4114
function handleChromeTextarea(el: HTMLTextAreaElement, useScroll: boolean) {
  let noLineBreaks = (el.value.match(/\n/g) || []).length;
  let scrollPos = el.scrollTop;

  const onInput = () => {
    const newNoLineBreaks = (el.value.match(/\n/g) || []).length;
    if (noLineBreaks < newNoLineBreaks) {
      el.scrollTop = scrollPos;
    }
    noLineBreaks = newNoLineBreaks;
    updateCodeEditorDisplay(el);
  };

  const onClick = () => {
    highlightCursorLocation(el);
    onBeforeInput();
  };

  const onBeforeInput = () => {
    scrollPos = el.scrollTop;
    showHideScrollbar();
    editAreaSyncScroll(el);
  };


  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 't' && (event.ctrlKey || event.altKey)) {
      event.preventDefault();

      const cursorPosition = el.selectionStart;
      const value = el.value;
      el.value =
        value.substring(0, cursorPosition) +
        '\t' +
        value.substring(cursorPosition);
      el.selectionStart = el.selectionEnd = cursorPosition + 1;
      updateCodeEditorDisplay(el);
    }

    else if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      highlightCursorLocation(el);
    }
  };

  const onKeyup = (event: KeyboardEvent) => {
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      setTimeout(() => {
        highlightCursorLocation(el);
      }, 0);
    }
  };

  el.addEventListener('keyup', onKeyup);
  el.addEventListener('keydown', onKeydown);
  el.addEventListener('input', onInput);
  el.addEventListener('beforeinput', onBeforeInput);
  el.addEventListener('click', onClick);

  if (useScroll) {
    el.addEventListener('scroll', onBeforeInput);
  }
}

function showHideScrollbar() {
  const scrollbarVisibility = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--ide-scrollbar-visibility');

  if (scrollbarVisibility === 'visible') {
    clearTimeout(scrollbarTimeout);
    scrollbarTimeout = setTimeout(() => {
      document.documentElement.style.setProperty(
        '--ide-scrollbar-visibility',
        'hidden'
      );
    }, 1000);
  } else {
    document.documentElement.style.setProperty(
      '--ide-scrollbar-visibility',
      'visible'
    );
    scrollbarTimeout = setTimeout(() => {
      document.documentElement.style.setProperty(
        '--ide-scrollbar-visibility',
        'hidden'
      );
    }, 1000);
  }
}

//changes Quroum code with frame:Load('fileName') to frame:Load('url')
function saveImage(title: string) {
  const manager = new quorum_Libraries_Game_GameStateManager_();
  const game = manager.GetGame();

  const screenshotListener =
    new quorum_Libraries_Interface_Events_ScreenshotListener_();
  screenshotListener.OnScreenshot$quorum_Libraries_Interface_Events_ScreenshotEvent =
    (event: quorum_Libraries_Interface_Events_ScreenshotEvent_) => {
      const screenshot = event.GetScreenshot();

      const manager = new quorum_Libraries_Game_GameStateManager_();
      const app = manager.GetApplication();

      //if there is a chart title, use it in the file name, otherwise just use the chart type

      app.SaveImageToDownloads$quorum_Libraries_Game_Graphics_PixelMap$quorum_text(
        screenshot,
        title
      );
    };
  game.AddScreenshotListener$quorum_Libraries_Interface_Events_ScreenshotListener(
    screenshotListener
  );
  game.Screenshot();
}

function selectTab(preId: string, currentIndex: number) {
  const textArea = document.getElementById(
    preId + 'IdeInput'
  ) as HTMLTextAreaElement;
  if (textArea) {
    updateElement(textArea, {
      addDataset: {
        currentTab: currentIndex.toString(),
      },
    });
  }
  const tabBar = document.getElementById(preId + 'tabBar');
  if (tabBar) {
    for (let i = 0; i < tabBar.children[0].children.length; i++) {
      const child = tabBar.children[0].children[i];
      if (child instanceof HTMLElement) {
        child.ariaSelected = 'false';
        child.classList.remove('tab_selected');
      }
    }
  }
  const tabButton = document.getElementById(
    preId + 'textTab' + currentIndex + '_tabAndCloseButton'
  );
  if (tabButton) {
    updateElement(tabButton, {
      addClass: 'tab_selected',
    });
    tabButton.ariaSelected = 'true';
  } else {
    console.log('tabButton is null');
  }
  updateCodeEditorDisplay(textArea);
}
