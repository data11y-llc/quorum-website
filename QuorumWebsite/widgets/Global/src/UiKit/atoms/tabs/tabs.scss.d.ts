export type Styles = {
  'close-button-dark': string;
  'close-button-high-contrast': string;
  'close-button-light': string;
  'new-tab-button-full-width': string;
  'tab_selected': string;
  'tab_text-dark': string;
  'tab_text-high-contrast': string;
  'tab_text-light': string;
  'tab-and-close-button-dark': string;
  'tab-and-close-button-high-contrast': string;
  'tab-and-close-button-light': string;
  'tab-lg-dark': string;
  'tab-lg-high-contrast': string;
  'tab-lg-light': string;
  'tab-list-dark': string;
  'tab-list-high-contrast': string;
  'tab-list-light': string;
  'tab-md-dark': string;
  'tab-md-high-contrast': string;
  'tab-md-light': string;
  'tab-plus-button-dark': string;
  'tab-plus-button-high-contrast': string;
  'tab-plus-button-light': string;
  'tab-sm-dark': string;
  'tab-sm-high-contrast': string;
  'tab-sm-light': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
