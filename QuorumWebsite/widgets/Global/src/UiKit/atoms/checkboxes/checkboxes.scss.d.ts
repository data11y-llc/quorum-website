export type Styles = {
  'checkbox_label_dark': string;
  'checkbox_label_high-contrast': string;
  'checkbox_label_light': string;
  'chkbox_dark': string;
  'chkbox_high-contrast': string;
  'chkbox_light': string;
  'chkbox-label-container_column': string;
  'chkbox-label-container_row': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
