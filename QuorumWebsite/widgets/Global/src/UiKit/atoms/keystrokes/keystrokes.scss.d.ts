export type Styles = {
  'keystroke': string;
  'keystroke-content': string;
  'subscript': string;
  'superscript': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
