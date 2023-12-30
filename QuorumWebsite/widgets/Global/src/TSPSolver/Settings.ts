import { Dropdown } from "../UiKit/molecules/dropdown/dropdown";
import { createElement } from "../util/helper";
import { Button } from "../UiKit/atoms/buttons/buttons";
import { AlgorithmChangeEvent, CityAmountChangeEvent, NewLevelButtonClickEvent, ResetButtonClickEvent } from "./types";

export enum Algorithms {
  BruteForce = "BruteForce",
  Greedy = "Greedy",
}

interface SettingsProps {
  uniqueIdPrefix: string;
}

export class Settings {
  settingsContainer: HTMLDivElement
  uniqueIdPrefix: string
  newLevelButton: Button
  resetButton: Button
  algorithmDropdown: Dropdown<Algorithms>
  cityAmountDropdown: Dropdown<number>

  constructor(props: SettingsProps) {
    const { uniqueIdPrefix } = props;
    this.uniqueIdPrefix = uniqueIdPrefix;
    this.settingsContainer = this.createSettingsContainer()
  }

  createDropdownsContainer() {
    const dropdownsContainer = createElement('div', {
      addClass: 'tsp-dropdowns-container',
      id: 'tsp-dropdowns-container',
      uniqueIdPrefix: this.uniqueIdPrefix,
    })

    this.algorithmDropdown = new Dropdown<Algorithms>({
      uniqueIdPrefix: this.uniqueIdPrefix,
      id: 'tsp-algorithm-dropdown',
      label: 'Algorithm',
      options: Object.values(Algorithms),
    })
    this.algorithmDropdown.render(dropdownsContainer)

    this.cityAmountDropdown = new Dropdown<number>({
      uniqueIdPrefix: this.uniqueIdPrefix,
      id: 'tsp-city-amount-dropdown',
      label: 'City Amount',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    })
    this.cityAmountDropdown.render(dropdownsContainer)

    return dropdownsContainer;
  }

  createButtonsContainer() {
    const buttonsContainer = createElement('div', {
      addClass: 'tsp-buttons-container',
      id: 'tsp-buttons-container',
      uniqueIdPrefix: this.uniqueIdPrefix,
    })

    this.newLevelButton = new Button({
      className: "btn-small-secondary-var1",
      id: "tsp-new-level-button",
      uniqueIdPrefix: this.uniqueIdPrefix,
      text: "New Level",
    })
    this.newLevelButton.render(buttonsContainer)

    this.resetButton = new Button({
      className: "btn-small-secondary-var1",
      id: "tsp-reset-button",
      uniqueIdPrefix: this.uniqueIdPrefix,
      text: "Reset",
    })
    this.resetButton.render(buttonsContainer)

    return buttonsContainer;
  }

  createSettingsContainer() {
    return createElement('div', {
      addClass: 'tsp-settings-container',
      id: 'tsp-settings-container',
      uniqueIdPrefix: this.uniqueIdPrefix,
      textContent: 'Settings'
    })
  }

  handleNewLevelClick() {
    const event: NewLevelButtonClickEvent = new CustomEvent(`${this.uniqueIdPrefix}newLevelButtonClick`, { detail: { buttonId: 'newLevelButton' } });
    document.dispatchEvent(event);
  }

  handleResetClick() {
    const event: ResetButtonClickEvent = new CustomEvent(`${this.uniqueIdPrefix}resetButtonClick`, { detail: { buttonId: 'resetButton' } });
    document.dispatchEvent(event);
  }

  handleAlgorithmChange() {
    const event: AlgorithmChangeEvent = new CustomEvent(`${this.uniqueIdPrefix}algorithmChange`, { detail: { dropdownId: 'algorithmDropdown', value: this.algorithmDropdown.value } });
    document.dispatchEvent(event);
  }

  handleCityAmountChange() {
    const event: CityAmountChangeEvent = new CustomEvent(`${this.uniqueIdPrefix}cityAmountChange`, { detail: { dropdownId: 'cityAmountDropdown', value: this.cityAmountDropdown.value } });
    document.dispatchEvent(event);
  }

  render(parent: HTMLDivElement) {
    this.settingsContainer.appendChild(this.createDropdownsContainer())
    this.settingsContainer.appendChild(this.createButtonsContainer())
    parent.appendChild(this.settingsContainer);
    this.newLevelButton.getElement().addEventListener('click', this.handleNewLevelClick.bind(this));
    this.resetButton.getElement().addEventListener('click', this.handleResetClick.bind(this));
    this.algorithmDropdown.addOnChangeListener(this.handleAlgorithmChange.bind(this));
    this.cityAmountDropdown.addOnChangeListener(this.handleCityAmountChange.bind(this));
  }
}

