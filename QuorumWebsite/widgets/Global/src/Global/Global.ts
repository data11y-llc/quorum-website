"use strict";

function LoadScript(url, isModule = false) {
  return new Promise(function(resolve, reject) {
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.type = 'module';
    s.defer = true;

    // Enhanced error handling
    s.onerror = function(event) {
      const detailedMessage = `Failed to load script from URL: ${event.target.src}.`;
      console.error(detailedMessage, event);
      reject(new Error(detailedMessage));
    };

    document.head.appendChild(s);
  });
}

export const VERSION_NUMBER = import.meta.env.VITE_APP_VERSION;
export const FILE_SUFFIX_DEV_PROD = import.meta.env.VITE_APP_FILE_SUFFIX;
export const FILE_SUFFIX = FILE_SUFFIX_DEV_PROD + VERSION_NUMBER;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

LoadScript(`${BASE_URL}/widget-js/CanvasGlobal-${FILE_SUFFIX}.js`, true);

// eslint-disable-next-line no-var , @typescript-eslint/no-unused-vars 
var Module = {
  locateFile: function(path, prefix) {
    if (path.endsWith('.data'))
      return `${BASE_URL}/script/` + path;
    return prefix + path;
  },
};

if (typeof Module !== 'undefined') {
  console.log('Module is defined');
}

