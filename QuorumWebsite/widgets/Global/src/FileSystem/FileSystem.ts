function addFile() {
  var rowNumber = (document.getElementById("fileSystem") as HTMLTableElement).rows.length;

  var row = document.createElement("tr");
  row.id = "row" + rowNumber;
  var cell = document.createElement("td");
  cell.id = "cell" + rowNumber;

  var deleteFileButton = document.createElement("button");
  deleteFileButton.innerHTML = "Delete File";
  deleteFileButton.id = "deleteFile" + rowNumber;
  deleteFileButton.addEventListener("click", deleteFile);


  var fileUploadButton = document.createElement("input");
  fileUploadButton.type = "file";
  fileUploadButton.id = "fileUploadButton" + rowNumber;


  fileUploadButton.addEventListener("change", fileUpload);

  //add the buttons to the cell
  cell.appendChild(deleteFileButton);
  cell.appendChild(fileUploadButton);

  //add the cell to the row
  row.appendChild(cell);

  //add the row to the table
  var table = document.getElementById("fileSystem");
  table?.appendChild(row);

  //add the table to the body
  //find id with CanvasFileSystem
  var canvasFileSystem = document.getElementById("CanvasFileSystem");
  canvasFileSystem?.appendChild(table as Node);

  //add event listeners to the buttons
  deleteFileButton.addEventListener("click", deleteFile);
}

function fileUpload(this: HTMLInputElement) {
  //when the file loads get the file name and contents
  console.log(this.files);
  if (this) {
    var file = this.files?.item(0);
    if (file) {
      var that = this;
      var fileName = file.name;
      //get the contents of the file
      var reader = new FileReader();
      reader.onload = function(e: Event) {
        var target = e.target as FileReader;
        var fileContents = target.result;
        //create a div with class "data-file"
        //add attribute "data-file"
        var div = document.createElement("div");
        div.id = fileName;
        div.className = "data-file";
        div.setAttribute("data-value", fileContents as string);
        //get the last char of the id
        var lastChar = that.id.charAt(that.id.length - 1);
        //get the row with the id "row" + lastChar
        var cell = document.getElementById("cell" + lastChar);
        if (cell) {
          //add the div to the row
          //add a Q at the end of the filename before the extension
          div.setAttribute("data-label", '');
          cell.appendChild(div);
        }
      }
      reader.readAsText(file);
    }
  }
}


function deleteFile(this: Element) {
  //get the last char of the this.id
  var lastChar = this.id.charAt(this.id.length - 1);
  //get the row with the id "row" + lastChar
  var row = document.getElementById("row" + lastChar);
  if (row) {
    //remove the row
    row.parentNode?.removeChild(row);
  }
}

function start() {
  //create a table to hold the file system
  var canvasFileSystem = document.getElementById("CanvasFileSystem");
  if (canvasFileSystem) {
    var table = document.createElement("table");
    table.id = "fileSystem";

    document.body.appendChild(table);

    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var addFileButton = document.createElement("button");
    //set the text of the buttons
    addFileButton.innerHTML = "Add File";
    cell.appendChild(addFileButton);
    row.appendChild(cell);
    table.appendChild(row);
    canvasFileSystem.appendChild(table);
    //add event listeners to the buttons
    addFileButton.addEventListener("click", addFile);
  }
}
start();
