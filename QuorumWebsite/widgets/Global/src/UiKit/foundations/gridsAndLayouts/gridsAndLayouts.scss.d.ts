export type Styles = {
  'backdrop': string;
  'container--flex--desktop': string;
  'container--flex--mobile': string;
  'container--flex--responsive': string;
  'container--flex--tablet': string;
  'container--grid--desktop': string;
  'container--grid--mobile': string;
  'container--grid--responsive': string;
  'container--grid--tablet': string;
  'flex-row': string;
  'flex-row-nowrap': string;
  'modal': string;
  'open': string;
  'option-row': string;
  'QuorumUIContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
