import {
  FILE_SUFFIX,
  MSDE_BASE_URL,
  QUORUM_CHARTS_CSS,
  QUORUM_CHARTS_JS,
  QUORUM_LOAD,
  QUORUM_PRISM,
} from '../util/versionNumbers';
import { LoadScript, LinkCSS } from '../util/helper';

export { };

const LOADER = 'data11y-loader';
const CHART_ELEMENT = 'data11y-chart';
const LOAD_FILE = 'data-file';
const CODE_ELEMENT = 'data11y-code';
const CODE_BLOCK_ELEMENT = 'data-code-block';
const LOAD_CHARTS = 'data-chart';
const LOAD_CODE = 'data-code';
const LOAD_SVG = 'data-svg';
const LOAD_CODE_BLOCK = 'data-code-block';
const CONTENT_CODE = 'data-content';
const LOAD_INTERFACE_FILES = 'data-interface-files';
const LOAD_PROGRAM_FILES = 'data-js';
let isLoadCharts = false;
let isLoadCode = false;
let isLoadSVG = false;
let isLoadFile = false;
let isLoadCodeBlock = false;
let isLoadProgram = false;
let isLoadInterfaceFiles = false;
let contentCode = '';

setTimeout(function() {
  let link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.gstatic.com';
  document.head.appendChild(link);
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
  document.head.appendChild(link);
}, 1000);

async function LoadCanvasScripts(fileNames: string[]) {
  //create an array that holds the promises
  const promises = [];
  for (let i = 0; i < fileNames.length; i++) {
    const promise = await getSingleFileOnCanvas(fileNames[i]);
    promises.push(promise);
  }
  Promise.all(promises).then(function(values) {
    for (let i = 0; i < values.length; i++) {
      const script = document.createElement('script');
      script.src = values[i] as string;
      const fileName = fileNames[i];
      script.id = fileName.substring(fileName.lastIndexOf('/') + 1);
      document.head.appendChild(script);
    }
  });
}

function CheckDependencies() {
  const loader = document.getElementById(LOADER);
  if (loader != null) {
    let result = loader.getAttribute(LOAD_CODE);
    if (result != null && result == 'true') {
      isLoadCode = true;
    }
    result = loader.getAttribute(LOAD_CHARTS);
    if (result != null && result == 'true') {
      isLoadCharts = true;
    }
    result = loader.getAttribute(LOAD_SVG);
    if (result != null && result == 'true') {
      isLoadSVG = true;
    }
    result = loader.getAttribute(LOAD_FILE);
    if (result != null && result == 'true') {
      isLoadFile = true;
    }
    result = loader.getAttribute(LOAD_CODE_BLOCK);
    if (result != null && result == 'true') {
      isLoadCodeBlock = true;
    }
    result = loader.getAttribute(LOAD_INTERFACE_FILES);
    if (result != null && result == 'true') {
      isLoadInterfaceFiles = true;
    }
    result = loader.getAttribute(LOAD_PROGRAM_FILES);
    if (result != null && result == 'true') {
      isLoadProgram = true;
    }
  }
}
/*
    My hunch here is that the promise needs to be chained, with the final
    loading happening only after each chained dynamic load. It may not be necessary though.
*/
async function LoadDependencies() {
  // Check dependencies.
  CheckDependencies();

  // Get the version and course number.
  const widgetJsUrl = MSDE_BASE_URL + '/widget-js/';
  const widgetCssUrl = MSDE_BASE_URL + '/widget-css/';

  // Create an array to store the promises for the scripts and CSS that are being loaded.
  const promises: Promise<HTMLScriptElement | HTMLLinkElement>[] = [];

  // // Load the main CSS file.
  promises.push(LinkCSS(`${widgetCssUrl}main-${FILE_SUFFIX}.css`));
  // promises.push(LoadScript(QUORUM_LOAD));
  promises.push(LoadScript(QUORUM_CHARTS_JS));
  promises.push(LinkCSS(QUORUM_CHARTS_CSS));

  console.log('Loaded main CSS file.');

  // Paint the code blocks from red to black
  paintItBlack();
  LoadPrism();

  const tempUrl = 'https://msde-curriculum.msde.maryland.gov/widget-js/';

  // Get a list of all the scripts that need to be loaded.
  const scripts = [
    {
      className: 'data11y-code',
      url: QUORUM_LOAD,
    },
    {
      className: 'data11y-access-chart',
      url: `${tempUrl}AccessCharts-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-flippydo',
      url: `${widgetJsUrl}FlippyDo-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-pixel-widget',
      url: `${widgetJsUrl}PixelWidget-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-visualize-rgb-space',
      url: `${widgetJsUrl}VisualizeRGBSpace-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-cipher',
      url: `${widgetJsUrl}Cipher-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-color-average',
      url: `${widgetJsUrl}ColorAverage-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-code',
      url: `${widgetJsUrl}IDE-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-asset-getter',
      url: `${widgetJsUrl}AssetSelector-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-lossless',
      url: `${widgetJsUrl}Lossless-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-data-commons',
      url: `${widgetJsUrl}DataCommons-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-tsp',
      url: `${widgetJsUrl}TSPSolver-${FILE_SUFFIX}.js`,
    },
    {
      className: 'data11y-able-player',
      url: `${widgetJsUrl}AblePlayer-${FILE_SUFFIX}.js`,
    },
  ];

  // For each script, load it and add the promise to the array of promises.
  for (const script of scripts) {
    if (document.querySelectorAll(`.${script.className}`).length > 0) {
      if (script.url === QUORUM_LOAD) {
        console.log(QUORUM_LOAD);
        // LoadScript(QUORUM_LOAD);
      } else {
        promises.push(LoadScript(script.url, true));
      }
    }
  }

  // Wait for all of the promises to resolve before calling the DynamicLoad function.
  await Promise.all(promises);
  DynamicLoad();
}

window.onload = () => {
  let clearCheck = false;
  setTimeout(() => {
    const interval = setInterval(() => {
      const isEdit = window.location.href.split('/').pop() === 'edit';
      const isModules = window.location.href.split('/').pop() === 'modules';
      const isFiles = window.location.href.split('/').pop() === 'files';
      const isGrades = window.location.href.split('/').pop() === 'gradebook';
      const isAssignmentsPage = window.location.href.split('/').pop() === 'assignments';

      if (isEdit || isModules || isFiles || isGrades || isAssignmentsPage) {
        console.log('not loaded');
        clearInterval(interval);
        return;
      }

      const breadcrumb = document.getElementById('breadcrumbs');

      if (
        breadcrumb && breadcrumb.textContent && (
          breadcrumb.textContent.includes('Assignments') ||
          breadcrumb.textContent.includes('Pages') ||
          breadcrumb.textContent.includes('Quizzes') ||
          breadcrumb.textContent.includes('Discussions')
        )
      ) {
        LoadDependencies();
        clearInterval(interval);
        console.log('loaded');
      } else {
        console.log('not loaded wwwww');
      }
      if (clearCheck) {
        clearInterval(interval);
      }
    }, 100);
    // After 5 seconds, if no 'page-title' element is found, clear the interval.
    setTimeout(() => {
      console.log('clearing interval');
      clearCheck = true;
    }, 5000);
  }, 1000);

  if (/iPhone|iPad|iPod/.test(navigator.platform)) {
    if (!navigator.standalone && !window.navigator.userAgent.includes('Safari')) {
      console.log('This is likely a WebView');
      LoadDependencies();
    } else {
      console.log('Not a WebView, likely Safari');
      LoadDependencies();
    }
  } else if (/Android/.test(navigator.userAgent)) {
    if (!window.navigator.userAgent.includes('Chrome')) {
      console.log('This is likely a WebView');
      LoadDependencies();
    } else {
      console.log('Not a WebView, likely Chrome');
      LoadDependencies();
    }
  } else {
    console.log('Not iOS or Android');
  }
};

const canvasFiles = {};

function paintItBlack() {
  const codeElement = document.getElementsByTagName('code');
  const codeElementToChange = Array.from(codeElement).filter(
    (element) =>
      element.classList.contains('language-quorum') &&
      !element.classList.contains('paintItBlack')
  );
  for (let i = 0; i < codeElementToChange.length; i++) {
    codeElementToChange[i].classList.add('paintItBlack');
  }
}
async function filterFiles(response) {
  let search_term = response.url.split('search_term=')[1];
  //if search_term contains %20 replace with space
  search_term = search_term.replace(/%20/g, ' ');
  const json = await response.json();
  if (json.length === 0) {
    return { id: null, name: null };
  }
  const file = json.filter(function(file) {
    return file.display_name === search_term;
  });
  if (file.length === 0) {
    return { id: undefined, name: undefined };
  }
  return { id: file[0].id, name: file[0].display_name };
}
function getCanvasFiles() {
  return new Promise(function(resolve, reject) {
    const id = getCurrentCourseNumber();
    const widgets = [];
    let i = 0;
    if (isLoadCode) {
      const code_widgets = document.getElementsByClassName(CODE_ELEMENT);
      for (i = 0; i < code_widgets.length; i++) {
        if (code_widgets[i].getAttribute(CONTENT_CODE) !== null) {
          widgets.push(code_widgets[i]);
        }
      }
    }

    if (isLoadCodeBlock) {
      const codeBlock_widgets =
        document.getElementsByClassName(LOAD_CODE_BLOCK);
      for (i = 0; i < codeBlock_widgets.length; i++) {
        if (codeBlock_widgets[i].getAttribute(CONTENT_CODE) !== null) {
          widgets.push(codeBlock_widgets[i]);
        }
      }
    }
    const javascriptFiles: string[] = [];
    if (isLoadProgram) {
      const program_widgets =
        document.getElementsByClassName(LOAD_PROGRAM_FILES);
      for (i = 0; i < program_widgets.length; i++) {
        if (
          program_widgets[i] != null &&
          program_widgets[i].getAttribute(CONTENT_CODE) != null
        ) {
          if (
            program_widgets[i].getAttribute(CONTENT_CODE).split(',') != null
          ) {
            //get the program_widgets[i].getAttribute(CONTENT_CODE) and split it by comma remove whitespace
            let files = program_widgets[i]
              .getAttribute(CONTENT_CODE)
              .split(',');
            files = files.map(function(file) {
              return file.trim();
            });
            //look in javascriptFiles and remove any duplicates
            for (let j = 0; j < files.length; j++) {
              if (!javascriptFiles.includes(files[j])) {
                javascriptFiles.push(files[j]);
              }
            }
          }
        }
      }
      LoadCanvasScripts(javascriptFiles);
    }
    let count = 0;
    if (widgets.length == 0) {
      resolve(null);
    }
    for (i = 0; i < widgets.length; i++) {
      //pass in i to the fetch function to get the correct widget
      fetch(
        `https://msde.instructure.com/api/v1/courses/${id}/files?per_page=100&search_term=${widgets[
          i
        ].getAttribute(CONTENT_CODE)}`
      ).then(async function(response) {
        if (response.ok) {
          const { id, name } = await filterFiles(response);
          if (id == undefined) {
            count++;
            if (count == widgets.length) {
              resolve(null);
            }
          }
          fetch(
            `https://msde.instructure.com/api/v1/files/${id}/public_url`
          ).then(async function(res) {
            if (res.ok) {
              const json = await res.json();
              const source = json.public_url;
              canvasFiles[name] = source;
              count += 1;
              if (count === widgets.length) {
                resolve(null);
              }
            } else {
              reject();
            }
          });
        }
      });
    }
  });
}
function loadCodeBlock() {
  const codeBlocks = document.getElementsByClassName(CODE_BLOCK_ELEMENT);
  for (let i = 0; i < codeBlocks.length; i++) {
    const codeBlock = codeBlocks[i];
    const code = codeBlock.getAttribute(CONTENT_CODE);
    if (code != null) {
      const source = canvasFiles[code];
      if (source != undefined) {
        InjectCodeBlock(codeBlock, codeBlock.id, source);
      }
    }
  }
}
async function getSingleFileOnCanvas(name) {
  return new Promise(function(resolve, reject) {
    const id = getCurrentCourseNumber();
    fetch(
      `https://msde.instructure.com/api/v1/courses/${id}/files?per_page=100&search_term=${name}`
    ).then(async function(response) {
      if (response.ok) {
        const { id } = await filterFiles(response);
        if (id == undefined) {
          resolve(name);
          return;
        }
        fetch(
          `https://msde.instructure.com/api/v1/files/${id}/public_url`
        ).then(async function(res) {
          if (res.ok) {
            const json = await res.json();
            resolve(json.public_url);
          } else {
            reject();
          }
        });
      } else {
        resolve(response.url.split('search_term=')[1]);
      }
    });
  });
}
function DynamicLoad() {
  console.log('DynamicLoad Start');
  getCanvasFiles().then(function() {
    console.log('DynamicLoad inner');
    let i = 0;
    let max = 0;
    let result = '';
    const fetchPromises = [];
    if (isLoadSVG) {
      const SVGs = document.getElementsByClassName(LOAD_SVG);
      for (i = 0; i < SVGs.length; i++) {
        const svg = SVGs[i];
        const courseNumber = getCurrentCourseNumber();
        if ((courseNumber === '703' || courseNumber === '546' || courseNumber === '503' || courseNumber === '548')) {
          console.log('fetching svg in LOAD_SVG');
          fetchPromises.push(fetchSVG(svg));
        } else {
          const svgFileName = svg.getAttribute(CONTENT_CODE);
          if (svgFileName != null) {
            const source = canvasFiles[svgFileName];
            if (source != undefined) {
              fetchPromises.push(
                InjectSVG(svg, source, SVGs.length)
                  .then(function(response) {
                    const { finished } = response;
                    if (finished) {
                      console.log('loading svg finished');
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  })
              );
            }
          }
        }
      }
    }
    Promise.all(fetchPromises)
      .then(() => {
        addSVGEventListeners();
      })
      .catch(() => {
        console.log('error fetching svg');
      });

    if (isLoadFile) {
      addQuroumFileInput();
    }
    if (isLoadCodeBlock) {
      loadCodeBlock();
    }
    if (isLoadCharts) {
      const charts = document.getElementsByClassName(CHART_ELEMENT);
      for (i = 0, max = charts.length; i < max; i++) {
        result = charts[i].id;
        const contentID = result;
        result = charts[i].getAttribute(CONTENT_CODE);
        if (result != null) {
          contentCode = result;
        }
        InjectSVG(charts[i], contentID, contentCode);
      }
    }
  }).catch(function(e) {
    console.log(e);
  });
}


function fetchSVG(svgElement) {
  return new Promise((resolve, reject) => {
    let className: 'CSP' | 'DataScience' | '' = '';
    if (getCurrentCourseNumber() === '503' || getCurrentCourseNumber() === '548') {
      className = 'DataScience'
    } else if (getCurrentCourseNumber() === '546') {
      className = 'CSP'
    }
    const baseURL = `${MSDE_BASE_URL}/msde-deploy/${className}/Assets/SVGs/`;
    const source = svgElement.getAttribute(CONTENT_CODE);
    const svgURL = baseURL + source;

    fetch(svgURL)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const scriptTags = svgDoc.querySelectorAll('script');
        svgElement.innerHTML = svgDoc.documentElement.outerHTML;

        if (scriptTags.length) {
          for (const scriptTag of scriptTags) {
            const newScript = document.createElement('script');
            newScript.innerHTML = scriptTag.innerHTML
              .replace(/&amp;/g, '&')
              .replace(/&gt;/g, '>');
            for (const attr of scriptTag.attributes) {
              newScript.setAttribute(attr.name, attr.value);
            }
            document.head.appendChild(newScript);
          }
        }
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}




function replaceWithUrl(code, data, fileInputDiv, keyword) {
  //replace the keyword from code with the url of the file
  const regex = new RegExp(
    `${keyword}\\("([^.]*?)(?=\.)\\.([a-z]*?)(?=")`,
    'g'
  );
  return code.replace(regex, (_, name, ext) => {
    const fileUrl = data.shift();
    //if the id in fileInputDiv is the same as the name of the file, dont replace it
    //used for the file upload for the IDE
    for (let i = 0; i < fileInputDiv.length; i++) {
      if (fileInputDiv[i].id == `${name}.${ext}`) {
        return `${keyword}("${name}.${ext}`;
      }
    }
    //if the fileUrl contains a url
    //if fileUrl start with http, then it is a url
    if (fileUrl.startsWith('http')) {
      return `${keyword}("${fileUrl}&ext=.${ext}`;
    }
    //if the fileUrl is undefined, return the original file name
    return `${keyword}("${name}.${ext}`;
  });
}
function getReplacePromises(code, promises, keyword) {
  //use the keyword to find the files to replace
  const regex = new RegExp(
    `${keyword}\\("([^.]*?)(?=\.)\\.([a-z]*?)(?=")`,
    'g'
  );
  code.replace(regex, async (_, name, ext) => {
    const promise = getSingleFileOnCanvas(`${name}.${ext}`);
    promises.push(promise);
  });
}
//changes Quroum code with frame:Load('fileName') to frame:Load('url')
async function replaceLoadFileNameWithURL(code) {
  //get all the class's with data-file attribute
  const fileInputDiv = document.getElementsByClassName('data-file');
  const promises = [];
  getReplacePromises(code, promises, 'Load');
  getReplacePromises(code, promises, 'CreateIcon');
  getReplacePromises(code, promises, 'CreateButton');
  getReplacePromises(code, promises, 'PlaySound');
  getReplacePromises(code, promises, 'Add');
  //return the url
  const data = await Promise.all(promises);
  code = replaceWithUrl(code, data, fileInputDiv, 'Load');
  code = replaceWithUrl(code, data, fileInputDiv, 'CreateIcon');
  code = replaceWithUrl(code, data, fileInputDiv, 'CreateButton');
  code = replaceWithUrl(code, data, fileInputDiv, 'PlaySound');
  code = replaceWithUrl(code, data, fileInputDiv, 'Add');
  return code;
}
function DynamicFail() {
  console.log('Failed to load dependencies');
}
let svgLoaderCount = 0;

function InjectSVG(element, source, svgAmount) {
  console.log(`Injecting SVG ${source}`);
  return new Promise(function(resolve, reject) {
    fetch(source)
      .then(async (response) => await response.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');

        const scriptTags = svgDoc.querySelectorAll('script');

        element.innerHTML = svgDoc.documentElement.outerHTML;

        if (scriptTags.length) {
          for (const scriptTag of scriptTags) {
            const newScript = document.createElement('script');

            // Replace the HTML entity & with its corresponding character
            newScript.innerHTML = scriptTag.innerHTML
              .replace(/&amp;/g, '&')
              .replace(/&gt;/g, '>'); // Replace &gt; with >

            for (const attr of scriptTag.attributes) {
              newScript.setAttribute(attr.name, attr.value);
            }

            document.head.appendChild(newScript);
          }
        }
      })
      .then(() => {
        svgLoaderCount++;
        console.log(`SVGs left: ${svgAmount - svgLoaderCount}`);
        resolve({ finished: svgLoaderCount == svgAmount });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function InjectCodeBlock(element, name, source) {
  if (source !== undefined && name !== undefined) {
    const pre = document.createElement('pre');
    pre.classList.add('line-numbers', 'language-quorum');
    const code = document.createElement('code');
    code.classList.add('language-quorum', 'paintItBlack');
    code.innerHTML = source;
    pre.appendChild(code);
    element.appendChild(pre);
  }
}

function readTxtDoc(url, contentID, widget) {
  return new Promise(function readTextData(resolve, reject) {
    fetch(url)
      .then(async (response) => await response.text())
      .then((code) => {
        resolve({ code, contentID, widget });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addQuroumFileInput() {
  const fileInputDiv = document.getElementsByClassName(LOAD_FILE);
  for (let i = 0; i < fileInputDiv.length; i++) {
    //wrap a label with the value of the attribute data-label and a file input
    const labelText = fileInputDiv[i].getAttribute('data-label');
    const label = document.createElement('label');
    label.setAttribute('for', 'fileInput' + i);
    label.classList.add('labelColAC');
    const spanText = document.createElement('span');
    spanText.classList.add('labelTextAC');
    spanText.innerHTML = labelText;
    label.appendChild(spanText);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput' + i;
    fileInput.name = 'fileInput' + i;
    fileInput.setAttribute('divName', fileInputDiv[i].id);
    fileInput.className = 'fileInput';
    fileInput.onchange = function(e) {
      if (e.target != null) {
        const file = e.target.files[0];
        const divName = e.target.getAttribute('divName');
        const reader = new FileReader();
        reader.onload = function(e) {
          if (e.target != null) {
            const text = e.target.result;
            document.getElementById(divName).setAttribute('data-value', text);
          }
        };
        reader.readAsText(file);
      }
    };
    label.appendChild(fileInput);
    fileInputDiv[i].appendChild(label);
  }
}
function getCurrentCourseNumber() {
  const url = window.location.href;
  let id = url.substring(url.indexOf('courses/') + 8);
  if (id.indexOf('/') > -1) {
    id = id.substring(0, id.indexOf('/'));
  }
  if (isNaN(+id)) {
    return;
  }
  return id;
}

function addSVGEventListeners() {
  document.querySelectorAll('.quorum-chart-information-list').forEach(item => {
    item.addEventListener('keydown', chartInformationKeydown, false);
    item.addEventListener('focus', speechViewerFocus, false);
  })
  document.querySelectorAll('.quorum-chart-area').forEach(item => { item.addEventListener('keydown', chartAreaKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-series-list').forEach(item => { item.addEventListener('keydown', seriesKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-category-list').forEach(item => { item.addEventListener('keydown', categoryKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-bar-list').forEach(item => { item.addEventListener('keydown', barKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-plot-list').forEach(item => { item.addEventListener('keydown', plotKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-plotitem-list').forEach(item => { item.addEventListener('keydown', plotitemKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
  document.querySelectorAll('.quorum-chart-point-list').forEach(item => { item.addEventListener('keydown', pointKeydown, false); item.addEventListener('focus', speechViewerFocus, false); })
}


function LoadPrism() {
  const url = QUORUM_PRISM;
  // Adding the script tag to the head as suggested before
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  // Then bind the event to the callback function.
  const prismScript = script;
  prismScript.addEventListener('load', function() {
    //do something maybe
  });
  // Fire the loading
  document.head.appendChild(script);
}

