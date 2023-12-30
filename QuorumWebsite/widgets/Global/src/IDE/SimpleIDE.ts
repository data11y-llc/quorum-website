import { Theme, TupleToUnion } from "../UiKit/helperTypes";
import { updateElement } from "../util/helper";
import { setTheme } from "./style/style";

export function setSimpleIDE(IDE: HTMLDivElement, preId: string) {
  //hide the left sidebar
  IDE.style.minHeight = '250px';
  const sidebar = document.getElementById(preId + 'sideBar');
  if (sidebar) {
    sidebar.style.display = 'none';
  }

  const codeOutput = document.getElementById(preId + 'codeOutput');
  if (codeOutput) {
    codeOutput.style.width = '100%';
    codeOutput.style.maxWidth = '100%';
    codeOutput.style.borderBottomLeftRadius = '10px';
  }

  const outerConsole = document.getElementById(preId + 'outerConsole');
  if (outerConsole) {
    outerConsole.style.display = 'none';
  }

  const tabBar = document.getElementById(preId + 'tabBar');
  if (tabBar) {
    tabBar.style.display = 'none';
  }

  const consoleResizeHandle = document.getElementById(preId + 'resizeConsoleHandle');
  if (consoleResizeHandle) {
    consoleResizeHandle.style.display = 'none';
  }

  const inputAndTabBar = document.getElementById(preId + 'inputAndTabBar');
  if (inputAndTabBar) {
    inputAndTabBar.style.borderBottomLeftRadius = '10px';
  }

  const QuUiContainerSize = document.getElementById(preId + 'QuUiContainerSize');
  if (QuUiContainerSize) {
    QuUiContainerSize.style.display = 'none';
  }

  const inputAndGraphicSection = document.getElementById(preId + 'inputAndGraphicSection');
  if (inputAndGraphicSection) {
    inputAndGraphicSection.style.borderBottomRightRadius = '10px';
  }

  const runButton = document.getElementById(preId + 'runButton');
  if (runButton) {
    runButton.className = '';
    updateElement(runButton, {
      addClass: 'btn-xsmall-primary-var1',
    });
  }

  const stopButton = document.getElementById(preId + 'stopButton');
  if (stopButton) {
    stopButton.className = '';
    updateElement(stopButton, {
      addClass: 'btn-xsmall-negative-var1',
    });
  }

  const headerSection = document.getElementById(preId + 'headerSection');
  if (headerSection) {
    const headerIcon = document.getElementById(preId + 'headerIcon');
    if (headerIcon)
      headerIcon.style.display = 'none';
    const headerTitle = document.getElementById(preId + 'headerTitle');
    if (headerTitle)
      headerTitle.style.marginLeft = '25px';
    headerSection.style.padding = '4px';
  }

  const contentSection = document.getElementById(preId + 'contentSection');
  if (contentSection) {
    contentSection.style.maxHeight = '100%';
  }

  const height = IDE.dataset.height
  if (height) {
    IDE.style.height = height;
  }

  const theme = IDE.dataset.ideTheme as TupleToUnion<Theme>;
  const themeCheckbox = document.getElementById(`${preId}${theme}Theme`) as HTMLInputElement;
  themeCheckbox.checked = true;
  setTheme(theme, preId);
}
