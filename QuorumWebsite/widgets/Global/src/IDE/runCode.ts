import { ideCache } from "./highlight.js";
import { LoadScript } from '../util/helper';
import { getSingleFileOnCanvas } from '../util/canvasApi';
import { MSDE_BASE_URL, MSDE_BASE_URL_KEEP_PROD, QUORUM_LOAD, QUORUM_STANDARD_LIBRARY } from "../util/versionNumbers";


declare global {
  interface Window {
    /**
     * the console output section of the IDE
     * used in the Quorum Standard Library
     **/
    currentIDEOutput_$Global_: string;
  }
}

declare const Stop: () => void;
declare const Start: () => void;


let isRunning = false;
let isThrottled = false;
let lastArgs: [string, boolean, ...string[]] | null = null;

//IDE submit button action
export const runCode = async function(
  preId: string,
  execute = true,
  ...args: string[]

) {
  console.log('running code for preId: ', preId);
  const output = document.getElementById(preId + "consoleSection") as HTMLDivElement;
  const uiContainer = preId + 'QuorumUIContainer';

  if (isThrottled) {
    //If throttled, remember the last arguments and return
    lastArgs = [preId, execute, ...args];
    return;
  }

  if (isRunning) {
    stopProgram();
  }

  isRunning = true;
  isThrottled = true;

  LoadScript(QUORUM_LOAD).then(
    async () => {
      LoadScript(
        QUORUM_STANDARD_LIBRARY
      ).then(async () => {
        const codeInput = ideCache[preId].tabValues[0];

        const pageURL = window.location.href;
        const button = execute ? 0 : 1;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (preId == null) return console.error('preId is null');

        window.currentIDEOutput_$Global_ = output.id || '';

        const xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              const result = this.responseText;
              output.innerHTML = '';
              const head = document.getElementsByTagName('head')[0];
              const run = document.getElementById('Runnable');
              if (run != null) {
                head.removeChild(run);
              }
              if (result.startsWith('<div class=')) {
                output.innerHTML = result;
              } else if (result.startsWith('Failed to connect')) {
                output.innerHTML =
                  'I could not connect to the server at ' + MSDE_BASE_URL;
              } else {
                output.innerHTML = 'Build Successful<br/>';
                if (execute === true) {
                  const script = document.createElement('script');
                  script.id = 'Runnable';
                  script.type = 'text/javascript';
                  const extraResult =
                    `
                var currentUIContainer_$Global_ = '${uiContainer}';
                ` + result;

                  script.innerHTML = extraResult;
                  head.appendChild(script);
                  try {
                    Start();
                  } catch (e: unknown) {
                    if (e instanceof Error) console.dir(e);
                  }
                }
              }
            } else if (xmlhttp.status == 400) {
              output.innerHTML =
                'I could not connect to the server at ' + MSDE_BASE_URL;
            } else {
              output.innerHTML =
                'I could not connect to the server at ' + MSDE_BASE_URL;
            }
          }
        };

        xmlhttp.open('POST', `${MSDE_BASE_URL_KEEP_PROD}/Fastrun.quorum`, true);

        xmlhttp.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );

        //get all dataInterfaceFiles from the input.uniqueIdPrefix id
        let interfaceFiles = (
          document.getElementById(preId) as HTMLInputElement
        ).dataset.interfaceFiles;
        if (interfaceFiles === undefined) {
          interfaceFiles = '';
        }

        if (interfaceFiles !== '') {
          let interfaceFilesArray: string[] = [];
          interfaceFilesArray = [...interfaceFiles.split(',')];
          interfaceFilesArray = interfaceFilesArray.map((file: string) =>
            file.replace(/(\r\n|\n|\r)/gm, '')
          );

          // Map all the extra build files to promises that resolve with the single file data
          const singleFilePromises = interfaceFilesArray.map(
            async (file: string) => {
              return await getSingleFileOnCanvas(file, 'url');
            }
          );

          // Wait for all the promises to resolve
          Promise.all(singleFilePromises)
            .then(async (singleFiles) => {
              const element = document.getElementById(preId);
              if (element)
                element.dataset.interfaceFiles = singleFiles.join(',')

              const urlObjects = singleFiles.map((file) => new URL(file));

              const extraBuildFilesStr = await addBuildFiles(
                urlObjects,
                preId
              );

              xmlhttp.send(
                'code=' +
                encodeURIComponent(codeInput) +
                '&' +
                'pageURL=' +
                encodeURIComponent(pageURL) +
                '&' +
                'ideName=' +
                encodeURIComponent(preId) +
                '&' +
                'build_only=' +
                encodeURIComponent(button) +
                '&' +
                'timezone=' +
                encodeURIComponent(tz) +
                extraBuildFilesStr
              );
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // If there are no interface files, directly send the request
          xmlhttp.send(
            'code=' +
            encodeURIComponent(codeInput) +
            '&' +
            'pageURL=' +
            encodeURIComponent(pageURL) +
            '&' +
            'ideName=' +
            encodeURIComponent(preId) +
            '&' +
            'build_only=' +
            encodeURIComponent(button) +
            '&' +
            'timezone=' +
            encodeURIComponent(tz) +
            (await addBuildFiles(undefined, preId))
          );
        }
      });
    }
  );

  // After a delay, allow runCode to be called again
  setTimeout(() => {
    isThrottled = false;
    // If there were delayed calls to runCode, execute the last one
    if (lastArgs) {
      runCode(...lastArgs);
      //empty array
      lastArgs = null;
    }
  }, 1000); // Adjust delay as needed

};

async function addBuildFiles(
  buildFilesArr: URL[] | undefined,
  preId: string
): Promise<string> {
  if (buildFilesArr !== undefined) {
    let buildFiles = '';
    let counter = 0;
    //builds a list of promises to get the files
    const promises = buildFilesArr.map(async (url: URL) => {
      const response = await fetch(url);
      const text = await response.text();
      return text;
    });
    //waits for all promises to resolve
    const files = await Promise.all(promises);

    files.forEach((file) => {
      buildFiles += `&extraBuildFile${counter}=` + encodeURIComponent(file);
      counter++;
    });
    ideCache[preId].tabValues.forEach((value, index) => {
      if (index !== 0) {
        buildFiles += `&extraBuildFile${counter}=` + encodeURIComponent(value);
        counter++;
      }
    });
    return buildFiles;
  } else {
    let buildFiles = '';
    let counter = 0;
    ideCache[preId].tabValues.forEach((value, index) => {
      if (index !== 0) {
        buildFiles += `&extraBuildFile${counter}=` + encodeURIComponent(value);
        counter++;
      }
    });
    return buildFiles;
  }
}

export const stopProgram = function() {
  if (typeof Stop === 'function') {
    Stop();
    isRunning = false;
  }
};
