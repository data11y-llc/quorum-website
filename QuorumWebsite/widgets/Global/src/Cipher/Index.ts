import { CSS } from './Styles.js';
import { updateAll, updateLetterInnerHTML } from './UpdateAll.js';
import { topSection, quorumChartContainer, createLetterRows, sortButtons, ariaLiveElement, header } from './Elements.js';
import { globalKeyboardEvents } from './Accessibility.js';
import { LOADER } from './Globals.js';

(function StartCipher() {
  // eslint-disable-next-line no-var
  var Module = {
    locateFile: function(path, prefix) {
      if (path.endsWith('.data'))
        return 'https://data11y.com/script/' + path;
      return prefix + path;
    },
  };

  const cipherLoader = document.getElementById(LOADER) as HTMLDivElement;
  if (!cipherLoader) return console.log('loader html not added correctly');
  cipherLoader.tabIndex = 0;
  cipherLoader.ariaLabel = 'Access Cipher Widget';
  cipherLoader.style.boxSizing = 'border-box';

  globalKeyboardEvents(cipherLoader);

  Object.assign(cipherLoader.style, CSS.containerStyles.cipherLoader);

  cipherLoader.append(
    header(LOADER),
    topSection(),
    quorumChartContainer(),
    createLetterRows(),
    sortButtons(),
    ariaLiveElement()
  );

  updateLetterInnerHTML();
})();

window.onload = async () => await updateAll();

