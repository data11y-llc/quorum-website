import { Button } from "../UiKit/atoms/buttons/buttons";
import { SelectedList } from "../UiKit/atoms/selectionList/selectionList";
import { Dropdown } from "../UiKit/molecules/dropdown/dropdown";
import { createElement } from "../util/helper";
import { DCSelectedValues } from "./DataCommons";
import { TableAndChart } from "./TableAndChart";

export class ChooseDateContainer {
  csvVariableButtonContainer: HTMLDivElement;
  variableDateFormat: "YYYY" | "YYYY-MM" | "YYYY-MM-DD";
  dateInputContainer: HTMLElement;
  tableAndChart: TableAndChart;
  id: string;
  variableName: string;
  formattedData: object[];
  addToCsvButton: Button;

  yearDropdown: Dropdown;
  monthDropdown: Dropdown;
  dayDropdown: Dropdown;
  variableSelectionList: SelectedList;
  dcid: string;

  dates: { [key: string]: { [key: string]: string[] } } = {};
  uniqueVariablesSet: Set<string>;

  constructor(id: string, csvVariableButtonContainer: HTMLDivElement, variableDateFormat: "YYYY" | "YYYY-MM" | "YYYY-MM-DD", variableName: string, formattedData: object[], tableAndChart: TableAndChart, dcid: string) {
    this.csvVariableButtonContainer = csvVariableButtonContainer;
    this.variableDateFormat = variableDateFormat;
    this.tableAndChart = tableAndChart;
    this.id = id;
    this.variableName = variableName;
    this.formattedData = formattedData;
    this.dcid = dcid;

    // Create select elements for year, month, and day
    this.variableDateFormat = this.getYearFormat(formattedData);
    this.yearDropdown = new Dropdown({ id: 'start-year', label: 'Year', options: ['-'], uniqueIdPrefix: this.id });
    this.monthDropdown = new Dropdown({ id: 'start-month', label: 'Month', options: ['-'], uniqueIdPrefix: this.id });
    this.dayDropdown = new Dropdown({ id: 'start-day', label: 'Day', options: ['-'], uniqueIdPrefix: this.id });
    this.variableSelectionList = SelectionListSingleton.getInstance('variable-selection-list').getSelectionList();
    this.variableSelectionList.multipleSelect();

    this.uniqueVariablesSet = new Set<string>(); // initialize the Set in the constructor

    this.createAddToCSVFilterButton(variableName);
  }

  createAddToCSVFilterButton(variableName: string) {
    const variableSelectionListReference = this.variableSelectionList.outerContainer;
    //clear the container
    this.csvVariableButtonContainer.innerHTML = '';
    // Create a new heading element
    const heading = createElement('h3', { addClass: 'dc-csv-variable-heading', textContent: "Custom Data Set Variable" });
    //add csv edit container that has flex row
    const csvEditContainer = createElement('div', { addClass: 'dc-csv-edit-container' });

    // Iterate through each row in the formatted data
    this.formattedData.forEach((currentDataRow: any) => {
      // Split the date string into components
      const [year, month, day] = currentDataRow.date.split('-');

      // Check if the year exists in the dates object, if not, initialize it
      if (!this.dates[year])
        this.dates[year] = {};

      // If a month exists, check if it exists in the specific year object, if not, initialize it
      if (month && !this.dates[year][month])
        this.dates[year][month] = [];

      // If a day exists, add it to the specific year and month array
      if (day)
        this.dates[year][month].push(day);
    });

    // Add years as options to yearSelect
    Object.keys(this.dates).forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.text = year;
      this.yearDropdown.addOption(year);
    });

    // Add event listeners to update month and day options when selected year/month changes
    this.yearDropdown.addOnChangeListener(() => {
      if (this.yearDropdown.value === '-') {
        this.addToCsvButton.disabled = true;
      } else {
        this.addToCsvButton.disabled = false;
      }
      this.updateMonthAndDayOptions();
    });

    this.monthDropdown.addOnChangeListener(() => {
      this.updateDayOptions()
    });

    this.dateInputContainer = createElement('div', {
      addClass: 'dc-date-input-container',
      appendTo: csvEditContainer,
    });

    switch (this.variableDateFormat) {
      case "YYYY-MM-DD":
        this.setDropdownProperties(this.yearDropdown, this.dateInputContainer, '30%', () => { this.updateMonthAndDayOptions() });
        this.setDropdownProperties(this.monthDropdown, this.dateInputContainer, '30%', () => { this.updateMonthAndDayOptions() });
        this.setDropdownProperties(this.dayDropdown, this.dateInputContainer, '30%');
        this.updateMonthAndDayOptions();
        break;
      case "YYYY-MM":
        this.setDropdownProperties(this.yearDropdown, this.dateInputContainer, '40%', () => { this.updateMonthAndDayOptions() });
        this.setDropdownProperties(this.monthDropdown, this.dateInputContainer, '40%');
        this.updateMonthAndDayOptions();
        break;
      case "YYYY":
        this.setDropdownProperties(this.yearDropdown, this.dateInputContainer, '50%');
        break;
    }

    // Add event listener to end year input field
    const buttonText = 'Add to CSV';

    // Create a new button element
    this.addToCsvButton = new Button({ text: buttonText, title: buttonText, className: "btn-xsmall-primary-var1", uniqueIdPrefix: this.id, id: `add-to-csv-${variableName}` })
    this.addToCsvButton.disabled = true;

    const csvButtonsContainer = createElement('div', {
      addClass: 'dc-csv-buttons-container',
      appendTo: csvEditContainer,
    });

    csvButtonsContainer.appendChild(this.addToCsvButton.getElement());


    // Add an event listener to the button that opens a modal when clicked
    this.addToCsvButton.onClick(() => {
      let dateValue;
      switch (this.variableDateFormat) {
        case "YYYY-MM-DD":
          dateValue = `${this.yearDropdown.value}-${this.monthDropdown.value}-${this.dayDropdown.value}`;
          break;
        case "YYYY-MM":
          dateValue = `${this.yearDropdown.value}-${this.monthDropdown.value}`;
          break;
        case "YYYY":
          dateValue = `${this.yearDropdown.value}`;
          break;
      }

      this.addToCsvButton.getElement().textContent = 'Add to CSV'
      this.addToCsvButton.getElement().title = 'Add to CSV'
      //if remove button doesnt exist, create it
      //create a list item from the variableName and dateValue

      const uniqueVariableKey = `${variableName}-${dateValue}`;
      if (!this.uniqueVariablesSet.has(uniqueVariableKey)) { // only if the variableName-date pair is not in the set, add it
        this.uniqueVariablesSet.add(uniqueVariableKey);

        const listItem = createElement('li', {
          addDataset: {
            variableName: variableName,
            date: dateValue,
            dcid: this.dcid,
          },
          addStyle: {
            height: 'fit-content',
          },
          textContent: `${variableName}: ${dateValue}`,
        });

        const slAmount = this.variableSelectionList.selectionListItems.length;

        this.variableSelectionList.addItem(listItem, slAmount);
      } else {
        console.log('Duplicate variableName-date pair is not allowed.');
      }
    });

    // Add the heading and button to the container
    // Add the heading, button and list to the container
    this.csvVariableButtonContainer.appendChild(heading);
    this.csvVariableButtonContainer.appendChild(csvEditContainer);
    this.csvVariableButtonContainer.appendChild(variableSelectionListReference);

    const removeVariableButton = new Button({ text: 'Remove', title: 'Remove', className: "btn-xsmall-negative-var1", uniqueIdPrefix: this.id, id: `remove-from-csv-${variableName}` })
    //create CSV Button in the header
    const saveData = new Button({
      id: 'createCSVButton',
      uniqueIdPrefix: this.id,
      text: 'Create CSV',
      className: 'btn-xsmall-primary-var1',
    });
    saveData.onClick(() => {
      //get the buttons in the variableButtons container
      const selectionList = document.getElementById('singletonvariable-selection-list_container');
      if (!selectionList) return;
      const buttons = selectionList.getElementsByTagName('li');
      //create an object of the selected variables and put in the dcid, vairableName, and yearRange
      const selectedVariables: DCSelectedValues[] = [];
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const dcid = button.getAttribute('data-dcid');
        const variableName = button.getAttribute('data-variable-name');
        const date = button.getAttribute('data-date');

        const selectedVariable: DCSelectedValues = {
          url: ``,
          dcid: dcid as string,
          variableName: variableName as string,
          date: date as string,
          series: [],
        };
        selectedVariables.push(selectedVariable);
      }

      this.tableAndChart.makeDownloadableCSV(selectedVariables);
    });

    // Inside your createAddToCSVFilterButton function

    removeVariableButton.onClick(() => {
      // Make a copy of the array and filter out the selected items
      const selectedItems = [...this.variableSelectionList.selectionListItems].filter(item => item.getAttribute('aria-selected') === 'true');

      // Iterate over the selected items and remove them from the actual array
      selectedItems.forEach(item => {
        const variableName = item.getAttribute('data-variable-name');
        const date = item.getAttribute('data-date');
        const uniqueVariableKey = `${variableName}-${date}`;

        this.uniqueVariablesSet.delete(uniqueVariableKey); // remove the variableName-date pair from the set when it is removed from the list

        this.variableSelectionList.removeItem(item);
      });

      this.tableAndChart.removeVariableCallback(variableName);
    });

    saveData.getElement().style.alignSelf = 'flex-end';
    removeVariableButton.getElement().style.alignSelf = 'flex-end';

    // Append the removeVariableButton after variableSelectionList

    const buttonDiv = createElement('div', {
      addStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        width: 'inherit',
        marginTop: '8px',
        columnGap: '8px',
      },
      appendTo: this.csvVariableButtonContainer
    });

    buttonDiv.appendChild(removeVariableButton.getElement());
    buttonDiv.appendChild(saveData.getElement());
  }

  updateMonthAndDayOptions() {
    // Preserve selected month and day if exist
    const selectedMonth = this.monthDropdown.value;

    // Clear current month and day options
    this.monthDropdown.setOptions(['-']);
    this.dayDropdown.setOptions(['-']);

    // Get selected year
    const selectedYear = this.yearDropdown.value;

    if (this.yearDropdown.value !== '-') {
      const months = Object.keys(this.dates[selectedYear]).sort();
      // Add months for selected year
      months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.text = month;
        this.monthDropdown.addOption(month);
      });

      // Select the previous month if it exists in the new year, otherwise select the first month
      if (months.includes(selectedMonth)) {
        this.monthDropdown.value = selectedMonth;
      } else {
        this.monthDropdown.value = months[0];
      }

      this.addToCsvButton.disabled = false;
    }

    // Update day options based on selected month
    if (this.variableDateFormat === 'YYYY-MM-DD') {
      this.updateDayOptions();
    }
  }

  updateDayOptions() {
    // Preserve selected day if exists
    const selectedDay = this.dayDropdown.value;

    // Clear current day options
    this.dayDropdown.setOptions(['-']);

    // Get selected year and month
    const selectedYear = this.yearDropdown.value;
    const selectedMonth = this.monthDropdown.value;

    // Add days for selected month
    if (selectedYear !== '-' && selectedMonth !== '-') {
      const days = this.dates[selectedYear][selectedMonth].sort();
      days.forEach(day => {
        const option = document.createElement('option');
        option.value = day;
        option.text = day;
        this.dayDropdown.addOption(day);
      });

      // Select the previous day if it exists in the new month, otherwise select the first day
      if (days.includes(selectedDay)) {
        this.dayDropdown.value = selectedDay;
      } else {
        this.dayDropdown.value = days[0];
      }
      this.addToCsvButton.disabled = false;
    }
  }

  // The function takes in the dropdown, the container and the width to be set.
  setDropdownProperties(dropdown: any, container: any, width: string, onChange?: () => void) {
    dropdown.render(container);
    dropdown.outerContainer.style.width = width;
    dropdown.dropdown.style.width = '100%';
    dropdown.selected.style.width = '100%';
    if (onChange)
      dropdown.addOnChangeListener(onChange);
  }

  getYearFormat(formattedData: object[]): "YYYY" | "YYYY-MM" | "YYYY-MM-DD" {
    // Check if formattedData is an array and if it's not empty
    if (Array.isArray(formattedData) && formattedData.length > 0) {
      // Check if date property exists and is a string
      const year = formattedData[0].date;
      if (year && typeof year === 'string') {
        // Check if year is in YYYY-MM-DD format
        if (year.length === 10) {
          return "YYYY-MM-DD";
        }
        // Check if year is in YYYY-MM format
        else if (year.length === 7) {
          return "YYYY-MM";
        }
        // Check if year is in YYYY format
        else if (year.length === 4) {
          return "YYYY";
        }
      }
    }
    return "YYYY";
  }
}


class SelectionListSingleton {
  private static instance: SelectionListSingleton;
  private selectionList: SelectedList;

  private constructor(id: string) {
    this.selectionList = new SelectedList({ id, uniqueIdPrefix: 'singleton', theme: 'light', options: [] });
    this.selectionList.outerContainer.style.width = '95%';
    this.selectionList.outerContainer.style.height = 'fit-content';
  }

  public static getInstance(id: string): SelectionListSingleton {
    if (!SelectionListSingleton.instance) {
      SelectionListSingleton.instance = new SelectionListSingleton(id);
    }
    return SelectionListSingleton.instance;
  }

  public getSelectionList(): SelectedList {
    return this.selectionList;
  }
}

export default SelectionListSingleton;

