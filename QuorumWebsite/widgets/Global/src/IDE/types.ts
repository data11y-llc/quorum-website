import type * as CSSType from 'csstype';

export interface IdeElements {
  codeDivs: HTMLDivElement[]
  preElements: HTMLPreElement[]
  codeElements: HTMLElement[]
  lineNumbers: HTMLDivElement[]
  lineNumberDiv: HTMLDivElement;
  codeBlocks: HTMLDivElement;
  codeBlockCharPositions: number[]
  cursorBlockLocation: number;
  previousCursorLocation: number;
  preStyles: CSSStyleDeclaration;
  multiLineComment: Array<[number, number]>;
  prevLines: string[];
  lineHeightsMap: Map<string, string>;
  longestLineLength: number;
  tabValues: string[];
  currentTab: number;
  theme: 'dark' | 'light' | 'high-contrast';
}

// Create a new type that combines IdeTheme with IdeThemeStyle
export type CombinedIdeTheme = IdeTheme & IdeThemeStyle;

export interface IdeTheme {
  mainContainer: CSSType.Properties;
  // other properties of IdeTheme if there are any
}

export interface IdeThemeStyle {
  light: IdeContents;
  dark: IdeContents;
  "high-contrast": IdeContents;
}

export interface IdeContents {
  headerSectionStyle: HeaderSectionStyle
  contentSectionStyle: ContentSectionStyle
  resizeBar: CSSType.Properties
}

interface HeaderSectionStyle {
  container: CSSType.Properties
  title: CSSType.Properties
  buttons: headerButtons
  icon: CSSType.Properties
}

interface headerButtons {
  container: CSSType.Properties
  runColor: CSSType.Properties
  stopColor: CSSType.Properties
}

interface ContentSectionStyle {
  container: CSSType.Properties
  sideBarStyle: SideBarStyle
  codeOutputStyle: CodeOutputStyle
  modals: Modals
}

interface Modals {
  settings: CSSType.Properties
  help: CSSType.Properties
}

interface CodeOutputStyle {
  container: CSSType.Properties
  inputAndGraphicSectionStyle: InputAndGraphicSectionStyle
  consoleSectionStyle: ConsoleSectionStyle
}

interface InputAndGraphicSectionStyle {
  container: CSSType.Properties
  inputSectionStyle: InputSectionStyle
  tabBar: tabSection
  resizeBar: CSSType.Properties
  graphicSectionStyle: GraphSectionStyle
}

interface tabSection {
  container: CSSType.Properties
  tab: CSSType.Properties
  activeTab: CSSType.Properties
}

interface SideBarStyle {
  container: CSSType.Properties
  Icon: CSSType.Properties
  TopSection: CSSType.Properties
  BottomSection: CSSType.Properties
}

interface InputSectionStyle {
  container: CSSType.Properties
  codeEditor: codeHighlighter
}

interface codeHighlighter {
  textAndpre: CSSType.Properties
  pre: CSSType.Properties
  blocks: CSSType.Properties
  block: CSSType.Properties
  lineNumberDiv: CSSType.Properties
  lineNumber: CSSType.Properties
  text: CSSType.Properties
  code: CSSType.Properties
}

interface ConsoleSectionStyle {
  outerContainer: CSSType.Properties
  resizeBar: CSSType.Properties
  text: CSSType.Properties
}

interface GraphSectionStyle {
  container: CSSType.Properties
  sizeBox: CSSType.Properties
}
