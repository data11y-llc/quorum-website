export type Styles = {
  'dark-mode': string;
  'high-contrast-mode': string;
  'light-mode': string;
  'range-slider': string;
  'slider-container': string;
  'value-display': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
