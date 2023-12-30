export type Styles = {
  'custom-select': string;
  'custom-select-column': string;
  'dropdown-arrow-black': string;
  'dropdown-arrow-white': string;
  'dropdown-dark-theme': string;
  'dropdown-hico-theme': string;
  'dropdown-light-theme': string;
  'select-arrow-active': string;
  'select-hide': string;
  'select-items': string;
  'select-selected': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
