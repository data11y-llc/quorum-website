export type Styles = {
  'accordion': string;
  'accordion-item-branch': string;
  'accordion-item-leaf': string;
  'breadcrumb': string;
  'breadcrumb-item': string;
  'breadHome-item': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
