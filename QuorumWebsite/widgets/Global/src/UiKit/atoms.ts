import { createElement, updateElement } from "../util/helper.js";
import { UiKitColors } from "../util/UiKit.js";
import { Button } from "./atoms/buttons/buttons.js";
import { CheckboxGroup } from "./atoms/checkboxes/checkboxes.js";
import { loadingSpinner, plusIcon } from "./atoms/icons/icons.js";
import { Icon } from "./atoms/icons/showIcons.js";
import { Keystroke } from "./atoms/keystrokes/keystrokes.js";
import { RadioGroup } from "./atoms/radio/radio.js";
import { SelectedList } from "./atoms/selectionList/selectionList.js";
import { Tabs } from "./atoms/tabs/tabs.js";
import { TextArea, TextBox } from "./atoms/textAreas/textArea.js";
import { TextInputField } from "./atoms/textFields/textFields.js";
import { Toggle } from "./atoms/toggle/toggle.js";
import { Accordion } from './atoms/trees/trees.js';

//load in Montserrat font
LinkCSS(
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
);

export const UiKitAtom = document.getElementById('loadAtom') as HTMLDivElement;

updateElement(UiKitAtom, {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

createElement('h1', {
  innerText: 'UI Kit Atoms',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '2rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: UiKitAtom,
});

const themeSwitcherDiv = createElement('div', {
  uniqueIdPrefix: 'load2',
  addStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  appendTo: UiKitAtom,
});

const atoms = createElement('div', {
  uniqueIdPrefix: 'load2',
  id: 'atoms',
  addStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  appendTo: UiKitAtom,
});

//make containers
// const containerContainer = createElement('div', {
//   uniqueIdPrefix: 'load2',
//   addStyle: {
//     height: 'fit-content',
//     width: '48vw',
//   },
//   id: 'containerContainer',
//   appendTo: atoms,
// });

// createElement('h2', {
//   innerText: 'Containers',
//   addStyle: {
//     fontFamily: 'Montserrat',
//     fontWeight: '600',
//     fontSize: '1.5rem',
//     color: '#000000',
//     margin: '0.5rem',
//   },
//   appendTo: containerContainer,
// });

// createGrids(containerContainer, 'mobile', 'grid');
// createGrids(containerContainer, 'tablet', 'grid');
// createGrids(containerContainer, 'desktop', 'grid');
// createGrids(containerContainer, 'responsive', 'grid');
// createElement('br', { appendTo: containerContainer });
// createGrids(containerContainer, 'mobile', 'flex');
// createGrids(containerContainer, 'tablet', 'flex');
// createGrids(containerContainer, 'desktop', 'flex');
// createGrids(containerContainer, 'responsive', 'flex');

//create buttons
const buttonContainer = createElement('div', {
  uniqueIdPrefix: 'load2',
  addStyle: {
    height: 'fit-content',
    width: '48vw',
  },
  id: 'buttons',
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Buttons',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: buttonContainer,
});

const checkboxes = createElement('div', {
  uniqueIdPrefix: 'load2',
  id: 'checkboxes',
  addStyle: {
    height: 'fit-content',
    maxHeight: '90vh',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'checkboxes',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: checkboxes,
});

createElement('br', {
  appendTo: checkboxes,
});

const icons = createElement('div', {
  uniqueIdPrefix: 'load2',
  addStyle: {
    height: 'fit-content',
    maxHeight: '90vh',
    width: '48vw',
  },
  id: 'icons',
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Icons',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: icons,
});

// createIconList(icons);

const radio = createElement('div', {
  uniqueIdPrefix: 'load2',
  id: 'radio',
  addStyle: {
    height: 'fit-content',
    maxHeight: '90vh',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Radio',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: radio,
});

//create spinner

const spinner = createElement('div', {
  addStyle: {
    height: 'fit-content',
    maxHeight: 'fit-content',
    width: '48vw',
    minWidth: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Spinner',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },

  appendTo: spinner,
});

//create text Areas

const textArea = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Text Area',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },

  appendTo: textArea,
});

//create keystrokes

const keystrokes = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Keystrokes',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: keystrokes,
});

// createKeystrokes(keystrokes);

//create toggles

const toggles = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Toggles',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: toggles,
});

//create Tabs

const tabs = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Tabs',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: tabs,
});

//create selectionList

const selectionList = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Selection List',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: selectionList,
});

//create Text Fields

const textFields = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Text Fields',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: textFields,
});

const b1 = new Button({
  className: 'btn-large-primary-var1',
  text: 'Large Static Button',
  uniqueIdPrefix: '',
  id: 'btn1',
});
b1.render(buttonContainer);
const icon1 = new Icon({
  icon: plusIcon,
  addClass: 'icon-quorum__blue__50-size-2',
  uniqueIdPrefix: '',
  id: 'icon1',
});
icon1.render(icons);
const k1 = new Keystroke(
  { uniqueIdPrefix: 'kj', id: 'keyStroke' },
  { text: 'ctrl', option: 'normal' },
  { text: 'shift', option: 'subscript' }
);
k1.container.style.backgroundColor = 'grey';
k1.container.style.marginLeft = '20px';
k1.render(keystrokes);
const spin = new Icon({
  icon: loadingSpinner,
  addClass: 'spinner',
  uniqueIdPrefix: '',
  id: 'spinner1',
});
spin.render(spinner);

const ta1 = new TextArea({
  labelText: 'Text Area',
  placeholder: 'Enter text here',
  uniqueIdPrefix: '',
  id: 'textArea',
  size: 'sm',
});
ta1.render(textArea);

const tb1 = new TextBox('sm');
tb1.render(textFields);

new Toggle(toggles, { id: 'toggle', uniqueIdPrefix: '' });

const check1 = new CheckboxGroup({
  options: ['checkbox1', 'checkbox2', 'checkbox3'],
  disabled: false,
  direction: 'row',
  theme: 'light',
  uniqueIdPrefix: '',
  id: 'check1',
});
check1.render(checkboxes);
const radio1 = new RadioGroup({
  theme: 'light',
  direction: 'row',
  disabled: false,
  name: 'radio1',
  options: ['radio1', 'radio2', 'radio3'],
  uniqueIdPrefix: '',
  id: 'radio1',
});
radio1.render(radio);
const s1 = new SelectedList({
  theme: 'light',
  options: [
    'option1',
    'option2',
    'option3',
    'option4',
    'option5',
    'option6',
    'option7',
    'option8',
  ],
  uniqueIdPrefix: '',
  id: 's1',
});
s1.render(selectionList);
const t1 = new Tabs(tabs, {
  theme: 'light',
  uniqueIdPrefix: '',
  id: 'tabs1',
  size: 'sm',
});
const textField1 = new TextInputField({
  theme: 'light',
  size: 'md',
  helperText: 'helper text',
  labelText: 'label',
  placeholder: 'placeholder',
  uniqueIdPrefix: '',
  id: 'textField1',
  type: 'text',
});
textField1.render(textFields);

const themeSwitcher = new RadioGroup({
  options: ['light', 'dark', 'high-contrast'],
  direction: 'row',
  theme: 'light',
  disabled: false,
  name: 'themeSwitcher',
  uniqueIdPrefix: '',
  id: 'themeSwitcher',
});
themeSwitcher.render(themeSwitcherDiv);
themeSwitcher.selectRadio('light');

themeSwitcher.setOnChange((e) => {
  const theme = (e.target as HTMLInputElement).value;
  document.body.style.backgroundColor = '#000000';
  const elArray = [textField1, check1, radio1, t1, themeSwitcher, s1];
  if (theme === 'high-contrast') {
    //if the class of all the above has switchTheme method, call it
    elArray.forEach((atom) => {
      if (atom && typeof atom.switchTheme === 'function') {
        atom.switchTheme('high-contrast');
      }
    });
  } else if (theme === 'light') {
    document.body.style.backgroundColor = '#f9faee';
    elArray.forEach((atom) => {
      if (atom && typeof atom.switchTheme === 'function') {
        atom.switchTheme('light');
      }
    });
  } else if (theme === 'dark') {
    document.body.style.backgroundColor = UiKitColors.neutral.grey._95;
    elArray.forEach((atom) => {
      if (atom && typeof atom.switchTheme === 'function') {
        atom.switchTheme('dark');
      }
    });
  }
});

function LinkCSS(url: string) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
}

//add tree component
const tree = createElement('div', {
  uniqueIdPrefix: 'load2',
  id: 'tree',
  addStyle: {
    height: 'fit-content',
    maxHeight: '90vh',
    width: '48vw',
  },
  appendTo: atoms,
});

createElement('h2', {
  innerText: 'Trees',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: tree,
});

createElement('br', {
  appendTo: tree,
});

const treeRoot = createElement('div', {
  uniqueIdPrefix: 'load2',
  id: 'treeRoot',
  appendTo: tree,
});

const ac1 = new Accordion({ id: 'accordion1', uniqueId: 'laksjfalsjdf' });
ac1.createItem(data);
