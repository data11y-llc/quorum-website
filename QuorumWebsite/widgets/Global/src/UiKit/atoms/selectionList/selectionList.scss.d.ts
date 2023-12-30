export type Styles = {
  'selected': string;
  'selectionList__inner--container--dark': string;
  'selectionList__inner--container--high-contrast': string;
  'selectionList__inner--container--light': string;
  'selectionList__item__icon--dark': string;
  'selectionList__item__icon--high-contrast': string;
  'selectionList__item__icon--light': string;
  'selectionList__item--dark': string;
  'selectionList__item--high-contrast': string;
  'selectionList__item--light': string;
  'selectionList__outer--container--dark': string;
  'selectionList__outer--container--high-contrast': string;
  'selectionList__outer--container--light': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
