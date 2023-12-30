import { Theme, TupleToUnion } from "../UiKit/helperTypes";
import { Header } from "../UiKit/molecules/header/header";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher";
import { createElement, updateElement } from "../util/helper";
import { CityGraph } from "./CityGraph";
import { Settings } from "./Settings";
import { AlgorithmChangeEvent, CityAmountChangeEvent, NewLevelButtonClickEvent, ResetButtonClickEvent } from "./types";

export class TSPSolver {
  id: string
  mainContainer: HTMLDivElement
  contentContainer: HTMLDivElement
  themeModal: ThemeSettingsModal<TSPSolver>
  header: Header
  settings: Settings
  CityGraph: CityGraph

  constructor(id: string) {
    this.id = id;
    this.mainContainer = document.getElementById(id) as HTMLDivElement;
    this.mainContainer = updateElement(this.mainContainer, {
      addClass: 'tsp-main-container',
      id: 'tsp-main-container',
    }) as HTMLDivElement;

    this.settings = new Settings({ uniqueIdPrefix: this.id })
    this.CityGraph = new CityGraph({ uniqueIdPrefix: this.id })

    this.header = this.createHeader()
    this.contentContainer = this.createContentContainer()
    this.render(this.mainContainer);
    this.themeModal = new ThemeSettingsModal({ comingFrom: this, theme: 'light', id: "tsp-theme-modal", uniqueIdPrefix: this.id })
    document.addEventListener(`${this.id}newLevelButtonClick`, this.handleNewLevelButtonClick.bind(this) as (event: Event) => void);
    document.addEventListener(`${this.id}resetButtonClick`, this.handleResetButtonClick.bind(this) as (event: Event) => void);
    document.addEventListener(`${this.id}algorithmChange`, this.handleAlgorithmChange.bind(this) as (event: Event) => void);
    document.addEventListener(`${this.id}cityAmountChange`, this.handleCityAmountChange.bind(this) as (event: Event) => void);
  }

  init() {
  }

  createHeader() {
    const header = new Header({ theme: 'light', title: 'TSP Solver', uniqueId: this.id })
    header.settingsButton.getElement().onclick = () => {
      this.themeModal.open()
    }
    return header
  }

  createContentContainer() {
    const contentContainer = createElement('div', {
      addClass: 'tsp-content-container',
      id: 'tsp-content-container',
      uniqueIdPrefix: this.id,
    })
    return contentContainer
  }

  switchTheme(theme: TupleToUnion<Theme>) {
    this.header.switchTheme(theme)
  }

  handleNewLevelButtonClick(event: NewLevelButtonClickEvent) {
    this.CityGraph.newLevel();
  }

  handleResetButtonClick(event: ResetButtonClickEvent) {
    this.CityGraph.reset();
  }

  handleAlgorithmChange(event: AlgorithmChangeEvent) {
    this.CityGraph.changeAlgorithm(event.detail.value);
  }

  handleCityAmountChange(event: CityAmountChangeEvent) {
    this.CityGraph.changeCityAmount(event.detail.value);
  }

  render(parent: HTMLDivElement) {
    this.header.render(parent)
    this.CityGraph.render(this.contentContainer)
    this.settings.render(this.contentContainer)
    parent.appendChild(this.contentContainer);
  }
}
