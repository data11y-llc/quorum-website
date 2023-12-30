//this is found in the vite config files
//TODO make KEEP_PROD BASE_URL when done developing
// export const MSDE_BASE_URL_KEEP_PROD = "https://data11y.com";
export const MSDE_BASE_URL_KEEP_PROD = import.meta.env.VITE_APP_BASE_URL;
export const MSDE_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const VERSION_NUMBER = import.meta.env.VITE_APP_VERSION;
export const FILE_SUFFIX_DEV_PROD = import.meta.env.VITE_APP_FILE_SUFFIX;
export const FILE_SUFFIX = FILE_SUFFIX_DEV_PROD + VERSION_NUMBER;

export const QUORUM_STANDARD_LIBRARY = `${MSDE_BASE_URL}/script/QuorumStandardLibrary.js?version=11.2.1`;
export const QUORUM_CHARTS_JS = `${MSDE_BASE_URL}/script/quorumCharts.js?version=1.1.8`;
export const QUORUM_CHARTS_CSS = `${MSDE_BASE_URL_KEEP_PROD}/style/quorumCharts.css?version=1.1.6`;
export const QUORUM_LOAD = `${MSDE_BASE_URL}/script/load.js?version=1.0.1`;
export const QUORUM_LOAD_DATA = `${MSDE_BASE_URL}/script/load.data`;
export const QUORUM_PRISM = `${MSDE_BASE_URL_KEEP_PROD}/script/prism-quorum.js?version=1.0.0`;
