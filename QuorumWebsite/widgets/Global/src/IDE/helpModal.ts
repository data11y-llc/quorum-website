import { createElement } from "../util/helper.js";
import { UiKitColors } from "../util/UiKit.js";
import { ideCache } from "./highlight.js";
import { CSS } from "./style/style.js";

export function createHelpModal(IDE: HTMLDivElement) {
  const outerHelpModal = createElement("div", {
    addStyle: CSS[IDE.id][ideCache[IDE.id].theme].contentSectionStyle.modals.help,
    uniqueIdPrefix: IDE.id,
    ariaModal: 'true',
    ariaRoleDescription: 'dialog',
    id: "helpModal",
    onkeydown: (e) => {
      if (e.key === "Escape") {
        outerHelpModal.style.display = "none";
        const helpModal = document.getElementById(IDE.id + "helpButton");
        helpModal?.focus();
      }
    },
    tabIndex: -1,
    appendTo: IDE,
  });

  const helpModalContent = createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "transparent",
      borderRadius: "10px",
      height: "100%",
      width: "100%",
      overflow: "auto",
    },
    tabIndex: 0,
    uniqueIdPrefix: IDE.id,
    id: "helpModalContent",
    appendTo: outerHelpModal,
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
      fontSize: "20px",
      fontWeight: "bold",
      padding: "0px",
      margin: "0px",
    },
    uniqueIdPrefix: IDE.id,
    id: "helpModalCloseButton",
    textContent: "X",
    appendTo: helpModalContent,
    onclick: function() {
      const helpModal = document.getElementById(this.uniqueIdPrefix + "helpModal");
      if (!helpModal) return;
      helpModal.style.display = "none";
      helpModal.ariaHidden = "true";
      helpModal.tabIndex = -1;
      const helpButton = document.getElementById(IDE.id + "helpButton");
      helpButton?.focus();
    },
  });

  //section 1
  createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    uniqueIdPrefix: IDE.id,
    id: "helpModalSection1",
    appendTo: helpModalContent,
    addChildren: [
      createElement("h2", {
        addStyle: {
          fontSize: "1.5rem",
          alignSelf: "flex-start",
          fontWeight: "bold",
          margin: "0px",
          padding: "0px",
          marginBottom: "10px",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection1Title",
        textContent: "What is Quorum",
      }),
      createElement("p", {
        addStyle: {
          fontSize: "1rem",
          alignSelf: "flex-start",
          margin: "0px",
          padding: "0px",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection1Text",
        textContent:
          `The Quorum Programming Language is an evidence-based language that simplifies syntax and provide accessibility for blind or visually-impaired students.`,
      }),
    ],
  });

  createElement("div", {
    addStyle: {
      width: "100%",
      height: "1px",
      backgroundColor: UiKitColors.neutral.grey._50,
      marginTop: "10px",
      marginBottom: "10px",
    },
    appendTo: helpModalContent,
  });

  //section 2
  createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    uniqueIdPrefix: IDE.id,
    id: "helpModalSection2",
    appendTo: helpModalContent,
    addChildren: [
      createElement("h2", {
        addStyle: {
          fontSize: "1.5rem",
          alignSelf: "flex-start",
          fontWeight: "bold",
          margin: "0px",
          padding: "0px",
          marginBottom: "10px",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection1Title",
        textContent: "How to use an IDE",
      }),
      createElement("p", {
        addStyle: {
          fontSize: "1rem",
          alignSelf: "flex-start",
          margin: "0px",
          padding: "0px",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection1Text",
        textContent:
          `The Quorum Code Editor is a built in text editor and compiler. We can type code on the text editor section, found on the left side of the code editor and are shown output, found on the right side of the code editor. To run our code, we can press the run button found within the top of the code editor or use our keyboard shortcut.`,
      }),
    ],
  });
  createElement("div", {
    addStyle: {
      width: "100%",
      height: "1px",
      backgroundColor: UiKitColors.neutral.grey._50,
      marginTop: "15px",
      marginBottom: "15px",
    },
    appendTo: helpModalContent,
  });

  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const specialKey = isMac ? "CTRL" : "ALT";

  //section 3
  createElement("div", {
    addStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    uniqueIdPrefix: IDE.id,
    id: "helpModalSection3",
    appendTo: helpModalContent,
    addChildren: [
      createElement("h2", {
        addStyle: {
          fontSize: "1.5rem",
          alignSelf: "flex-start",
          fontWeight: "bold",
          margin: "0px",
          padding: "0px",
          marginBottom: "10px",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection3Title",
        textContent: "Hotkey Shortcuts" + (isMac ? " (Mac)" : ""),
      }),
      createElement("ul", {
        addStyle: {
          fontSize: "1rem",
          alignSelf: "flex-start",
        },
        uniqueIdPrefix: IDE.id,
        id: "helpModalSection3Text",
        addChildren: [
          makeKeyboardHint("Run Program ", specialKey, "SHIFT", "R"),
          makeKeyboardHint("Stop Program ", specialKey, "SHIFT", "S"),
          makeKeyboardHint("Hide and Show Code ", specialKey, "SHIFT", "X"),
          makeKeyboardHint("Hide and Show Console ", specialKey, "SHIFT", "C"),
          makeKeyboardHint("Hide and Show Output ", specialKey, "SHIFT", "G"),
          makeKeyboardHint("Export Code ", specialKey, "SHIFT", "E"),
          makeKeyboardHint("Insert Tab in Text Area", specialKey, "t"),
        ],
      }),
    ],
  });

  function createKeySpan(key: string): HTMLElement {
    return createElement("span", {
      addStyle: {
        display: "inline-block",
        padding: "2px 4px",
        fontSize: "85%",
        color: "black",
        backgroundColor: "white",
        borderRadius: "4px",
      },
      textContent: key,
    });
  }

  // Remade function to create a keyboard hint
  function makeKeyboardHint(action: string, key1: string, key2?: string, key3?: string): HTMLElement {
    return createElement("li", {
      addStyle: {
        fontSize: "1rem",
        alignSelf: "flex-start",
        marginBottom: "10px",
      },
      textContent: action,
      addChildren: key3 && key2
        ? // If key3 is present, return an array of spans with key1, +, key2, +, and key3
        [
          createKeySpan(key1),
          createElement("span", { textContent: " + " }),
          createKeySpan(key2),
          createElement("span", { textContent: " + " }),
          createKeySpan(key3),
        ]
        : key2
          ? // If key2 is present, return an array of spans with key1, + and key2
          [
            createKeySpan(key1),
            createElement("span", { textContent: " + " }),
            createKeySpan(key2),
          ]
          : // If key2 is absent, return a single span with key1
          [createKeySpan(key1)]
    });
  }

}
