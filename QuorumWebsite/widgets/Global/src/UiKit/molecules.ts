import { createElement, updateElement } from "../util/helper.js";
import { Button } from "./atoms/buttons/buttons.js";
import { Dropdown } from "./molecules/dropdown/dropdown.js";
import { Header } from "./molecules/header/header.js";
import { CsvSettings } from "./molecules/modals/csvSettings.js";



export const UiKitMolecule = document.getElementById('loadMolecule') as HTMLDivElement;


//create Molecules

console.log('creating molecules');
console.log(UiKitMolecule);
updateElement(UiKitMolecule, {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }
});

createElement('h1', {
  innerText: 'UI Kit Molecule',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '2rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: UiKitMolecule,
});
const molecules = createElement('div', {
  uniqueIdPrefix: 'molecules',
  id: '_loader',
  addStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  appendTo: UiKitMolecule,
});


//create Modals

const modals = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: molecules,
})

createElement('h2', {
  innerText: 'Modals',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: modals,
});

const modal = new CsvSettings(modals);

const modalButton = new Button({ text: 'Create CSV Settings', className: 'btn-large-secondary-var1', uniqueIdPrefix: '', id: 'csvModalButton' });
modalButton.getButton().addEventListener('click', () => {
  if (modal.isShowing()) {
    modal.hide();
  } else {
    modal.show();
  }
})

modalButton.render(modals);

modal.hide()
//create dropdown

const dropdown = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: molecules,
})

createElement('h2', {
  innerText: 'Dropdown',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: dropdown,
});

const optionArray = ['select state', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
new Dropdown({ options: optionArray, uniqueIdPrefix: '', id: 'moleculeDropdown' }).render(dropdown);

//create header
const header = createElement('div', {
  addStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: '48vw',
  },
  appendTo: molecules,
})

createElement('h2', {
  innerText: 'Header',
  addStyle: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#000000',
    margin: '0.5rem',
  },
  appendTo: header,
});

const h1 = new Header({ theme: 'light', title: 'Flippy Do' });
h1.render(header);
h1.switchTheme('dark');
h1.switchTheme('light');
const h2 = new Header({ theme: 'dark', title: 'Flippy Do' })
h2.render(header);
h2.switchTheme('hico');

const h3 = new Header({ theme: 'hico', title: 'Flippy Do' })
h3.render(header);
h3.switchTheme('light');
h3.switchTheme('dark');


//load in Montserrat font
LinkCSS("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

function LinkCSS(url: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
}
