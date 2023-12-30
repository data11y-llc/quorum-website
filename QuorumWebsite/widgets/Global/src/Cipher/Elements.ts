import { OffsetSwap } from './LetterOffset.js'
import { CSS } from './Styles.js';
import { CipherGlobals, sentenceOptionsCaesarSub, sentenceOptionsRandomSub } from './Globals.js';
import { dragAndDrop, letterActions } from './LetterActions.js';
import { originals, substitution } from './LetterSort.js';
import { letterType, letterButtonType, rowType } from './Types.js';
import { updateAll, updateSentence } from './UpdateAll.js';
import { rowOnKeydown, letterEvents } from './Accessibility.js';
import type * as CSSType from 'csstype';
import { createElement, updateElement } from '../util/helper.js';
import { Header } from '../UiKit/molecules/header/header';

const ALPHABET_LENGTH = 26;

/**
  *holds sentence and instructions
  */
export function header(id): HTMLDivElement {
  const header = new Header({ title: 'Access Cipher', theme: 'light', uniqueId: id });
  header.settingsButton.getElement().style.display = 'none';
  return header.container;
}
export function topSection(): HTMLDivElement {
  const options = createElement('div', {
    id: 'options',
    addStyle: CSS.topSection.sentenceAndOptions.options.container,
    addChildren: [changeSentenceButton(), changeSentenceDropdown()]
  }) as HTMLDivElement;

  const sentenceAndOptions = createElement('div', {
    id: 'sentenceAndOptions',
    addStyle: CSS.topSection.sentenceAndOptions.container,
    addChildren: [sentenceContainer(), options],
  }) as HTMLDivElement;

  const topSectionContainer = createElement('div', {
    id: 'cipherTopSection',
    addStyle: CSS.topSection.container,
    addChildren: [instructions(), sentenceAndOptions]
  }) as HTMLDivElement;

  return topSectionContainer;
}

//create function that makes a dropdown menu to replace the text inside of sentence

function changeSentenceDropdown(): HTMLSelectElement {
  const dropdown = createElement('select', {
    id: 'changeSentenceDropdown',
    addStyle: CSS.topSection.sentenceAndOptions.options.dropdown,
    ariaLabel: 'Select a sentence', // Added ARIA label
    onchange: () => {
      const key = dropdown.value;
      CipherGlobals.sentence = sentenceOptionsCaesarSub.get(key);
      updateAll();
    }
  });

  // Create an option for each sentence
  let firstOptionValue;
  sentenceOptionsCaesarSub.forEach((value, key) => {
    if (!firstOptionValue) firstOptionValue = key; // Store the first option
    const option = createElement("option", {
      value: key,
      text: key,
      ariaLabel: `Choose ${key}` // Added ARIA label
    });
    dropdown.appendChild(option);
  });

  // Set default to the first option
  if (firstOptionValue) {
    CipherGlobals.sentence = sentenceOptionsCaesarSub.get(firstOptionValue);
    dropdown.value = firstOptionValue;
  }

  return dropdown as HTMLSelectElement;
}

function updateSentenceDropdownOptions(newSentenceOptions: Map<string, string>) {
  let dropdown = document.getElementById('changeSentenceDropdown') as HTMLSelectElement;
  if (!dropdown) {
    dropdown = createElement('select', {
      id: 'changeSentenceDropdown',
      ariaLabel: 'Select a sentence'  // Added ARIA label
    }) as HTMLSelectElement;
    document.body.appendChild(dropdown);
  }

  // Clear previous options
  dropdown.innerHTML = "";

  // Update onchange event to work with new map
  dropdown.onchange = () => {
    const key = dropdown.value;
    const sentence = newSentenceOptions.get(key);
    if (typeof sentence === 'undefined') {
      console.error('No sentence found for the selected key:', key);
      return;
    }
    CipherGlobals.sentence = sentence;
    updateAll();
  };

  // Create new options and set default to the first option
  let firstOptionValue;
  newSentenceOptions.forEach((value, key) => {
    if (!firstOptionValue) firstOptionValue = key; // Store the first option
    const option = createElement("option", {
      value: key,
      text: key,
      'aria-label': `Choose ${key}`  // Added ARIA label
    });
    dropdown.appendChild(option);
  });

  // Set default to the first option
  if (firstOptionValue) {
    CipherGlobals.sentence = newSentenceOptions.get(firstOptionValue);
    dropdown.value = firstOptionValue;
    updateAll();
  }
}



/**
  * holds the instructions
  */
function instructions(): HTMLElement {
  //create a div to hold the instructions
  const instructions = createElement('article', {
    id: 'instructions',
    addStyle: CSS.topSection.instructions.container,
  }) as HTMLElement;

  createElement('h2', {
    addStyle: CSS.topSection.instructions.h3,
    innerHTML: 'Read Sentence',
    appendTo: instructions,
  }) as HTMLHeadingElement;

  createElement('span', {
    addStyle: CSS.topSection.instructions.paragraph,
    innerHTML: `
    <ul>
    <li><strong>I</strong> - read the instructions.</li>
    <li><strong>r</strong> - start/stop reading words of the sentence.</li>
    <li><strong>R</strong> - start/stop reading characters of the sentence.</li>
    </ul>
    `,
    appendTo: instructions,
  }) as HTMLSpanElement;

  createElement('h2', {
    addStyle: CSS.topSection.instructions.h3,
    innerHTML: 'Letter Actions',
    appendTo: instructions,
  }) as HTMLHeadingElement;

  createElement('span', {
    addStyle: CSS.topSection.instructions.paragraph,
    innerHTML: `
    <ul>
    <li><strong>s</strong> - swap two marked letters. </li>
    <li><strong>m</strong> - map/unmap marked letters.</li>
    </ul>
    `,
    appendTo: instructions,
  }) as HTMLSpanElement;

  return instructions;
}

function sentenceContainer(): HTMLDivElement {
  const sentence = createElement('p', {
    id: 'sentence',
    addStyle: CSS.topSection.sentenceAndOptions.sentence.paragraph,
    innerHTML: CipherGlobals.sentence.toLowerCase(),
  }) as HTMLParagraphElement;

  const header = createElement('h3', {
    id: 'sentenceHeader',
    addStyle: CSS.topSection.sentenceAndOptions.header,
    innerHTML: 'Encrypted Message',
  }) as HTMLHeadingElement;

  const sentenceContainer = createElement('div', {
    id: 'sentenceContainer',
    addStyle: CSS.topSection.sentenceAndOptions.sentence.container,
    ariaLabel: 'Encrypted message',
    tabIndex: 0,
    addChildren: [header, sentence],
  }) as HTMLDivElement;
  return sentenceContainer;
}

export function quorumChartContainer() {
  //create a div with id QuorumUIContainer after cipherLoader
  return createElement('div', {
    id: 'QuorumUIContainer',
    addStyle: CSS.containerStyles.quorumChart
  }) as HTMLDivElement;
}

export function ariaLiveElement() {
  return createElement('div', {
    id: 'CipherAriaLive',
    addStyle: CSS.ariaLive,
    ariaLive: 'polite',
    ariaAtomic: 'true',
    role: 'status'
  })
}

export function changeSentenceButton() {
  return createElement("button", {
    id: 'changeSentenceButton',
    ariaLabel: 'change sentence',
    title: 'change sentence',
    innerHTML: 'change',
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    onclick: changeSentence,
    onkeydown: (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        changeSentence();
      }
    }
  })
}


function changeSentence() {
  //get reference to the sentence container and change sentence button
  const sentenceContBox = document.getElementById('sentenceContainer');
  const changeSentenceButton = document.getElementById('changeSentenceButton');
  if (!sentenceContBox || !changeSentenceButton) return;

  updateElement(changeSentenceButton, {
    addStyle: CSS.buttonStyles.orange,
    addHoverStyle: CSS.buttonStyles.orangeHover,
    innerHTML: 'Update',
  })

  //create textarea element
  const textArea = createElement("textarea", {
    id: 'changeSentenceTextArea',
    ariaLabel: 'change sentence',
    title: 'change sentence',
    rows: 4,
    cols: 50,
    addStyle: {
      height: sentenceContBox.offsetHeight + 'px',
      width: sentenceContBox.offsetWidth + 'px'
    },
    value: CipherGlobals.sentence
  });

  //replace the sentence container with the textarea element
  sentenceContBox.replaceWith(textArea);
  textArea.focus();

  //set event listener for the change sentence button
  changeSentenceButton.onclick = () => {
    CipherGlobals.sentence = textArea.value.toLowerCase();
    textArea.replaceWith(sentenceContainer());
    if (changeSentenceButton) {
      updateElement(changeSentenceButton, {
        addStyle: {
          ...CSS.buttonStyles.main,
          ...CSS.buttonStyles.blue
        },
        innerHTML: 'Change',
        addHoverStyle: CSS.buttonStyles.blueHover,
        onclick: () => { changeSentence() }
      })
    }
    updateAll();
  }
}

export function sortButtons() {
  const header = createElement('h3', {
    id: 'sortButtonsHeader',
    innerHTML: 'Sort Options',
    addStyle: CSS.sortSection.header,
  });

  //create a div to hold right left and reset button
  const alphabetControls = createElement('div', {
    id: 'sortContainer',
    addStyle: CSS.sortSection.sortContainer,
    addChildren: [header]
  });

  const tabSection = createElement("div", {
    id: "tabSection",
    addStyle: CSS.sortSection.tabButtons.container,
  });

  createElement("button", {
    id: "tab1Button",
    addDataset: { tabTarget: "#tab-1" },
    ariaLabel: "Caesar Substitution Options",
    innerHTML: "Caesar Substitution",
    addStyle: { ...CSS.sortSection.tabButtons.button, ...CSS.sortSection.tabButtons.active },
    ariaSelected: 'true',
    onclick: tabClick,
    addHoverStyle: CSS.sortSection.tabButtons.hover,
    appendTo: tabSection,
  });

  createElement("button", {
    id: "tab2Button",
    addDataset: { tabTarget: "#tab-2" },
    ariaLabel: "Random Substitution Options",
    innerHTML: "Random Substitution",
    ariaSelected: 'false',
    addStyle: { ...CSS.sortSection.tabButtons.button, ...CSS.sortSection.tabButtons.inactive, marginLeft: '5px' },
    onclick: tabClick,
    addHoverStyle: CSS.sortSection.tabButtons.hover,
    appendTo: tabSection,
  });

  function tabClick(e: Event) {
    const target = e.target as HTMLElement;
    const tab1Button = document.getElementById('tab1Button');
    const tab2Button = document.getElementById('tab2Button');
    const tab1Content = document.getElementById('tab-1');
    const tab2Content = document.getElementById('tab-2');

    updateElement(target, {
      ariaSelected: 'true',
      addStyle: { ...CSS.sortSection.tabButtons.button, ...CSS.sortSection.tabButtons.active },
      addHoverStyle: CSS.sortSection.tabButtons.hover,
    });
    if (target.id === "tab1Button") {
      if (tab2Button && tab2Content && tab1Content) {
        updateElement(tab2Button, {
          addStyle: { ...CSS.sortSection.tabButtons.button, ...CSS.sortSection.tabButtons.inactive },
          ariaSelected: 'false',
          addHoverStyle: CSS.sortSection.tabButtons.hover,
        });
        updateElement(tab1Content, {
          addStyle: { display: 'flex' },
          ariaSelected: 'true',
        });
        updateElement(tab2Content, {
          addStyle: { display: 'none' },
          ariaSelected: 'false',
        });
        updateSentenceDropdownOptions(sentenceOptionsCaesarSub,);
      }
    } else {
      if (tab1Button && tab1Content && tab2Content) {
        updateElement(tab1Button, {
          addStyle: { ...CSS.sortSection.tabButtons.button, ...CSS.sortSection.tabButtons.inactive },
          ariaSelected: 'false',
          addHoverStyle: CSS.sortSection.tabButtons.hover,
        });
        updateElement(tab1Content, {
          addStyle: { display: 'none' },
          ariaSelected: 'false',
        });
        updateElement(tab2Content, {
          addStyle: { display: 'flex' },
          ariaSelected: 'true',
        });
        updateSentenceDropdownOptions(sentenceOptionsRandomSub);
      }
    }
  }

  alphabetControls.appendChild(tabSection);

  const tab1Div = createElement("div", {
    id: "tab-1",
    addStyle: { ...CSS.sortSection.tabContentContainer, display: 'flex' },
  });

  createButtonGroup(tab1Div, "offsetButtons", "Offset", CSS.sortSection.labelContainer, CSS.sortSection.buttonContainer, offsetControls, resetOffsetButton);
  createButtonGroup(tab1Div, "letterActionButtons2", "Letter Actions", CSS.sortSection.labelContainer, CSS.sortSection.buttonContainer, swapButton, lockButton)
  alphabetControls.appendChild(tab1Div);

  //tab 2
  //OG sort buttons
  const tab2Div = createElement("div", {
    id: "tab-2",
    addStyle: { ...CSS.sortSection.tabContentContainer, display: 'none' },
  });

  createButtonGroup(tab2Div, "sortOriginals", "Sort Originals", { ...CSS.sortSection.labelContainer, flexBasis: '24%' }, CSS.sortSection.buttonContainer, ogAtoZButton, ogByPercentageButton)
  createButtonGroup(tab2Div, "sortSubstitution", "Sort Substitution", { ...CSS.sortSection.labelContainer, flexBasis: '50%' }, CSS.sortSection.buttonContainer, resetButton, applyButton, aToZButton, byPercentageButton, randomButton)
  createButtonGroup(tab2Div, "letterActionButtons", "Letter Actions", { ...CSS.sortSection.labelContainer, flexBasis: '24%', borderRight: 'none' }, CSS.sortSection.buttonContainer, swapButton, lockButton)
  alphabetControls.appendChild(tab2Div);

  return alphabetControls;
}


function offsetControls(): HTMLDivElement {
  //create offset controlls for the alphabet
  const offsetControls = createElement("div", {
    id: "offsetControls",
    addStyle: CSS.offsetStyle.container,
  });

  createElement("button", {
    id: "leftButton",
    innerHTML: "<",
    addStyle: CSS.buttonStyles.lr,
    addHoverStyle: CSS.buttonStyles.lrHover,
    ariaLabel: "Move the alphabet to the left",
    onclick: () => OffsetSwap.decrement(true),
    appendTo: offsetControls,
  });

  createElement("input", {
    type: 'number',
    id: "offset",
    value: "0",
    min: "0",
    max: "25",
    addStyle: CSS.offsetStyle.input,
    ariaLabel: "Enter the number of letters to offset the alphabet by",
    onchange: OffsetSwap.moveFromInput,
    appendTo: offsetControls,
  });

  createElement("button", {
    id: "rightButton",
    innerHTML: ">",
    addStyle: CSS.buttonStyles.lr,
    addHoverStyle: CSS.buttonStyles.lrHover,
    ariaLabel: "Move the alphabet to the right",
    onclick: () => OffsetSwap.increment(true),
    appendTo: offsetControls,
  });

  return offsetControls;
}

function resetButton(): HTMLButtonElement {
  return createElement("button", {
    id: "resetButton",
    innerHTML: "Reset",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Reset the alphabet to the original",
    onclick: substitution.moveLockedToUnlocked,
  });
}

function resetOffsetButton(): HTMLButtonElement {

  function resetOffset() {
    OffsetSwap.currentOffset = 0;
    (document.getElementById("offset") as HTMLInputElement).value = "0";
    substitution.aToZ();
    substitution.moveLockedToUnlocked();
  }

  return createElement("button", {
    id: "resetOffsetButton",
    innerHTML: "Reset",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Reset the offset to 0",
    onclick: resetOffset,
  });
}

function swapButton(): HTMLButtonElement {
  return createElement("button", {
    id: "swapButton",
    innerHTML: "Swap",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.orange, ...CSS.buttonStyles.disabled },
    addHoverStyle: CSS.buttonStyles.orangeHover,
    ariaLabel: "Swap the selected letters",
    onclick: letterActions.swapLetters,
    disabled: true,
    addClass: ['swapButton'],
  });
}

function lockButton(): HTMLButtonElement {
  return createElement("button", {
    id: "lockButton",
    innerHTML: "Map / Unmap",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.disabled },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Map or unmap the selected letters",
    onclick: letterActions.lockLetters,
    disabled: true,
    addClass: ['lockButton'],
  });
}

function aToZButton(): HTMLButtonElement {
  return createElement("button", {
    id: "AtoZButton",
    innerHTML: "A to Z",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Sort the mapped letters from A to Z",
    onclick: substitution.aToZ,
  });
}

function ogAtoZButton(): HTMLButtonElement {
  return createElement("button", {
    id: "OGAtoZButton",
    innerHTML: "A to Z",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.darkBlue },
    addHoverStyle: CSS.buttonStyles.darkBlueHover,
    ariaLabel: "Sort the original alphabet from A to Z",
    onclick: originals.aToZ,
  });
}

function ogByPercentageButton(): HTMLButtonElement {
  return createElement("button", {
    id: "OGByPercentageButton",
    innerHTML: "By %",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.darkBlue },
    addHoverStyle: CSS.buttonStyles.darkBlueHover,
    ariaLabel: "Sort the original alphabet by the percentage of letters that are used in the sentence given",
    onclick: originals.byPercentage,
  });
}

function byPercentageButton(): HTMLButtonElement {
  return createElement("button", {
    id: "ByPercentageButton",
    innerHTML: "By %",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Sort the alphabet by the percentage of letters that are used in the English language",
    onclick: substitution.byPercentage,
  });
}

function applyButton(): HTMLButtonElement {
  return createElement("button", {
    id: "applyButton",
    innerHTML: "Apply",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Apply the current mapping of letters",
    onclick: substitution.moveUnlockedToLocked,
  });
}

function randomButton(): HTMLButtonElement {
  return createElement("button", {
    id: "randomButton",
    innerHTML: "Random",
    addStyle: { ...CSS.buttonStyles.main, ...CSS.buttonStyles.blue },
    addHoverStyle: CSS.buttonStyles.blueHover,
    ariaLabel: "Randomly map the letters",
    onclick: substitution.random,
  });
}


function createLetters(Row: rowType): DocumentFragment {
  // create a document fragment to store all the elements
  const letterFragment = document.createDocumentFragment();
  for (let i = 0; i < ALPHABET_LENGTH; i++) {
    const type: 'button' | 'div' = Row === 'locked' ? 'button' : 'div';
    const letter = createElement(type, {
      addDataset: {
        currentLetter: Row === 'locked' ? CipherGlobals.ALPHABET[i] as letterType : '',
        letterOG: CipherGlobals.ALPHABET[i] as letterType,
        row: Row as rowType,
        marked: 'false'
      },
      addStyle: {
        gridRow: Row === 'original' ? '1' : Row === 'locked' ? '2' : '3',
        gridColumn: `${i + 1}`,
        ...(Row === 'locked' ? CSS.letterStyles.locked : (Row === 'unlocked' ? CSS.letterStyles.unlocked : CSS.letterStyles.original)),
        ...(type === 'button' ? CSS.letterStyles.buttons : CSS.letterStyles.letterdiv)
      },
      id: `${Row}-letter-${CipherGlobals.ALPHABET[i]}`,
      innerHTML: Row === 'unlocked' ? '' : CipherGlobals.ALPHABET[i],
      ariaLabel: Row === 'unlocked' ? 'unmapped letter' : '',
      tabIndex: -1,
      draggable: Row !== 'original',
      ondragstart: function(ev) { dragAndDrop.drag(ev as DragEvent & HTMLElement) },
      ondrop: function(ev) { dragAndDrop.drop(ev as HTMLElement & DragEvent) },
      ondragover: function(ev) { dragAndDrop.allowDrop(ev) },
    });

    if (Row === 'locked') {
      letterEvents(letter as letterButtonType);
    }
    letterFragment.appendChild(letter);
  }
  return letterFragment;
}

export function createLetterRows(): HTMLDivElement {
  const alphabetSet = createElement("div", {
    id: "alphabetSet",
    role: "grid",
    addStyle: CSS.letterStyles.grid,
  });
  createElement("h3", {
    id: "alphabetSetLabel",
    innerHTML: "Mapped Letters",
    addStyle: CSS.letterStyles.header,
    appendTo: alphabetSet,
  });

  const rows = [
    { id: 'originalRow', label: 'Original', style: CSS.letterStyles.labels.ogLabel },
    { id: 'lockedRow', label: 'Mapped', style: CSS.letterStyles.labels.lockedLabel },
    { id: 'unlockedRow', label: '', style: CSS.letterStyles.labels.unlockedLabel },
  ];

  rows.forEach(row => {
    const div = createElement('div', {
      id: row.id,
      tabIndex: row.id === 'lockedRow' ? 0 : -1,
      addStyle: CSS.letterStyles.row,
    });

    if (row.id === 'lockedRow') {
      div.role = 'row';
      div.ariaLabel = 'Mapped Row, Press Enter to move into the letter row'
    }

    const label = createElement('p', {
      innerHTML: row.label,
      addStyle: row.style,
    });
    div.appendChild(createLetters(row.id.replace('Row', '') as rowType));
    alphabetSet.appendChild(label);
    alphabetSet.appendChild(div);

    rowOnKeydown(div);
  });

  return alphabetSet;
}


function createButtonGroup(tab1Div: HTMLElement, id: string, label: string, style: CSSType.Properties, buttonContent: CSSType.Properties, ...buttonFuncs: ((() => HTMLElement) | HTMLElement)[]): void {
  const buttons = createElement("div", {
    id: id,
    addStyle: style
  });

  if (label !== '') {
    const labelEl = createElement("label", {
      htmlFor: id,
      innerHTML: label
    });
    buttons.appendChild(labelEl);
  }

  const buttonDiv = createElement("div", {
    addStyle: buttonContent
  });

  for (let i = 0; i < buttonFuncs.length; i++) {
    const funcOrEl = buttonFuncs[i];
    if (typeof funcOrEl === 'function') {
      buttonDiv.appendChild(funcOrEl());
    } else {
      buttonDiv.appendChild(funcOrEl);
    }
  }
  buttons.appendChild(buttonDiv);
  tab1Div.appendChild(buttons);
}

