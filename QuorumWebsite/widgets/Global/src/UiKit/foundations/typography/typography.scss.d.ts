export type Styles = {
  'typo_code-lgText': string;
  'typo_code-mText': string;
  'typo_code-smText': string;
  'typo_code-xsText': string;
  'typo_text-lgText': string;
  'typo_text-mText': string;
  'typo_text-smText': string;
  'typo_text-xlText': string;
  'typo_text-xsText': string;
  'typo_title-display1': string;
  'typo_title-displaySub': string;
  'typo_title-title1': string;
  'typo_title-title2': string;
  'typo_title-title3': string;
  'typo_title-title4': string;
  'typo_title-title5': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
