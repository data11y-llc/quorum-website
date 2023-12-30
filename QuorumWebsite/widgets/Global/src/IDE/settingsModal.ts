import { Tabs } from "../UiKit/atoms/tabs/tabs";
import { Theme, TupleToUnion } from "../UiKit/helperTypes";
import { AdditionalTypes, createElement } from "../util/helper.js";
import { UiKitColors } from "../util/UiKit.js";
import { getCookie, setCookie, IDE_OPTIONS } from "./cookies.js";
import { editAreaSyncScroll, updateCodeEditorDisplay, ideCache, mimicTextAreaStyle } from "./highlight.js";
import { resizeToNearest2px } from "./resize";
import { styleGlobals, CSS, setTheme } from "./style/style.js";

const DATA11Y_COOKIE_NAME = "DATA11Y-THEME";

export function createSettingsModal(IDE: HTMLDivElement, tabs: Tabs) {
  const outerSettingsModal = createElement("div", {
    addStyle: CSS[IDE.id][ideCache[IDE.id].theme].contentSectionStyle.modals.help,
    uniqueIdPrefix: IDE.id,
    id: "settingsModal",
    ariaModal: 'true',
    ariaRoleDescription: 'dialog',
    ariaHidden: 'true',
    onkeydown: (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        outerSettingsModal.style.display = "none";
        const settingsModal = document.getElementById(IDE.id + "settingsButton");
        if (settingsModal) {
          settingsModal.focus();
        }
      }
    },
    tabIndex: -1,
    appendTo: IDE,
  });

  const settingsModalContent = createElement("div", {
    addStyle: {
      backgroundColor: "transparent",
      padding: "20px",
      borderRadius: "10px",
    },
    uniqueIdPrefix: IDE.id,
    id: "settingsModalContent",
    appendTo: outerSettingsModal,
  });
  //add a close button
  createElement("button", {
    tabIndex: 0,
    addStyle: {
      position: "absolute",
      top: "20px",
      right: "20px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0px",
      margin: "0px",
      fontWeight: "bold",
      fontSize: "20px",
    },
    uniqueIdPrefix: IDE.id,
    id: "settingsModalCloseButton",
    textContent: "X",
    appendTo: settingsModalContent,
    onclick: function(this: GlobalEventHandlers & AdditionalTypes) {
      if (!this.uniqueIdPrefix) return;
      const settingsModal = document.getElementById(this.uniqueIdPrefix + "settingsModal");
      if (settingsModal == null) return console.error('settingsModal is null')

      settingsModal.style.display = "none";
      settingsModal.ariaHidden = "true";
      settingsModal.tabIndex = -1;
      const settingsButton = document.getElementById(IDE.id + "settingsButton");
      settingsButton?.focus();
    },
  });

  const modalGenSettings = createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "column",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalGenSettings",
    appendTo: settingsModalContent,
  });

  const modalGenSettingsTitle = createElement("div", {
    addStyle: {
      marginBottom: "10px",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalGenSettingsTitleContainer",
    appendTo: modalGenSettings,
  });

  createElement("h2", {
    addStyle: {
      fontSize: "20px",
      marginBottom: "10px",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "700",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalGenSettingsTitle",
    textContent: "General Settings",
    appendTo: modalGenSettingsTitle,
  });

  const modalGenSettingsButtons = createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "10px",
      columnGap: "16px",
      rowGap: "16px",
      flexWrap: "wrap",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalGenSettingsButtons",
    appendTo: modalGenSettings,
  });


  function createThemeOption(theme: 'light' | 'dark' | 'high-contrast', label: string, checked: boolean) {
    return createElement("label", {
      addClass: ['theme-radio-container'],
      addChildren: [
        createElement("input", {
          uniqueIdPrefix: IDE.id,
          id: `${theme}Theme`,
          tabIndex: 0,
          type: "radio",
          name: `${IDE.id}theme`,
          value: theme,
          checked,
          onclick: function(this: GlobalEventHandlers & AdditionalTypes) {
            const themeRadioInput = this as HTMLInputElement & AdditionalTypes;
            if (!themeRadioInput.uniqueIdPrefix) return;

            themeRadioInput.checked = true;
            const cookie = getCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, JSON.parse);
            if (cookie) {
              cookie.theme = theme;
              setCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, cookie, JSON.stringify);
            }
            tabs.switchTheme(theme);
            setTheme(theme, themeRadioInput.uniqueIdPrefix);
          },
        }),
        createElement("span", {
          addClass: ['theme-radio-checkmark'],
        })
        ,
        createElement("label", {
          textContent: label,
          addStyle: {
            visibility: "hidden",
            width: "0px",
            height: "0px",
          },
          htmlFor: `${theme}Theme`,
        })
      ],
      textContent: label,
      appendTo: modalGenSettingsButtons,
    });
  }

  createThemeOption('light', 'Light Mode', true);
  createThemeOption('dark', 'Dark Mode', false);
  createThemeOption('high-contrast', 'High Contrast', false);

  createElement("div", {
    addStyle: {
      width: "100%",
      height: "2px",
      backgroundColor: UiKitColors.neutral.grey._50,
      marginTop: "10px",
      marginBottom: "10px",
    },
    appendTo: settingsModalContent,
  });

  const modalTextEditorSettings = createElement("div", {
    addStyle: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      marginBottom: "10px",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalTextEditorSettings",
    appendTo: settingsModalContent,
  });

  createElement("h2", {
    addStyle: {
      fontSize: "20px",
      marginBottom: "10px",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "700",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalTextEditorContent",
    textContent: "Text Editor Settings",
    appendTo: modalTextEditorSettings,
  });

  const modalTextEditorOptions = createElement("div", {
    addStyle: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: "10px",
      rowGap: "16px",
    },
    uniqueIdPrefix: IDE.id,
    id: "modalTextEditorOptions",
    appendTo: modalTextEditorSettings,
  });

  createElement("div", {
    uniqueIdPrefix: IDE.id,
    id: "enableWordWrapSwitch",
    addClass: ["switch"],
    addStyle: {
      display: "flex",
      width: "fit-content",
      flexDirection: "row",
      alignItems: "center",
    },
    addChildren: [
      createElement("label", {
        addStyle: {
          marginRight: "10px",
          width: "fit-content",
          wordWrap: "normal",
          whiteSpace: "nowrap",
          fontSize: "20px",
          fontWeight: "100",
          fontStyle: "normal",
          fontFamily: "Montserrat, sans-serif",
        },
        textContent: "Enable Word Wrap",
        htmlFor: IDE.id + "enableWordWrapSwitchInput",
      }),

      createElement("div", {
        addChildren: [
          createElement("label", {
            addClass: ["switch"],
            uniqueIdPrefix: IDE.id,
            id: "enableWordWrapSwitchLabel",
            addStyle: {
              color: 'transparent'
            },
            addChildren: [
              createElement("input", {
                tabIndex: 0,
                checked: true,
                type: "checkbox",
                uniqueIdPrefix: IDE.id,
                title: "Enable Word Wrap",
                id: "enableWordWrapSwitchInput",
                onclick: function(this) {
                  const wordWrapSwitch = this as HTMLInputElement & AdditionalTypes;
                  if (!wordWrapSwitch.uniqueIdPrefix) return;
                  switchWrap(wordWrapSwitch.uniqueIdPrefix);
                  const cookie = getCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, JSON.parse);
                  if (cookie) {
                    cookie.wrap = wordWrapSwitch.checked;
                    setCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, cookie, JSON.stringify);
                  }
                },
                addStyle: {
                  width: "40px",
                },
              }),
              createElement("span", {
                addClass: ["slider", "round"],
              }),
            ],
          }),
        ],
      }),
    ],
    appendTo: modalTextEditorOptions,
  });

  createElement("div", {
    addStyle: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    addChildren: [
      //create dropdown menu
      createElement("label", {
        textContent: "Font Size",
        addStyle: {
          display: "flex",
          flexDirection: "column",
        },
        addChildren: [
          createElement("select", {
            addStyle: {
              width: "200px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "400",
              fontStyle: "normal",
              borderRadius: "10px",
            },
            uniqueIdPrefix: IDE.id,
            id: "fontSizeDropdown",
            onchange: function(this) {
              const fontSizeInput = this as HTMLSelectElement & AdditionalTypes;
              if (!fontSizeInput.uniqueIdPrefix) return;
              const cookie = getCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, JSON.parse);
              if (cookie) {
                if (fontSizeInput.value === "12" || fontSizeInput.value === "14" || fontSizeInput.value === "16" || fontSizeInput.value === "18" || fontSizeInput.value === "20")
                  cookie.fontSize = fontSizeInput.value
                setCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, cookie, JSON.stringify);
              }
              updateFont(IDE.id, +fontSizeInput.value);
            },
            addChildren: [
              createElement("option", { value: "12", textContent: "12pt" }),
              createElement("option", { value: "14", textContent: "14pt" }),
              createElement("option", { value: "16", textContent: "16pt" }),
              createElement("option", { value: "18", textContent: "18pt" }),
              createElement("option", { value: "20", textContent: "20pt" })
            ],
            appendTo: modalTextEditorOptions,
          }),
        ],
      }),

      createElement("label", {
        textContent: "Indent Size",
        addStyle: {
          display: "flex",
          flexDirection: "column",
        },
        addChildren: [
          createElement("select", {
            addStyle: {
              width: "200px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "400",
              fontStyle: "normal",
              borderRadius: "10px",
            },
            uniqueIdPrefix: IDE.id,
            id: "indentSizeDropdown",
            onchange: function(this) {
              const indentSizeInput = this as HTMLSelectElement & AdditionalTypes;
              if (!indentSizeInput.uniqueIdPrefix) return;
              const cookie = getCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, JSON.parse);
              if (cookie) {
                if (indentSizeInput.value === "2" || indentSizeInput.value === "3" || indentSizeInput.value === "4")
                  cookie.indent = indentSizeInput.value;
                setCookie<IDE_OPTIONS>(DATA11Y_COOKIE_NAME, cookie, JSON.stringify);
              }

              updateIndentSize(this as HTMLSelectElement & AdditionalTypes);
            },

            addChildren: [
              createElement("option", { value: "2", textContent: "2 spaces", }),
              createElement("option", { value: "3", textContent: "3 spaces", }),
              createElement("option", { value: "4", textContent: "4 spaces", }),
            ],

            appendTo: modalTextEditorOptions,
          }),
        ],
      })
    ],
    uniqueIdPrefix: IDE.id,
    id: "fontSizeLabel",
    appendTo: modalTextEditorSettings,
  });
}

export function updateFont(preId: string, fontSize?: number) {
  const input = document.getElementById(preId + "fontSizeDropdown") as HTMLSelectElement & AdditionalTypes;
  styleGlobals.fontSize = `${input.value}px`;

  if (fontSize) {
    styleGlobals.fontSize = `${fontSize}px`;
  }

  // Set font size of textarea
  const textarea = document.getElementById(input.uniqueIdPrefix + "IdeInput") as HTMLTextAreaElement;
  textarea.style.fontSize = styleGlobals.fontSize;

  // Set font size and minimum height of CSS elements
  for (const theme of ["light", "dark", "high-contrast"]) {
    const typedTheme = theme as TupleToUnion<Theme>
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.fontSize = styleGlobals.fontSize;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.minHeight = `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]}px`;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.fontSize = styleGlobals.fontSize;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.minHeight = `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]}px`;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.block.minHeight = `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]}px`;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumberDiv.fontSize = styleGlobals.fontSize;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.text.fontSize = styleGlobals.fontSize;
  }

  // Update font size of DOM elements
  const lineNumberDiv = document.getElementById(input.uniqueIdPrefix + "lineNumberDiv") as HTMLDivElement;
  lineNumberDiv.style.fontSize = styleGlobals.fontSize;
  const codeBlockMain = document.getElementById(input.uniqueIdPrefix + "codeBlocks") as HTMLDivElement;
  codeBlockMain.style.fontSize = styleGlobals.fontSize;

  const lineNumber = document.querySelectorAll(`[id^="${input.uniqueIdPrefix}"][id*="lineNumberEl"]`) as NodeListOf<HTMLDivElement>;
  const codeLine = document.querySelectorAll(`[id^="${input.uniqueIdPrefix}"][id*="code"] .code-line`) as NodeListOf<HTMLDivElement>;
  const codeBlocks = document.querySelectorAll(`[id^="${input.uniqueIdPrefix}"][id*="codeBlock"] .code-block`) as NodeListOf<HTMLDivElement>;

  for (let i = 0; i < lineNumber.length; i++) {
    lineNumber[i].style.fontSize = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.fontSize as string;
    codeLine[i].style.fontSize = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.fontSize as string;
    codeBlocks[i].style.fontSize = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.block.fontSize as string;
    lineNumber[i].style.minHeight = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.minHeight as string;
    codeLine[i].style.minHeight = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.minHeight as string;
    codeBlocks[i].style.minHeight = CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.block.minHeight as string;
  }
  textarea.style.width = `calc(100% - 6ch)`;
  resizeToNearest2px(textarea);
  mimicTextAreaStyle(textarea, true);

}

export function updateIndentSize(input: HTMLSelectElement & AdditionalTypes) {
  const preId = input.uniqueIdPrefix as string;
  const textarea = document.getElementById(input.uniqueIdPrefix + "IdeInput") as HTMLTextAreaElement;

  textarea.style.tabSize = input.value;

  for (const theme of ["light", "dark", "high-contrast"]) {
    const typedTheme = theme as TupleToUnion<Theme>
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.tabSize = input.value;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.text.tabSize = input.value;
  }

  const codeLine = document.querySelectorAll(`[id^="${input.uniqueIdPrefix}"][id*="code"] .code-line`) as NodeListOf<HTMLDivElement>;
  for (let i = 0; i < codeLine.length; i++) {
    Object.assign(codeLine[i].style, CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code);
  }

  mimicTextAreaStyle(textarea)
  updateCodeEditorDisplay(textarea)
}

export function switchWrap(preId: string) {
  const textArea = document.getElementById(`${preId}IdeInput`) as HTMLTextAreaElement;

  const codeLineEl = document.querySelectorAll(`[id^='${preId}codeLine']`) as NodeListOf<HTMLElement>;
  switch (textArea.wrap) {
    case 'off':
      textArea.wrap = 'soft'
      textArea.style.whiteSpace = 'break-spaces';
      for (const theme of ['light', 'dark', 'high-contrast']) {
        const typedTheme = theme as TupleToUnion<Theme>
        CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.whiteSpace = 'break-spaces';
      }
      updateWhiteSpaceStyle(codeLineEl, 'break-spaces');
      resizeNormalWord(textArea);
      break;
    case 'soft':
      for (const theme of ['light', 'dark', 'high-contrast']) {
        const typedTheme = theme as TupleToUnion<Theme>
        CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.whiteSpace = 'break-spaces';
      }
      textArea.wrap = 'off'
      textArea.style.whiteSpace = 'pre';
      updateWhiteSpaceStyle(codeLineEl, 'pre');
      resizeWordBreakWord(textArea, true);
      break;
  }



  updateCodeEditorDisplay(textArea);
  mimicTextAreaStyle(textArea, true);
  editAreaSyncScroll(textArea);
}

function updateWhiteSpaceStyle(element: NodeListOf<HTMLElement>, whiteSpace: string) {
  for (let i = 0; i < element.length; i++) {
    element[i].style.whiteSpace = whiteSpace;
  }
}

export function updateFromCookie(IDE: HTMLDivElement) {
  // Get a cookie value as an object
  //const settings = getCookie<IDE_OPTIONS>('DATA11Y-THEME', JSON.parse); // Use the JSON.parse function as the decoder function
  //if (settings) {
  //  // setTheme(settings.theme, IDE.id);
  //  const themeCheckbox = document.getElementById(IDE.id + `${settings.theme}Theme`) as HTMLInputElement;
  //  themeCheckbox.checked = true;
  //  setTheme(settings.theme, IDE.id);
  //  //TODO cookie for wrap

  //  //set font size
  //  const fontSizeInput = document.getElementById(IDE.id + 'fontSizeDropdown') as HTMLSelectElement & AdditionalTypes;
  //  fontSizeInput.value = settings.fontSize;
  //  updateFont(IDE.id, +fontSizeInput.value);

  //  const indentSizeInput = document.getElementById(IDE.id + 'indentSizeDropdown') as HTMLSelectElement & AdditionalTypes;
  //  indentSizeInput.value = settings.indent;
  //  updateIndentSize(indentSizeInput);
  //}
}

export function resizeNormalWord(textArea: HTMLTextAreaElement & AdditionalTypes): void {
  const preId = textArea.uniqueIdPrefix;
  if (!preId) return console.error('No unique id prefix found');

  for (const theme of ['light', 'dark', 'high-contrast']) {
    const typedTheme = theme as TupleToUnion<Theme>
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.minWidth = "100%";
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.width = "100%";
  }
  for (let i = 0; i < ideCache[preId].codeElements.length; i++) {
    ideCache[preId].codeElements[i].style.minWidth = "100%";
    ideCache[preId].codeElements[i].style.width = "100%";
  }
}

export function resizeWordBreakWord(textArea: HTMLTextAreaElement & AdditionalTypes, resetWordBreak: boolean): void {
  const preId = textArea.uniqueIdPrefix;
  if (!preId) return console.error('No unique id prefix found');

  if (resetWordBreak) {
    ideCache[preId].longestLineLength = 0;
  }
  const text = textArea.value;
  const lines = text.split(/\r|\r\n|\n/);

  // Get max line length and add one to ensure cursor visibility
  const longestLineLength = Math.max(...lines.map(line => line.length));
  const codeElements = ideCache[preId].codeElements;

  // Set the styles on all code elements in a single loop
  if (longestLineLength > ideCache[preId].longestLineLength) {
    for (let i = 0; i < codeElements.length; i++) {
      const code = codeElements[i];
      code.style.width = `${longestLineLength}ch`;
      code.style.minWidth = `${longestLineLength}ch`;
    }
    ideCache[preId].longestLineLength = longestLineLength;
  } else {
    for (let i = 0; i < codeElements.length; i++) {
      codeElements[i].style.width = "100%";
    }
  }

  // Use a single object to store the styles
  for (const theme of ['light', 'dark', 'high-contrast']) {
    const typedTheme = theme as TupleToUnion<Theme>
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.minWidth = `${longestLineLength}ch`;
    CSS[preId][typedTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.width = "100%";
  }
}

