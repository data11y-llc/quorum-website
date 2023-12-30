import EventEmitter from "events";
import { createElement, updateElement } from "../../../util/helper";
import { Theme, TupleToUnion } from "../../helperTypes";

interface DropdownOptions<T> {
  uniqueIdPrefix: string;
  id: string;
  options: T[];
  label?: string;
}

type ChangeListener<T> = (value: T) => void;


export class Dropdown<T = string> {
  private _outerContainer: HTMLDivElement | undefined = undefined;
  private _label: HTMLLabelElement | undefined = undefined;
  private _dropdown: HTMLDivElement;
  private _selectDropdown: HTMLSelectElement;
  private _selected: HTMLDivElement;
  private _items: HTMLDivElement;
  private _options: T[];
  private _rendered: boolean;
  private _emitter: EventEmitter;
  private _id: string;
  private _value: T;
  private _valueIndex: number;
  private _uniqueIdPrefix: string;
  private _liveRegion: HTMLDivElement;

  constructor(d_options: DropdownOptions<T>) {
    const { uniqueIdPrefix, id, options, label } = d_options;
    this._id = id;
    this._uniqueIdPrefix = uniqueIdPrefix;
    this._rendered = false;
    this._value = options[0];
    this._valueIndex = 0;

    if (label) {
      this.createOuterContainer();
      this.createLabel(label);
    }

    this._dropdown = this.createDropdown();
    this._options = options;
    this._selectDropdown = this.createSelectDropdown();

    const { selected, items } = this.createSelectElements();
    this._selected = selected;
    this._items = items;

    this.addAriaAttributes();

    this._emitter = new EventEmitter();
  }

  get outerContainer(): HTMLDivElement | undefined {
    return this._outerContainer;
  }

  get label(): HTMLLabelElement | undefined {
    return this._label;
  }

  get dropdown(): HTMLDivElement {
    return this._dropdown;
  }

  get selectDropdown(): HTMLSelectElement {
    return this._selectDropdown;
  }

  get selected(): HTMLDivElement {
    return this._selected;
  }

  get items(): HTMLDivElement {
    return this._items;
  }

  get rendered(): boolean {
    return this._rendered;
  }

  set rendered(rendered: boolean) {
    this._rendered = rendered;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
    this._valueIndex = this._options.indexOf(value);

    const valueSpan = createElement('span', {
      innerText: value as string,
      addStyle: {
        width: 'inherit',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block',
      },
    });

    // Clear any previous content and append the new text wrapper
    this.selected.innerHTML = '';
    this.selected.appendChild(valueSpan);

    this.selectDropdown.selectedIndex = this.valueIndex;
  }


  get valueIndex(): number {
    return this._valueIndex;
  }

  set valueIndex(valueIndex: number) {
    this._valueIndex = valueIndex;
    this._value = this._options[valueIndex];
    // this.selected.innerHTML = this.selectDropdown.options[this.valueIndex].innerHTML;
    this.selectDropdown.selectedIndex = this.valueIndex;
  }

  get selectedOptionText(): T {
    return this.selectDropdown.options[this.selectDropdown.selectedIndex].innerHTML as unknown as T;
  }

  get id(): string {
    return this._id;
  }

  createLiveRegion(): HTMLDivElement {
    this._liveRegion = createElement('div', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'liveRegion',
      addStyle: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
      },
      ariaLive: 'polite',
      ariaAtomic: 'true',
    });

    return this._liveRegion;
  }


  addAriaAttributes(): void {
    if (this.label) {
      this.label.htmlFor = this._uniqueIdPrefix + this.id + 'selected';
    }

    this.dropdown.setAttribute('role', 'presentation');

    this.selected.setAttribute('role', 'combobox');
    this.selected.setAttribute('aria-haspopup', 'listbox');
    this.selected.setAttribute('aria-expanded', 'false');
    if (this.label) {
      this.selected.setAttribute('aria-labelledby', this._uniqueIdPrefix + this.id + 'dropdownlabel');
    }

    this.items.setAttribute('role', 'listbox');
    this.items.setAttribute('aria-labelledby', this._uniqueIdPrefix + this.id + 'selected');
    this.items.setAttribute('tabindex', '-1');
  }

  createOuterContainer() {
    this._outerContainer = createElement('div', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'outerContainer',
      addClass: 'custom-select-column',
    });

    this._outerContainer.appendChild(this.createLiveRegion());
  }

  createLabel(label: string) {
    if (!this.outerContainer) return
    this._label = createElement('label', {
      addStyle: {
        display: 'flex',
        marginLeft: '1rem',
        flexDirection: 'column',
        height: 'fit-content',
      },
      innerText: label,
      addClass: 'typo_text-lgText',
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'dropdownlabel',
      appendTo: this.outerContainer,
    });
  }

  createDropdown() {
    this._dropdown = createElement('div', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'dropdown',
      addClass: 'custom-select',
      addStyle: {
        width: 'inherit',
      },
    });

    if (this.outerContainer) {
      this.outerContainer.appendChild(this.dropdown);
    }
    return this.dropdown;
  }

  createSelectDropdown() {
    this._selectDropdown = createElement('select', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'selectDropdown',
      appendTo: this.dropdown,
    });


    this._options.forEach((option) => {
      createElement('option', {
        uniqueIdPrefix: this._uniqueIdPrefix,
        ariaSelected: 'false',
        value: option as string,
        innerText: option as string,
        appendTo: this.selectDropdown,
      });
    });
    return this.selectDropdown;
  }

  createSelectElements(): { selected: HTMLDivElement, items: HTMLDivElement } {
    const selected = this.createSelectedElement();
    const items = this.createItemsElement();
    this.addOptionsToItems(items);

    this.dropdown.appendChild(selected);
    this.dropdown.appendChild(items);

    return { selected, items };
  }

  createSelectedElement(): HTMLDivElement {
    return createElement('div', {
      tabIndex: 0,
      uniqueIdPrefix: this._uniqueIdPrefix,
      id: this.id + 'selected',
      addClass: ['select-selected', 'dropdown-arrow-black', 'dropdown-light-theme'],
      innerHTML: this.selectedOptionText as string,
      onblur: (e) => this.handleBlur(e),
      onclick: (e) => this.openOptionMenu(e),
      onkeydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openOptionMenu(e);
        } else {
          this.navigateItems(e);
        }
      },
    });
  }

  handleBlur(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    // console.log('blur', relatedTarget);
    if (!relatedTarget || !this.dropdown.contains(relatedTarget)) {
      console.log('close');
      this.closeOptionMenu();
    }
  }

  closeOptionMenu() {
    this.selected.ariaExpanded = 'false';
    this.items.classList.add('select-hide');
    this.selected.setAttribute('aria-expanded', 'false');
  }


  createItemsElement(): HTMLDivElement {
    return createElement('div', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      role: 'listbox',
      ariaExpanded: 'false',
      id: this.id + 'items',
      addClass: ['select-items', 'select-hide', 'dropdown-light-theme'],
      onkeydown: (e) => { this.navigateItems(e) }
    });
  }

  addOptionsToItems(items: HTMLDivElement) {
    const selectLength = this.selectDropdown.options.length;
    for (let i = 0; i < selectLength; i++) {
      createElement('div', {
        uniqueIdPrefix: this._uniqueIdPrefix,
        ariaSelected: i === this.valueIndex ? 'true' : 'false',
        role: 'option',
        id: this.id + 'option' + i,
        innerHTML: this.selectDropdown.options[i].innerHTML,
        tabIndex: 0,
        onclick: (e) => this.changeValue(i, (e.target as HTMLElement).innerHTML as unknown as T),
        onkeydown: (e) => this.handleOptionKeyDown(e, i, e.target as HTMLElement),
        appendTo: items,
      });
    }
  }

  addOption(newOption: T): void {
    // Add to internal options array
    this._options.push(newOption);

    // Create new option in selectDropdown
    createElement('option', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      ariaSelected: 'false',
      value: newOption as string,
      innerText: newOption as string,
      appendTo: this.selectDropdown,
    });

    // Create new option in items
    const optionIndex = this._options.length - 1;
    createElement('div', {
      uniqueIdPrefix: this._uniqueIdPrefix,
      ariaSelected: optionIndex === this.valueIndex ? 'true' : 'false',
      role: 'option',
      id: this.id + 'option' + optionIndex,
      innerHTML: newOption as string,
      tabIndex: 0,
      onclick: (e) => this.changeValue(optionIndex, (e.target as HTMLElement).innerHTML as unknown as T),
      onkeydown: (e) => this.handleOptionKeyDown(e, optionIndex, e.target as HTMLElement),
      appendTo: this.items,
    });
  }

  removeOption(value: T): void {
    // Find the index of the option
    const index = this._options.findIndex((option) => option === value);
    if (index === -1) {
      console.error(`Option with value "${value}" not found.`);
      return;
    }

    // Remove the option from the _options array
    this._options.splice(index, 1);

    // Remove the option from the selectDropdown
    this.selectDropdown.removeChild(this.selectDropdown.options[index]);

    // Remove the option from the items element
    this.items.removeChild(this.items.children[index]);

    // If the removed option was the currently selected option, select the first option
    if (this.value === value) {
      this.valueIndex = 0;
    } else if (index < this.valueIndex) {
      // If the removed option was before the selected one, decrease the selected index by one
      this.valueIndex--;
    }
  }

  updateOption(position: string | number, updateText: T): void {
    let index: number;

    if (typeof position === 'number') {
      index = position;
    } else {
      index = this._options.findIndex((option) => option === position);
      if (index === -1) {
        console.error(`Option with value "${position}" not found.`);
        return;
      }
    }

    // Update the option in the selectDropdown
    this.selectDropdown.options[index].innerHTML = updateText as string;
    this.selectDropdown.options[index].value = updateText as string;

    // Update the option in the items element
    this.items.children[index].innerHTML = updateText as string;

    // Update the option in the _options array
    this._options[index] = updateText;

    // If the updated option is the currently selected option, update the selected element and value property
    if (this.valueIndex === index) {
      this.selected.innerHTML = updateText as string;
      this.value = updateText;
    }
  }

  handleOptionKeyDown(e: KeyboardEvent, index: number, optionElement: HTMLElement) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      this.changeValue(index, optionElement.innerHTML as unknown as T);
    }
    else {
      e.preventDefault();
      this.focusOption(e);
    }
  }

  openOptionMenu(e: Event) {
    e.stopPropagation();
    if (!e.target) return;
    this.selected.ariaExpanded = 'true';
    this.items.classList.toggle('select-hide');
    (e.target as HTMLElement).onkeyup = (e: KeyboardEvent) => this.focusOption.call(this, e);
  }

  focusOption(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    for (let i = 0; i < this._options.length; i++) {
      const optionText = this.items.children[i].innerHTML.toLowerCase();
      if (optionText.startsWith(key)) {
        this.items.children[i].focus();
        this.items.setAttribute('aria-activedescendant', this._uniqueIdPrefix + this.id + 'option' + i);
        break;
      }
    }
  }


  changeValue(index: number, value: T) {
    const prevValue = this.selectDropdown.value;
    this.selectDropdown.selectedIndex = index;
    this.value = value;
    this.valueIndex = index;
    ////make the rest of the options unselected
    for (let i = 0; i < this._options.length; i++) {
      if (i !== index) {
        this.items.children[i].setAttribute('aria-selected', 'false');
      } else {
        this.items.children[i].setAttribute('aria-selected', 'true');
      }
    }

    this.closeOptionMenu();

    // Emit a 'change' event if the value has changed
    if (prevValue !== value) {
      this._emitter.emit('change', value);
    }

    // Announce the selected value
    // this._liveRegion.innerHTML = `Selected: ${value}`;
  }

  addOnChangeListener(listener: ChangeListener<T>): void {
    this._emitter.on('change', listener);
  }

  navigateItems(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key === 'arrowdown' || key === 'arrowup') {
      e.preventDefault();
      const options = this.items.children as HTMLCollectionOf<HTMLDivElement>;
      const selectedOption = this.items.querySelector(':focus') as HTMLDivElement;
      if (selectedOption) {
        const index = Array.from(options).indexOf(selectedOption);
        if (key === 'arrowdown') {
          if (index < options.length - 1) {
            options[index + 1].focus();
          } else {
            options[0].focus();
            this.items.scrollTop = 0;
          }
        } else {
          if (index > 0) {
            options[index - 1].focus();
          } else {
            options[options.length - 1].focus();
          }
        }
        this.items.setAttribute('aria-activedescendant', options[index].id);
      } else {
        options[0].focus();
        this.items.scrollTop = 0;
        this.items.setAttribute('aria-activedescendant', options[0].id);
      }
    }
  }

  setOptions(newOptions: T[]): void {
    // Clear current options
    this.selectDropdown.innerHTML = '';
    this.items.innerHTML = '';

    // Update the options property
    this._options = newOptions;

    // Re-populate the selectDropdown and items elements with new options
    newOptions.forEach((option, index) => {
      createElement('option', {
        role: 'option',
        uniqueIdPrefix: this._uniqueIdPrefix,
        value: option as string,
        ariaSelected: this.valueIndex === 0 ? 'true' : 'false',
        innerText: option as string,
        appendTo: this.selectDropdown,
      });
    });

    // Add options to the 'items' element
    this.addOptionsToItems(this.items);

    // Reset the selected value to the first option
    this.value = newOptions[0];
    this.valueIndex = 0;
  }

  handleDocumentKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      const dropdownOpened = !this.items.classList.contains('select-hide');
      if (dropdownOpened) {
        this.closeOptionMenu();
        this.selected.focus();
      }
    }
  }

  switchTheme(theme: TupleToUnion<Theme>): void {
    const themeClassMap = {
      light: 'dropdown-light-theme',
      dark: 'dropdown-dark-theme',
      hico: 'dropdown-hico-theme',
    } as const

    // Remove existing theme classes
    Object.values(themeClassMap).forEach((themeClass) => {
      if (this.outerContainer) {
        updateElement(this.outerContainer, {
          removeClass: themeClass,
        });
      } else {
        updateElement(this.dropdown, {
          removeClass: themeClass,
        });
      }
      //remove themeClass from selected element
      this.selected.classList.remove(themeClass);
      this.items.classList.remove(themeClass);
    });

    // Add the new theme class
    if (this.outerContainer) {
      updateElement(this.selected, {
        addClass: `dropdown-${theme === 'high-contrast' ? 'hico' : theme}-theme`,
      });
    }

    this.selected.classList.add(`dropdown-${theme === 'high-contrast' ? 'hico' : theme}-theme`);
    this.items.classList.add(`dropdown-${theme === 'high-contrast' ? 'hico' : theme}-theme`);

    if (theme === 'high-contrast' || theme === 'dark') {
      if (this.label)
        this.label.style.color = 'white';
      this.selected.classList.add('dropdown-arrow-white');
      this.selected.classList.remove('dropdown-arrow-black');
    } else if (theme === 'light') {
      if (this.label)
        this.label.style.color = 'black';
      this.selected.classList.remove('dropdown-arrow-white');
      this.selected.classList.add('dropdown-arrow-black');
    }
  }


  render(parent: HTMLElement): void {
    this.outerContainer ? parent.appendChild(this.outerContainer) : parent.appendChild(this.dropdown);
    this.rendered = true;
    document.addEventListener('keydown', this.handleDocumentKeyDown.bind(this))
  }

  destroy(): void {
    this.value = this._options[0];
    this.outerContainer ? this.outerContainer.remove() : this.dropdown.remove();
    this.rendered = false;
    document.removeEventListener('keydown', this.handleDocumentKeyDown.bind(this))
  }
}
