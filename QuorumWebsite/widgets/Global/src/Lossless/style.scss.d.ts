export type Styles = {
  'active': string;
  'data11y-lossless': string;
  'lossless-line-number': string;
  'lossless-text-area': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
