import type * as CSSType from 'csstype'

export type frequencyType = Record<alphabetCharType, number>
export type letterButtonType = HTMLButtonElement & { dataset: DivData };
export type letterDivType = HTMLDivElement & { dataset: DivData };
export type alphabetCharType = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
export type letterType = alphabetCharType | ''
export type letterPosType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
export type rowType = 'locked' | 'unlocked' | 'original'

export interface DivData {
  position: letterPosType;
  letterOG: letterType;
  currentLetter: letterType
  row: 'original' | 'locked' | 'unlocked';
  ogFrequency: number;
  marked: 'true' | 'false';
}

export interface ICssInterface {
  ariaLive: CSSType.Properties,
  topSection: {
    container: CSSType.Properties,
    instructions: {
      container: CSSType.Properties,
      h2: CSSType.Properties,
      h3: CSSType.Properties,
      header: CSSType.Properties,
      paragraph: CSSType.Properties,
    },
    sentenceAndOptions: {
      container: CSSType.Properties,
      header: CSSType.Properties,
      sentence: {
        container: CSSType.Properties,
        paragraph: CSSType.Properties
      },
      options: {
        container: CSSType.Properties,
        dropdown: CSSType.Properties,
      },
    },
  },
  sortSection: {
    header: CSSType.Properties,
    sortContainer: CSSType.Properties,
    tabContentContainer: CSSType.Properties,
    buttonContainer: CSSType.Properties,
    labelContainer: CSSType.Properties,
    tabButtons: {
      button: CSSType.Properties,
      active: CSSType.Properties,
      inactive: CSSType.Properties,
      container: CSSType.Properties,
      hover: CSSType.Properties
    },
  },
  buttonStyles: {
    lr: CSSType.Properties,
    lrHover: CSSType.Properties,
    main: CSSType.Properties,
    disabled: CSSType.Properties
    enabled: CSSType.Properties
    SortHover: CSSType.Properties,
    blue: CSSType.Properties,
    blueHover: CSSType.Properties,
    darkBlue: CSSType.Properties,
    darkBlueHover: CSSType.Properties,
    orange: CSSType.Properties,
    orangeHover: CSSType.Properties,
  },
  containerStyles: {
    cipherLoader: CSSType.Properties,
    quorumChart: CSSType.Properties,
    largerChart: CSSType.Properties,
    letter: CSSType.Properties
  },
  letterStyles: {
    header: CSSType.Properties,
    labels: {
      ogLabel: CSSType.Properties,
      lockedLabel: CSSType.Properties,
      unlockedLabel: CSSType.Properties,
    }
    grid: CSSType.Properties,
    row: CSSType.Properties,
    buttons: CSSType.Properties,
    letterdiv: CSSType.Properties,
    marked: CSSType.Properties,
    locked: CSSType.Properties,
    unlocked: CSSType.Properties,
    original: CSSType.Properties,
  },
  offsetStyle: {
    container: CSSType.Properties,
    input: CSSType.Properties
  }
}
