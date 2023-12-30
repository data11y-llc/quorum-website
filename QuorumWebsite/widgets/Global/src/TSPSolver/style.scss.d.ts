export type Styles = {
  'tsp-buttons-container': string;
  'tsp-city': string;
  'tsp-city-graph-container': string;
  'tsp-city-tooltip': string;
  'tsp-content-container': string;
  'tsp-dropdowns-container': string;
  'tsp-main-container': string;
  'tsp-settings-container': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
