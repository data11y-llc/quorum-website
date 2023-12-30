export type Styles = {
  'radio_dark': string;
  'radio_high-contrast': string;
  'radio_label_dark': string;
  'radio_label_high-contrast': string;
  'radio_label_light': string;
  'radio_light': string;
  'radio-image': string;
  'radio-label-container_column': string;
  'radio-label-container_row': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
