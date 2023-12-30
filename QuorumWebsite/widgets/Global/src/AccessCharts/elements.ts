import { Button } from "../UiKit/atoms/buttons/buttons.js";
import { TextInputField, NumberInputField } from "../UiKit/atoms/textFields/textFields.js";
import { Dropdown } from "../UiKit/molecules/dropdown/dropdown.js";
import { Header } from "../UiKit/molecules/header/header.js";
import { createElement, LoadScript, LinkCSS, updateElement } from "../util/helper.js";
import { UiKitColors } from "../util/UiKit.js";
import { ChartTypes, LegendTypes, ColorPalette, ChartOptions, ChartOptionsArray } from "./globals.js";
import { CsvColOption, CsvColOptions, CsvSettings } from "../UiKit/molecules/modals/csvSettings.js";
import { CheckboxGroup } from "../UiKit/atoms/checkboxes/checkboxes.js";
import { formatSVG } from "../UiKit/atoms/icons/showIcons.js";
import { minusIcon, plusIcon } from "../UiKit/atoms/icons/icons.js";
import { quorumChart } from "./chartControls.js";
import { loggedMethod } from "../util/decorators.js";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher.js";
import { QUORUM_CHARTS_CSS, QUORUM_CHARTS_JS, QUORUM_LOAD, QUORUM_LOAD_DATA, QUORUM_STANDARD_LIBRARY } from "../util/versionNumbers.js";


interface AccessChartOptions {
  id: string;
}

export class AccessChart {
  private uniqueID: string;
  private loader: HTMLDivElement;
  private header: Header;
  private option_row_1: HTMLDivElement;
  private option_row_2: HTMLDivElement;
  private fileButton: Button;
  private chartTitle: TextInputField;
  private chartType: Dropdown<ChartTypes>;
  private color: Dropdown<ColorPalette>;
  private factor1: Dropdown;
  private factor2: Dropdown;
  private interval: NumberInputField;
  private valueX: Dropdown;
  private valueY: Dropdown;
  private quorumUiContainer: HTMLDivElement;
  private saveImageButton: Button;
  private checkboxes: CheckboxGroup<ChartOptions>;
  private legendDropdown: Dropdown<LegendTypes>;
  private modal: CsvSettings | undefined;
  private plusButton: Button | undefined;
  private minusButton: Button | undefined;
  private fileInput: HTMLInputElement;
  private file: File | undefined;
  private fileReader: FileReader = new FileReader();
  private csvData: string | undefined;
  private resizeBar: HTMLDivElement;
  private quorumControls: quorumChart;

  constructor(options: AccessChartOptions) {
    const { id } = options;
    this.uniqueID = id;
    this.loader = document.getElementById(id) as HTMLDivElement;
    this.quorumControls = new quorumChart();
    this.quorumControls.uniqueId = id;

    this.setLoaderStyles();
    this.header = this.createHeader();
    this.fileButton = this.createFileButton();
    this.fileInput = this.createFileInput();
    this.addSettingsButtonClickListener();
    this.header.settingsButton.getElement().ariaLabel = 'Open CSV Settings';

    const { row_1, row_2 } = this.createOptionsRows();
    this.option_row_1 = row_1;
    this.option_row_2 = row_2;

    this.chartTitle = this.createChartTitleTextField();
    this.chartType = this.createChartTypeDropdown();
    this.valueX = this.createValueXDropdown();
    this.valueY = this.createValueYDropdown();
    this.interval = this.createIntervalNumberField();
    this.factor1 = this.createFactor1Dropdown();
    this.factor2 = this.createFactor2Dropdown();
    this.color = this.createColorDropdown();
    this.resizeBar = this.createResizeBar();
    this.saveImageButton = this.createSaveButtonElement();
    this.createFactorButtons();

    this.checkboxes = this.createCheckboxes()
    this.legendDropdown = this.createLegendDropdown();

    this.quorumUiContainer = this.createGraphicContainerAndRenderComponents();
    this.quorumControls.graphicContainer = this.quorumUiContainer;


    this.initializeResizeBarListeners();
    this.initializeKeyboardResizeListeners();
    this.initializeResizeBarFocusStyles();

    this.createSettingsModal();
    this.addChartTypeOnChangeListener();

  }

  @loggedMethod
  setLoaderStyles() {
    updateElement(this.loader, {
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '16px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        rowGap: '16px',
        marginTop: '4%',
        marginBottom: '4%',
        borderRadius: '8px',
        minWidth: '300px',
        backgroundColor: UiKitColors.quorum.blue._10,
        width: '100%',
      }
    });
  }

  @loggedMethod
  createHeader() {
    this.header = new Header({ theme: 'light', title: 'AccessCharts', uniqueId: this.uniqueID });
    this.header.container.style.display = 'grid';
    this.header.settingsButton.disabled = true;
    this.header.container.style.width = 'initial';
    this.header.rightSettings.style.gap = '16px';
    this.header.rightSettings.style.width = 'inherit';
    this.header.container.style.borderRadius = '8px 8px 0 0';
    this.header.render(this.loader);
    return this.header;
  }

  @loggedMethod
  createFileButton() {
    this.fileButton = new Button({ text: 'Add CSV', className: 'btn-small-secondary-var1', uniqueIdPrefix: this.uniqueID, id: 'fileButton' });
    this.header.rightSettings.prepend(this.fileButton.button);
    return this.fileButton;
  }

  @loggedMethod
  createFileInput() {
    this.fileInput = createElement('input', { type: 'file', id: 'fileInput', accept: '.csv' }) as HTMLInputElement;
    this.fileInput.style.display = 'none';
    this.fileInput.onchange = () => this.handleFileUpload();
    this.fileButton.button.onclick = () => this.uploadFile();
    return this.fileInput;
  }

  @loggedMethod
  private uploadFile() {
    this.fileInput.click();
  }

  // @loggedMethod
  addSettingsButtonClickListener() {
    this.header.settingsButton.onClick(() => {
      if (this.modal && this.quorumControls.frame) {
        this.modal.copyFrame = this.quorumControls.frame;
        this.modal.isShowing() ? this.modal.hide() : this.modal.show();
      }
    });
  }

  @loggedMethod
  createOptionsRows() {
    this.option_row_1 = this.createOptionsRow(1);
    this.option_row_2 = this.createOptionsRow(2);
    return { row_1: this.option_row_1, row_2: this.option_row_2 }
  }

  @loggedMethod
  createChartTitleTextField() {
    this.chartTitle = this.createTextField('chartTitle', 'Chart Title', 'Enter Chart Title');
    this.chartTitle.input.onchange = e => { this.quorumControls.chartTitle = (e.target as HTMLInputElement).value; this.quorumControls.createChart() };
    return this.chartTitle;
  }

  @loggedMethod
  createChartTypeDropdown() {
    this.chartType = new Dropdown<ChartTypes>({ options: Object.values(ChartTypes), uniqueIdPrefix: this.uniqueID, id: 'chartType', label: 'Chart Type' });
    this.formatDropdowns(this.chartType);
    return this.chartType;
  }

  @loggedMethod
  createValueXDropdown() {
    this.valueX = new Dropdown({ options: ['-'], uniqueIdPrefix: this.uniqueID, id: 'valueX', label: 'X Value' });
    this.formatDropdowns(this.valueX);
    return this.valueX;
  }

  @loggedMethod
  createValueYDropdown() {
    this.valueY = new Dropdown({ options: ['-'], uniqueIdPrefix: this.uniqueID, id: 'valueY', label: 'Y Value' });
    this.formatDropdowns(this.valueY);
    return this.valueY;
  }

  @loggedMethod
  createIntervalNumberField() {
    this.interval = this.createNumberField('intervalSize', 'Interval Size', 'Enter Interval Size');
    this.interval.input.onchange = (e) => {
      (this.quorumControls.interval = +(e.target as HTMLInputElement).value),
        this.quorumControls.createChart();
    };
    this.interval.min = 0;
    return this.interval;
  }

  @loggedMethod
  createFactor1Dropdown() {
    this.factor1 = new Dropdown({ options: ['-'], uniqueIdPrefix: this.uniqueID, id: 'factor1', label: 'Factor' });
    this.formatDropdowns(this.factor1);
    return this.factor1;
  }

  @loggedMethod
  createFactor2Dropdown() {
    this.factor2 = new Dropdown({ options: ['-'], uniqueIdPrefix: this.uniqueID, id: 'factor2', label: 'Second Factor' });
    this.factor2.dropdown.style.marginTop = '8px';
    this.formatDropdowns(this.factor2);
    return this.factor2;
  }

  @loggedMethod
  createColorDropdown() {
    this.color = new Dropdown<ColorPalette>({ options: Object.values(ColorPalette), uniqueIdPrefix: this.uniqueID, id: 'color', label: 'Color' });
    this.formatDropdowns(this.color);
    return this.color;
  }

  @loggedMethod
  createResizeBar() {
    this.resizeBar = createElement('div', { className: 'resize-bar' });
    this.resizeBar.style.cursor = 'row-resize';
    this.resizeBar.style.height = '8px';
    this.resizeBar.style.width = '100%';
    this.resizeBar.style.marginTop = '-16px';

    this.resizeBar.role = 'slider'
    this.resizeBar.ariaValueMin = '100';
    this.resizeBar.ariaValueMax = '1000';
    this.resizeBar.ariaLabel = 'Resize chart height';

    this.resizeBar.style.backgroundColor = UiKitColors.quorum.blue._100;
    return this.resizeBar;
  }


  @loggedMethod
  formatDropdowns(dropdown: Dropdown) {
    dropdown.dropdown.style.width = '100%';
    dropdown.dropdown.style.width = '100%';
    if (dropdown.outerContainer && dropdown.label) {
      dropdown.outerContainer.style.maxWidth = '100%';
      dropdown.outerContainer.style.width = '100%';
      dropdown.label.style.whiteSpace = 'nowrap';
      dropdown.label.style.marginLeft = '0';
      dropdown.label.style.fontWeight = 'bold';
    }
  }

  @loggedMethod
  createSaveButtonElement() {
    this.saveImageButton = this.createImageSaveButton();
    this.saveImageButton.getElement().style.alignSelf = 'flex-start';
    this.saveImageButton.getElement().style.marginTop = '24px';
    this.saveImageButton.onClick(() => this.quorumControls.saveImage());
    return this.saveImageButton;
  }

  @loggedMethod
  createFactorButtons() {
    this.plusButton = new Button({ icon: formatSVG(plusIcon, 'icon-neutral__black-size-1')?.outerHTML, className: 'btn-circle-secondary-var1', uniqueIdPrefix: this.uniqueID, id: 'plusButton' });
    this.minusButton = new Button({ icon: formatSVG(minusIcon, 'icon-neutral__black-size-1')?.outerHTML, className: 'btn-circle-secondary-var1', uniqueIdPrefix: this.uniqueID, id: 'minusButton' });
    this.plusButton.button.ariaLabel = 'Add second factor';
    this.plusButton.button.onclick = () => this.addSecondFactor();
    this.minusButton.button.ariaLabel = 'Remove second factor';
    this.minusButton.button.onclick = () => this.removeSecondFactor();
    this.factor1.dropdown.appendChild(this.plusButton.button);
  }

  @loggedMethod
  createLegendDropdown() {
    this.legendDropdown = new Dropdown<LegendTypes>({ options: Object.values(LegendTypes), uniqueIdPrefix: this.uniqueID, id: 'legend', label: 'Legend' });
    this.legendDropdown.dropdown.style.width = '100%';
    this.legendDropdown.dropdown.style.maxWidth = '100%';
    if (this.legendDropdown.outerContainer && this.legendDropdown.label) {
      this.legendDropdown.outerContainer.style.maxWidth = '75%';
      this.legendDropdown.outerContainer.style.width = '75%';
      this.legendDropdown.label.style.whiteSpace = 'nowrap';
      this.legendDropdown.label.style.marginLeft = '0';
      this.legendDropdown.label.style.fontWeight = 'bold';
    }
    return this.legendDropdown;
  }

  @loggedMethod
  createCheckboxes() {
    this.checkboxes = new CheckboxGroup<ChartOptions>({ direction: 'column', uniqueIdPrefix: this.uniqueID, id: 'acOptions', theme: 'light', options: ChartOptionsArray })
    this.checkboxes.hideAll();
    this.checkboxes.getCheckbox('Show Labels').show().order(1);
    this.checkboxes.getCheckbox('Horizontal Layout').show().order(2);
    this.checkboxes.container.style.rowGap = '8px'
    return this.checkboxes;
  }

  @loggedMethod
  createGraphicContainerAndRenderComponents() {
    this.quorumUiContainer = this.createGraphicContainer();
    this.quorumControls.statusPTag = this.createStatusText();

    this.option_row_1.after(this.quorumUiContainer);
    this.quorumUiContainer.after(this.resizeBar);
    this.resizeBar.ariaValueNow = this.quorumUiContainer.offsetHeight.toString();
    this.quorumUiContainer.appendChild(this.quorumControls.statusPTag);
    this.chartTitle.render(this.option_row_1);
    this.chartType.render(this.option_row_1);
    this.factor1.render(this.option_row_1);
    this.valueX.render(this.option_row_1);
    this.color.render(this.option_row_2);
    this.checkboxes.render(this.option_row_2);
    if (this.legendDropdown.outerContainer)
      this.checkboxes.container.prepend(this.legendDropdown.outerContainer);
    this.saveImageButton.render(this.option_row_2);

    return this.quorumUiContainer;
  }

  @loggedMethod
  createStatusText(): HTMLParagraphElement {
    return createElement('p', { addClass: 'typo_text-lgText', innerText: 'Add CSV to load chart', id: 'statusText', uniqueIdPrefix: this.uniqueID, ariaLive: 'polite' });
  }

  @loggedMethod
  addChartTypeOnChangeListener() {
    this.factor1.addOnChangeListener((value) => { this.quorumControls.factor1 = value; this.quorumControls.createChart() });
    this.factor2.addOnChangeListener((value) => { this.quorumControls.factor2 = value; this.quorumControls.createChart() });
    this.valueX.addOnChangeListener((value) => { this.quorumControls.valueX = value; this.quorumControls.createChart() });
    this.valueY.addOnChangeListener((value) => { this.quorumControls.valueY = value; this.quorumControls.createChart() });
    this.color.addOnChangeListener((value) => { this.quorumControls.color = value; this.quorumControls.createChart() });
    this.legendDropdown.addOnChangeListener((value) => { this.quorumControls.legendPos = value; this.quorumControls.createChart() });
    this.chartType.addOnChangeListener((chartValue) => {
      this.handleChartTypeChange()
      this.switchCheckboxVisibility(chartValue)
      this.quorumControls.chartType = chartValue as ChartTypes
    });
    //checkboxes
    this.checkboxes.getCheckbox('Show Labels').onChange((checked) => { this.quorumControls.showLabels = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Horizontal Layout').onChange((checked) => { this.quorumControls.horizontalLayout = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Square of Residuals').onChange((checked) => { this.quorumControls.squareOfResiduals = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Movable Line').onChange((checked) => { this.quorumControls.movableLine = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Show Outliers').onChange((checked) => { this.quorumControls.outliers = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Least Squares Line').onChange((checked) => { this.quorumControls.leastSquaresLine = checked; this.quorumControls.createChart() });
    this.checkboxes.getCheckbox('Intercept Lock').onChange((checked) => { this.quorumControls.interceptLock = checked; this.quorumControls.createChart() });

  }

  @loggedMethod
  private createOptionsRow(rowNumber: string): HTMLDivElement {
    // Create the row
    const row = createElement('div', {
      uniqueIdPrefix: this.uniqueID,
      id: `option_row_${rowNumber}`,
      addClass: 'option-row',
      appendTo: this.loader,
    });

    // Create a function that updates the grid-template-columns property
    const updateGridColumns = (): void => {
      const childElements = Array.from(row.children);

      // Desired item width, adjust as necessary.
      const desiredItemWidth = 125;

      if (childElements.length === 3) {
        if (this.loader.offsetWidth < 450) {
          row.style.gridTemplateColumns = `repeat(1, 1fr)`;
          this.saveImageButton.getElement().style.gridColumn = '2';
        } else if (this.loader.offsetWidth < 600) {
          row.style.gridTemplateColumns = `repeat(2, 1fr)`;
          this.saveImageButton.getElement().style.gridColumn = '2';
        } else {
          row.style.gridTemplateColumns = `repeat(3, 1fr)`;
          this.saveImageButton.getElement().style.gridColumn = '3';
        }
      }
      if (((this.loader.offsetWidth + 125) / desiredItemWidth) > childElements.length) {
        row.style.gridTemplateColumns = `repeat(auto-fit, minmax(${desiredItemWidth}px, 1fr))`;
      } else {
        row.style.gridTemplateColumns = `repeat(1, 1fr)`;
      }

      // Adjust header grid columns
      const childElements2 = Array.from(this.header.container.children);
      if (childElements2.length === 2) {
        if (this.loader.offsetWidth < 550) {
          this.header.container.style.gridTemplateColumns = `repeat(1, 1fr)`;
        } else {
          this.header.container.style.gridTemplateColumns = `repeat(2, 1fr)`;
        }
      }
    };

    // Call the function once to set the initial grid-template-columns property
    updateGridColumns();

    // Update the grid-template-columns property when the window is resized
    window.addEventListener('resize', updateGridColumns);

    // Use a MutationObserver to update the grid-template-columns property when the content changes
    const observer = new MutationObserver(updateGridColumns);
    observer.observe(row, { childList: true, subtree: true });


    // Return the row
    return row;
  }


  @loggedMethod
  private switchCheckboxVisibility(chartType: ChartTypes) {
    //hide all checkboxes
    this.checkboxes.hideAll();

    switch (chartType) {
      case ChartTypes.BarChart:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        this.checkboxes.getCheckbox('Horizontal Layout').show().order(2);
        break;
      case ChartTypes.BoxPlot:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        this.quorumControls.horizontalLayout = true;
        this.checkboxes.getCheckbox('Horizontal Layout').show().order(2).check();
        this.checkboxes.getCheckbox('Show Outliers').show().order(3);
        break;
      case ChartTypes.Histogram:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        this.checkboxes.getCheckbox('Horizontal Layout').show().order(2);
        break;
      case ChartTypes.PieChart:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        break;
      case ChartTypes.ScatterPlot:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        this.checkboxes.getCheckbox('Least Squares Line').show().order(2);
        this.checkboxes.getCheckbox('Movable Line').show().order(3);
        this.checkboxes.getCheckbox('Square of Residuals').show().order(4);
        this.checkboxes.getCheckbox('Intercept Lock').show().order(5);
        this.checkboxes.getCheckbox('Horizontal Layout').show().order(6);
        break;
      case ChartTypes.LineChart:
        this.checkboxes.getCheckbox('Show Labels').show().order(1);
        this.checkboxes.getCheckbox('Horizontal Layout').show().order(2);
        break;
    }
  }

  @loggedMethod
  private createTextField(id: string, label: string, placeholder: string): TextInputField {
    const textField = new TextInputField({ theme: 'light', placeholder: placeholder, uniqueIdPrefix: this.uniqueID, id: id, labelText: label, type: 'text' })
    textField.container.style.maxWidth = '100%'
    textField.container.style.width = '100%'
    textField.input.style.width = 'auto'
    textField.input.style.maxWidth = 'auto'
    if (textField.labelEl) {
      textField.labelEl.style.whiteSpace = 'nowrap'
      textField.labelEl.style.marginLeft = '0'
      textField.labelEl.style.fontWeight = 'bold'
    }
    return textField;
  }
  @loggedMethod
  private createNumberField(id: string, label: string, placeholder: string): NumberInputField {
    const textField = new NumberInputField({ theme: 'light', placeholder: placeholder, uniqueIdPrefix: this.uniqueID, id: id, labelText: label })
    textField.container.style.maxWidth = '100%'
    textField.container.style.width = '100%'
    textField.input.style.width = 'auto'
    textField.input.style.maxWidth = 'auto'
    if (textField.labelEl) {
      textField.labelEl.style.whiteSpace = 'nowrap'
      textField.labelEl.style.marginLeft = '0'
      textField.labelEl.style.fontWeight = 'bold'
    }
    return textField;
  }

  @loggedMethod
  private createGraphicContainer(): HTMLDivElement {
    return createElement('div', {
      uniqueIdPrefix: this.uniqueID,
      id: 'graphicContainer',
      addClass: 'QuorumUIContainer',
    });


  }

  @loggedMethod
  private createImageSaveButton() {
    const saveButton = new Button({ text: 'Save Image', className: 'btn-large-primary-var1', uniqueIdPrefix: this.uniqueID, id: 'saveButton' });
    saveButton.getElement().style.width = '100%';
    return saveButton;
  }

  @loggedMethod
  private addSecondFactor() {
    if (this.factor1.outerContainer)
      this.factor2.render(this.factor1.outerContainer);
    if (this.plusButton)
      this.plusButton.destroy();
    if (this.minusButton)
      this.factor1.dropdown.append(this.minusButton.button);
    this.quorumControls.factor2 = this.factor2.value;
    this.quorumControls.createChart();
  }

  @loggedMethod
  private removeSecondFactor() {

    this.factor2.destroy();
    if (this.minusButton)
      this.minusButton.destroy();
    if (this.plusButton)
      this.factor1.dropdown.append(this.plusButton.button);
    this.quorumControls.factor2 = undefined;
    this.quorumControls.createChart();

  }

  @loggedMethod
  private createSettingsModal() {
    this.modal = new CsvSettings(this.loader, this.uniqueID);
    this.modal.addColumnDataSection('Column Name', '', 'text');
    this.modal.addColumnDataSection('Column Type', '', 'dropdown', ['Number', 'Text', 'Boolean']);
    this.modal.subscribeToSaveEvent((columnOptions: CsvColOptions, randomValue: number, filterValue: string) => {
      this.handleSaveButtonClick(columnOptions, randomValue, filterValue)
    });
    const themeModal = new ThemeSettingsModal({ id: this.uniqueID, comingFrom: this, theme: 'light', uniqueIdPrefix: this.uniqueID });
    //place themeModal.content in the beginning of the this.modal
    this.modal.csvModal.prepend(themeModal.content);


    this.modal.hide();
  }

  @loggedMethod
  private handleSaveButtonClick(columnOptions: CsvColOptions, randomValue: number, filterValue: string) {
    const currentOptions = this.getColumnOptions()
    //log all the differences between the current options and the new options
    if (!currentOptions) return console.error("Current options not initialized");
    if (!this.quorumControls) return console.error("Quorum controls not initialized");
    if (!this.quorumControls.frame) return console.error("Quorum frame not initialized");
    if (!this.quorumControls.OGFrame) return console.error("OG Quorum frame not initialized");
    this.quorumControls.loadFrame();

    for (let i = 0; i < Object.keys(currentOptions).length; i++) {
      const column = this.quorumControls.frame.GetColumn$quorum_integer(i);
      const OGColumn = this.quorumControls.OGFrame.GetColumn$quorum_integer(i);
      /**
       *@description changing the column name
       */
      column.SetHeader$quorum_text(columnOptions[i]['Column Name']);
      OGColumn.SetHeader$quorum_text(columnOptions[i]['Column Name']);
      //update the dropdowns
      this.factor1.updateOption(i + 1, columnOptions[i]['Column Name']);
      this.factor2.updateOption(i + 1, columnOptions[i]['Column Name']);
      this.factor1.rendered
        ? (this.quorumControls.factor1 = this.factor1.value)
        : (this.quorumControls.factor1 = undefined);
      this.factor2.rendered
        ? (this.quorumControls.factor2 = this.factor2.value)
        : (this.quorumControls.factor2 = undefined);

      this.valueX.updateOption(i + 1, columnOptions[i]['Column Name']);
      this.valueY.updateOption(i + 1, columnOptions[i]['Column Name']);
      this.valueX.rendered
        ? (this.quorumControls.valueX = this.valueX.value)
        : (this.quorumControls.valueX = undefined);
      this.valueY.rendered
        ? (this.quorumControls.valueY = this.valueY.value)
        : (this.quorumControls.valueY = undefined);

      /**
       *@description changing the column type
       */
      if (columnOptions[i]['Column Type'] === 'Number') {
        this.quorumControls.convertToNumberColumn(column, i);
      } else if (columnOptions[i]['Column Type'] === 'Text') {
        this.quorumControls.convertToTextColumn(column, i);
      } else if (columnOptions[i]['Column Type'] === 'Boolean') {
        this.quorumControls.convertToBooleanColumn(column, i);
      }
      console.log('done checking column type');
    }

    this.quorumControls.randomValue = randomValue;
    this.quorumControls.filterValue = filterValue;


    this.quorumControls.Stop();
    this.quorumControls.game = undefined;
    setTimeout(() => {
      this.quorumControls.createChart();
    }, 1000);
  }



  @loggedMethod
  private loadDropdownOptions() {
    if (!this.quorumControls) return console.error('Quorum controls not initialized');
    const headers = this.quorumControls.headers;
    //prepend with '-'
    headers.unshift('-');
    this.factor1.setOptions(headers);
    this.factor2.setOptions(headers);
    this.valueX.setOptions(headers);
    this.valueY.setOptions(headers);
    this.quorumControls.statusText = 'Choose a factor or value to load chart';
  }

  @loggedMethod
  private async handleFileUpload() {
    await LoadScript(QUORUM_LOAD);
    await LoadScript(
      QUORUM_STANDARD_LIBRARY
    );
    await LinkCSS(QUORUM_CHARTS_CSS)
    await LoadScript(QUORUM_CHARTS_JS)

    if (!this.fileInput.files) return console.error('No file selected');
    this.file = this.fileInput.files[0];
    this.fileInput.value = '';
    this.fileReader.readAsText(this.file)
    this.fileReader.onload = () => {
      this.quorumControls.frame = undefined;
      this.csvData = this.fileReader.result as string;
      this.quorumControls.statusText = 'Loading data...';
      this.header.settingsButton.disabled = false;
      this.loadQuorumData();
      this.loadDropdownOptions();
    }
  }

  @loggedMethod
  public getColumnOptions(): CsvColOptions | undefined {
    const columnOptions: CsvColOptions = {};
    if (!this.quorumControls || !this.quorumControls.frame) return;
    const length = this.quorumControls.frame.GetHeaders().GetSize();

    for (let i = 0; i < length; i++) {
      const column = this.quorumControls.frame.GetColumn$quorum_integer(i);
      let type: 'Text' | 'Number' | 'not set' = 'not set';

      if (column.IsNumberColumn()) {
        type = 'Number';
      } else if (column.IsTextColumn()) {
        type = 'Text';
      }

      const currentColumnOptions: CsvColOption = {
        "Column Name": this.quorumControls.headers[i],
        "Column Type": type,
      }
      columnOptions[i] = currentColumnOptions;
    }
    return columnOptions;
  }

  @loggedMethod
  private async loadQuorumData() {
    if (!this.csvData) return console.error('No csv data');
    if (!this.modal) return console.error('Modal not initialized');

    this.quorumControls.csvData = this.csvData;
    this.quorumControls.createNewFrame();
    this.quorumControls.loadFrame();


    if (!this.quorumControls.frame) return console.error('No quorum frame');
    this.modal.setQuorumFrame(this.quorumControls.frame);
    const columnOptions = this.getColumnOptions()
    if (!columnOptions) return console.error('No column options');
    this.modal.setColumnOptions(columnOptions);
    const listItems: HTMLLIElement[] = [];
    this.quorumControls.headers.forEach((header) => {
      listItems.push(createElement('li', { innerText: header }));
    })
    this.modal.listAndFilter.setSelectionListItems(listItems);
    this.quorumControls.valueX = this.valueX.value;
    this.quorumControls.valueY = this.valueY.value;
    this.quorumControls.factor1 = this.factor1.value;
    this.quorumControls.factor2 = this.factor2.value;
  }

  @loggedMethod
  private handleChartTypeChange() {
    console.clear();
    const option_row_1 = [this.factor1, this.valueX];
    const option_row_2 = [this.color, this.checkboxes, this.saveImageButton];
    this.chartTitle.render(this.option_row_1);
    this.chartType.render(this.option_row_1);

    const values = {
      factor1: this.factor1.value,
      factor2: this.factor2.value,
      valueX: this.valueX.value,
      valueY: this.valueY.value,
      interval: this.interval.value,
    };

    [
      this.interval,
      this.valueY,
      this.factor1,
      this.plusButton,
      this.minusButton,
      this.factor2,
    ].forEach((el) => {
      if (el) el.destroy();
    });

    switch (this.chartType.value) {
      case ChartTypes.Histogram:
        this.interval.render(this.option_row_1);
        this.valueX.render(this.option_row_1);
        break;
      case ChartTypes.ScatterPlot:
        option_row_1.push(this.valueY);
      // fallthrough
      case ChartTypes.BarChart:
        if (ChartTypes.ScatterPlot !== this.chartType.value) {
          if (this.factor2.rendered) {
            if (this.minusButton)
              this.factor1.dropdown.append(this.minusButton.button);
          } else {
            if (this.plusButton)
              this.factor1.dropdown.append(this.plusButton.button);
          }
        }
      // eslint-disable-next-line no-fallthrough
      case ChartTypes.BoxPlot:
      case ChartTypes.LineChart:
      case ChartTypes.PieChart:
        this.factor1.render(this.option_row_1);
        option_row_1.forEach((option) => option.render(this.option_row_1));
        break;
    }

    for (const key in values) {
      this.quorumControls[key] = this[key].rendered
        ? values[key]
        : key === 'interval'
          ? NaN
          : undefined;
      if (this.quorumControls[key] === undefined)
        this[key].value = '-';
    }

    option_row_2.forEach((option) => option.render(this.option_row_2));

    const updateFlexWrap = () => {
      const row = document.getElementById(this.uniqueID + 'option_row_1');
      const childElements = Array.from(row.children);
      row.style.flexWrap = childElements.length > 4 ? "wrap" : "nowrap";
    };

    updateFlexWrap();
  }

  @loggedMethod
  initializeResizeBarListeners() {
    let startY: number;
    let startHeight: number;

    const onMouseDown = (e: MouseEvent) => {
      startY = e.clientY;
      startHeight = this.quorumUiContainer.offsetHeight;

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      const dy = e.clientY - startY;
      this.quorumUiContainer.style.height = `${startHeight + dy}px`;
      this.resizeBar.ariaValueNow = this.quorumUiContainer.offsetHeight.toString();
    };

    const onMouseUp = () => {
      document.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerup', onMouseUp);
    };

    this.resizeBar.addEventListener('pointerdown', onMouseDown);
  }

  @loggedMethod
  initializeKeyboardResizeListeners() {
    const step = 10; // Define the step size for each key press (in pixels)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.quorumUiContainer.style.height = `${this.quorumUiContainer.offsetHeight - step}px`;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.quorumUiContainer.style.height = `${this.quorumUiContainer.offsetHeight + step}px`;
      }
      this.resizeBar.ariaValueNow = this.quorumUiContainer.offsetHeight.toString();
    };

    this.resizeBar.setAttribute('tabindex', '0'); // Make the resizeBar focusable
    this.resizeBar.addEventListener('keydown', onKeyDown);
  }

  @loggedMethod
  initializeResizeBarFocusStyles() {
    const onFocus = () => {
      this.resizeBar.style.outline = '2px solid rgba(0, 123, 255, 0.5)';
    };

    const onBlur = () => {
      this.resizeBar.style.outline = 'none';
    };

    this.resizeBar.addEventListener('focus', onFocus);
    this.resizeBar.addEventListener('blur', onBlur);
  }

  @loggedMethod
  switchTheme(theme: 'light' | 'dark' | 'high-contrast') {
    this.header.switchTheme(theme);
    //get all dropdowns
    this.factor1.switchTheme(theme);
    this.factor2.switchTheme(theme);
    this.valueX.switchTheme(theme);
    this.valueY.switchTheme(theme);
    this.interval.switchTheme(theme);
    this.color.switchTheme(theme);
    this.checkboxes.switchTheme(theme);
    this.chartType.switchTheme(theme);
    this.chartTitle.switchTheme(theme);
    this.legendDropdown.switchTheme(theme);
    if (theme === 'light') {
      this.loader.style.backgroundColor = UiKitColors.neutral.white;
      this.resizeBar.style.backgroundColor = UiKitColors.quorum.blue._100;
      updateElement(this.saveImageButton.button, { updateClass: 'btn-large-primary-var1' });
      this.header.container.style.borderBottom = 'none';
    } else if (theme === 'dark') {
      this.loader.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.resizeBar.style.backgroundColor = UiKitColors.quorum.blue._50;
      updateElement(this.saveImageButton.button, { updateClass: 'btn-large-accent-var1' });
      this.header.container.style.borderBottom = 'none';
    } else if (theme === 'high-contrast') {
      this.resizeBar.style.backgroundColor = UiKitColors.text.hico.blue;
      updateElement(this.saveImageButton.button, { updateClass: 'btn-large-hico-var1' });
      this.loader.style.backgroundColor = UiKitColors.neutral.black;
      this.header.container.style.borderBottom = '1px solid #fff';
    }
    if (this.modal)
      this.modal.switchTheme(theme);
  }

}

