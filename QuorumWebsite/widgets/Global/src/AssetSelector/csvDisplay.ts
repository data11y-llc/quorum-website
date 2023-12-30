import { createElement } from "../util/helper";
import { AssetInfo } from "./assetJson";

export class csvDisplay {
  id: string
  csvTableContainer: HTMLDivElement
  csvURL: string
  assetInfo: AssetInfo
  csvText: string

  constructor(csvURL: string, id: string, assetInfo: AssetInfo) {
    this.id = id
    this.csvURL = csvURL
    this.assetInfo = assetInfo
    this.csvTableContainer = createElement('div', {
      id: this.id + '-csv-table-container',
      addStyle: {
        width: '100%',
        padding: '0',
        margin: '0',
        fontSize: '12px',
      },
    })

    this.getCSV()
  }

  getElement() {
    return this.csvTableContainer
  }

  getCSV() {
    //get the csv from the url
    fetch(this.csvURL)
      .then(response => response.text())
      .then(data => {
        this.csvText = data
        this.createTable(this.csvText)
      })
  }

  parseCsv(csvText: string): any[] {
    const lines = csvText.split('\n');
    const headers = this.splitCsvLine(lines[0]);
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const row: { [key: string]: string } = {};
      const cells = this.splitCsvLine(lines[i]);
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = cells[j];
      }
      data.push(row);
    }
    return data;
  }

  // Helper function to split a CSV line into cells, considering quoted values
  splitCsvLine(line: string): string[] {
    const cells = [];
    let cell = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const currentChar = line[i];
      if (currentChar === '"') {
        insideQuotes = !insideQuotes;
        continue; // Skip the quote character itself
      }

      if (currentChar === ',' && !insideQuotes) {
        cells.push(cell);
        cell = '';
        continue;
      }

      cell += currentChar;
    }

    // Add the last cell
    cells.push(cell);

    return cells;
  }

  createTable(csvText: string) {
    // Parse the CSV text to a formatted data array
    const formattedData = this.parseCsv(csvText);

    // Get all variable names (keys) from the first object in the array
    const variableNames = Object.keys(formattedData[0]);

    // Create a wrapper div for the table
    const tableWrapper = createElement('div', {
      addClass: 'datacommons-table-wrapper',
      addStyle: {
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        borderRadius: '8px',
      },
      role: 'region',
      ariaLabel: 'Data Table',
    });

    // Create the table element
    const table = createElement('table', {
      uniqueIdPrefix: this.id,
      id: '-csv-table',
      addStyle: {
        borderLeft: '1px solid black',
        borderCollapse: 'collapse',
      },
      addClass: 'datacommons-table',
      role: 'table',

    });

    // Add caption to table
    const caption = table.createCaption();
    caption.textContent = this.assetInfo.description;
    caption.classList.add('visually-hidden');

    // Create the table head and the first row in the table head
    const thead = table.createTHead();
    const headerRow = thead.insertRow();

    // Populate the header row with column headers
    variableNames.forEach((key) => {
      createElement('th', {
        textContent: key,
        addClass: 'datacommons-table-header',
        addStyle: {
          border: '1px solid black',
        },
        appendTo: headerRow,
      });
    });

    // Create the table body
    const tbody = createElement('tbody', {
      uniqueIdPrefix: this.id,
      id: '-csv-table-body',
      appendTo: table,
    })


    // Populate the table body with rows
    formattedData.forEach((dataRow) => {
      const row = createElement('tr', {
        appendTo: tbody,
        addClass: 'datacommons-table-row',
        addStyle: {
          maxHeight: '100px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      });

      // Populate the row with data
      variableNames.forEach((key) => {
        createElement('td', {
          addClass: 'datacommons-table-cell',
          textContent: dataRow[key] !== undefined ? dataRow[key] : '',
          appendTo: row,
          addStyle: {
            border: '1px solid black',
          },
        });
      });
    });

    // Append the table to the wrapper
    tableWrapper.appendChild(table);

    // Clear existing content and append new table
    this.csvTableContainer.innerHTML = '';
    this.csvTableContainer.appendChild(tableWrapper);
  }
}

