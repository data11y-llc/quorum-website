import { runCode, stopProgram } from "./runCode.js";
import { updateFont } from "./settingsModal.js";
import { downloadFile, hideDisplay, showHideConsole } from "./sideBar.js";

export function createKeyboardShortcuts(event: KeyboardEvent, preId: string) {
  const IDE = document.getElementById(preId) as HTMLDivElement;
  const textarea = document.getElementById(preId + "IdeInput") as HTMLTextAreaElement;
  const currentFontSize = parseFloat(window.getComputedStyle(textarea, null).getPropertyValue('font-size'));

  const validModifier = event.ctrlKey || event.altKey; // Works for ctrl on Mac or Ctrl on Windows/Linux

  switch (event.key) {
    case "R":
      if (validModifier && event.shiftKey) {
        runCode(preId);
      }
      break;
    case "S":
      if (validModifier && event.shiftKey) {
        stopProgram();
      }
      break;
    case "C":
      if (validModifier && event.shiftKey) {
        showHideConsole(preId);
      }
      break;
    case "X":
      if (validModifier && event.shiftKey) {
        const inputSection = document.getElementById(preId + "inputAndGraphicSection") as HTMLDivElement;
        inputSection.dataset.showingText = inputSection.dataset.showingText === 'true' ? 'false' : 'true';
        hideDisplay(preId);
      }
      break;
    case "G":
      if (validModifier && event.shiftKey) {
        const inputSection = document.getElementById(preId + "inputAndGraphicSection") as HTMLDivElement;
        inputSection.dataset.showingGraphic = inputSection.dataset.showingGraphic === 'true' ? 'false' : 'true';
        hideDisplay(preId);
      }
      break;
    case "E":
      if (validModifier && event.shiftKey) {
        let title = IDE.dataset.title;
        title = title ? title : 'MyCode.quorum';
        downloadFile(textarea.value, title);
      }
      break;
    case "=":
      if (validModifier) {
        event.preventDefault(); // Prevents browser zooming
        const newSize = currentFontSize + 1; // You can change the increment value as you need
        if (newSize <= 100)
          updateFont(preId, newSize);
      }
      break;
    case "-":
      if (validModifier) {
        event.preventDefault(); // Prevents browser zooming
        const newSize = currentFontSize - 1; // You can change the decrement value as you need
        if (newSize >= 10)
          updateFont(preId, newSize);
      }
      break;
    default:
      break;
  }
}

