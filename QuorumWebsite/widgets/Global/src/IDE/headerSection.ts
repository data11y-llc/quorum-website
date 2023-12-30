import { Button } from "../UiKit/atoms/buttons/buttons.js";
import { createElement } from "../util/helper.js";
import { ideCache } from "./highlight.js";
import { hamburgerIcon, quorumIcon, runIcon, stopIcon } from "./icons.js";
import { runCode, stopProgram } from "./runCode.js";
import { CSS } from "./style/style.js";

function createHeaderIcon(IDE: HTMLElement, headerSection: HTMLElement, icon: string, size: string) {
  createElement('div', {
    innerHTML: icon,
    uniqueIdPrefix: IDE.id,
    id: 'headerIcon',
    addStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      marginLeft: size === '75px' ? '20px' : '10px',
    },
    appendTo: headerSection,
  });
}

export function makeHeaderSection(IDE: HTMLElement, preId: string): HTMLDivElement {

  const headerSection = createElement("div", {
    addStyle: CSS[preId][ideCache[preId].theme].headerSectionStyle.container,
    uniqueIdPrefix: IDE.id,
    id: "headerSection",
    appendTo: IDE
  });

  createHeaderIcon(IDE, headerSection, quorumIcon, '75px');

  const title = IDE.dataset.title || 'Project Name';
  createElement('h1', {
    textContent: title,
    uniqueIdPrefix: IDE.id,
    addStyle: CSS[preId][ideCache[preId].theme].headerSectionStyle.title,
    id: 'headerTitle',
    appendTo: headerSection,
  });


  const runButton = new Button({ text: "Run", icon: runIcon, className: 'btn-medium-primary-var1', id: 'runButton', uniqueIdPrefix: IDE.id });
  runButton.getElement().onclick = () => runCode(IDE.id);
  runButton.getElement().style.backgroundColor = '#75BDDB';
  runButton.getElement().ariaLabel = 'Run Program';

  const stopButton = new Button({ text: "Stop", icon: stopIcon, className: 'btn-medium-negative-var1', id: 'stopButton', uniqueIdPrefix: IDE.id });
  stopButton.getElement().onclick = () => stopProgram();
  stopButton.getElement().style.backgroundColor = '#940901';
  stopButton.getElement().ariaLabel = 'Stop Program';

  createElement('div', {
    uniqueIdPrefix: IDE.id,
    id: 'headerButtons',
    addStyle: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '40%',
      // height: '75px',
      marginRight: '20px',
      columnGap: '10px',
    },
    addChildren: [
      runButton.getElement(),
      stopButton.getElement(),
    ],
    appendTo: headerSection,
  });

  return headerSection;
}

export function makeMobileHeaderSection(IDE: HTMLElement, preId: string): HTMLDivElement {
  const headerSection = createElement("div", {
    addStyle: CSS[preId][ideCache[preId].theme].headerSectionStyle.container,
    uniqueIdPrefix: IDE.id,
    id: "headerSection",
    appendTo: IDE
  });

  createHeaderIcon(IDE, headerSection, quorumIcon, '50px');

  createElement('h1', {
    textContent: IDE.dataset.title || 'Project Name',
    uniqueIdPrefix: IDE.id,
    addStyle: {
      ...CSS[preId][ideCache[preId].theme].headerSectionStyle.title,
      //give a max font size of 20px
      fontSize: 'min(20px, 5vw)',
    },
    id: 'headerTitle',
    appendTo: headerSection,
  });

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: ideCache[preId].theme === 'light' ? 'black' : 'white',
    border: 'none',
    padding: '10px',
    fontSize: '12px',
  };

  createElement('button', {
    innerHTML: hamburgerIcon,
    addStyle: buttonStyle,
    uniqueIdPrefix: IDE.id,
    ariaLabel: 'Open Side Bar Button',
    id: 'hamburgerButton',
    onclick: function(this) {
      console.log('clicked');
      const sideBar = document.getElementById(this.uniqueIdPrefix + 'sideBar') as HTMLDivElement;
      if (sideBar.style.display === 'flex') {
        sideBar.style.display = 'none';
      } else {
        sideBar.style.display = 'flex';
      }
    },
    appendTo: headerSection,
  });

  return headerSection;
}

