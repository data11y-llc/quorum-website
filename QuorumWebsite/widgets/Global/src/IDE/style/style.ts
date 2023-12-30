import { UiKitColors } from '../../util/UiKit.js';
import { getCookie, IDE_OPTIONS } from '../cookies.js';
import { makeHeaderSection, makeMobileHeaderSection } from '../headerSection.js';
import { updateCodeEditorDisplay, mimicTextAreaStyle, ideCache } from '../highlight.js';
import { updateFromCookie } from '../settingsModal.js';
import { CombinedIdeTheme, IdeContents } from '../types.js';
import type * as CSSType from 'csstype'

// eslint-disable-next-line prefer-const
export const Offsets = {
  sideBarOffset: 74
}

type styleGlobalTypes = {
  fontSize: string,
  lineHeight: '1.5'
  wordWrap: WordWrap,
}

export const styleGlobals: styleGlobalTypes = {
  fontSize: '12px',
  lineHeight: '1.5',
  wordWrap: 'break-word',
}

export const cssVariables = {
  comment: '--ide-token-comment',
  property: '--ide-token-property',
  selector: '--ide-token-selector',
  operator: '--ide-token-operator',
  atrule: '--ide-token-atrule',
  function: '--ide-token-function',
  regex: '--ide-token-regex',
}

type WordWrap = 'normal' | 'break-word' | 'initial' | 'inherit'

const isChrome =
  navigator.userAgent.indexOf("Chrome") !== -1;
const isFirefox =
  navigator.userAgent.indexOf("Firefox") !== -1;

let blocksHeight: string = '';
if (isChrome) {
  blocksHeight = `calc(${styleGlobals.lineHeight} * ${styleGlobals.fontSize.split('px')[0]} * 55)`
  console.log("This is Google Chrome");
  // blocksHeight = `63ch`
} else if (isFirefox) {
  blocksHeight = `calc(${styleGlobals.lineHeight} * ${styleGlobals.fontSize.split('px')[0]} * 55)`
  console.log("This is Mozilla Firefox");
} else {
  blocksHeight = `calc(${styleGlobals.lineHeight} * ${styleGlobals.fontSize.split('px')[0]} * 55)`
  console.log("This is not Chrome or Firefox");
}

export const initialLineHeight: number = +styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]

type IDECSSTYPE = { [key: string]: CombinedIdeTheme }
export const CSS: IDECSSTYPE = {};

//Set the theme based on the user's preference
const userTheme = getCookie<IDE_OPTIONS>('DATA11Y-THEME', JSON.parse)
// eslint-disable-next-line no-var
export var THEME: 'dark' | 'light' | 'high-contrast' = userTheme?.theme ? userTheme.theme : 'light'

const root = document.documentElement;

function highlightLight(IDE?: HTMLDivElement) {
  if (IDE && IDE.dataset.keepTheme !== 'true') {
    IDE.classList.add('light')
    IDE.classList.remove('dark')
    IDE.classList.remove('high-contrast')
  }
}

function highlightDark(IDE?: HTMLDivElement) {
  if (IDE && IDE.dataset.keepTheme !== 'true') {
    IDE.classList.add('dark')
    IDE.classList.remove('light')
    IDE.classList.remove('high-contrast')
  }
}

function highlightHico(IDE?: HTMLDivElement) {
  if (IDE && IDE.dataset.keepTheme !== 'true') {
    IDE.classList.add('high-contrast')
    IDE.classList.remove('dark')
    IDE.classList.remove('light')
  }
}

const ideDesktopFoundation: IdeContents = {
  headerSectionStyle: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 'fit-content',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      position: 'relative',
      boxSizing: 'border-box',
    },
    title: {
      //make the font size a percentage of the width
      fontSize: '1.5rem',
      margin: '0',
      fontFamily: 'Montserrat',
      padding: '0',
      textAlign: 'center',
      fontWeight: '700',
    },
    buttons: {
      runColor: {},
      stopColor: {},
      container: {},
    },
    icon: {},
  },
  resizeBar: {
    touchAction: 'none',
    zIndex: '1000',
    display: 'block',
    boxSizing: 'border-box',
    width: '20px',
    height: '20px',
    position: 'absolute',
    borderBottomRightRadius: '10px',
    cursor: 'nwse-resize',
    bottom: '0px',
    right: '0px',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  contentSectionStyle: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      maxHeight: `calc(100% - ${Offsets.sideBarOffset}px)`,
      borderBottomLeftRadius: '15px',
      borderBottomRightRadius: '15px',
    },
    modals: {
      settings: {
        display: 'none',
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        bottom: '25px',
        overflow: 'auto',
        width: 'auto',
        height: '350px',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        fontFamily: 'Montserrat, sans-serif',
      },
      help: {
        display: 'none',
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        bottom: '90px',
        width: 'auto',
        maxHeight: 'calc(100vh - 100px)',
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        fontFamily: 'Montserrat, sans-serif',
        paddingLeft: '20px',
        overflowY: 'auto',
        paddingRight: '20px',
        paddingTop: '20px',
      },
    },
    sideBarStyle: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: `${Offsets.sideBarOffset}px`,
        minWidth: `${Offsets.sideBarOffset}px`,
        maxWidth: '100px',
        height: '100%',
        borderBottomLeftRadius: '10px',
      },
      Icon: {},
      TopSection: {},
      BottomSection: {},
    },
    codeOutputStyle: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: `calc(100% - ${Offsets.sideBarOffset}px)`,
        height: '100%',
        justifyContent: 'flex-start',
        minHeight: '100%',
        maxHeight: '100%',
        borderBottomRightRadius: '10px',
        boxSizing: 'border-box',
      },
      inputAndGraphicSectionStyle: {
        container: {
          display: 'flex',
          flexDirection: 'row-reverse',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
        },
        tabBar: {
          container: {
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'row',
            height: '46px',
            minWidth: '100%',
            maxWidth: '100%',
            width: '100%',
            borderBottom: `0.1px solid ${UiKitColors.neutral.grey._25}`,
            boxSizing: 'border-box',
            backgroundColor: UiKitColors.neutral.grey._50,
          },
          tab: {
            height: '100%',
            backgroundColor: 'transparent',
            width: 'fit-content',
            minWidth: 'fit-content',
            maxWidth: 'fit-content',
            cursor: 'pointer',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
            // border: `0.1px solid ${UiKitColors.neutral.grey._25}`,
            borderBottom: 'none',
            boxSizing: 'border-box',
            //center evertying in the button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 5px',
            //make the text not selectable
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
          },
          activeTab: {},
        },
        inputSectionStyle: {
          container: {
            placeSelf: 'flex-start',
            width: '100%',
            height: '100%',
            display: 'flex',
            boxSizing: 'border-box',
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '0',
            margin: '0',
          },
          codeEditor: {
            textAndpre: {
              display: 'block',
              height: '100%',
              margin: '0',
              outline: 'none',
              overflow: 'scroll',
              padding: '0',
              position: 'absolute',
              resize: 'none',
              wordWrap: styleGlobals.wordWrap as WordWrap,
            },
            text: {
              border: 'none',
              borderWidth: '0',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              // fontSize: styleGlobals.fontSize,
              fontSize: '12px',
              lineHeight: styleGlobals.lineHeight,
              marginLeft: `6ch`,
              width: `calc(100% - 6ch)`,
              boxShadow: 'none',
              wordWrap: styleGlobals.wordWrap,
              whiteSpace: 'break-spaces',
              borderRadius: '0',
              // TODO: add back
              color: 'transparent',
            },
            lineNumberDiv: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              width: `6ch`,
              minWidth: `6ch`,
              maxWidth: `6ch`,
              lineHeight: styleGlobals.lineHeight,
              fontWeight: 'bold',
              height: `calc(100% - 1ch)`,
              boxSizing: 'border-box',
              overflow: 'hidden',
              zIndex: 1,
            },
            lineNumber: {
              width: '100%',
              display: 'flex',
              boxSizing: 'border-box',
              justifyContent: 'flex-start',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              paddingLeft: '8px',
              fontSize: styleGlobals.fontSize,
              lineHeight: styleGlobals.lineHeight,
              fontWeight: 'normal',
            },
            blocks: {
              width: `20ch`,
              maxWidth: `20ch`,
              wordWrap: styleGlobals.wordWrap,
              display: 'flex',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              lineHeight: styleGlobals.lineHeight,
              flexDirection: 'column',
              height: blocksHeight,
              pointerEvents: 'none',
              zIndex: 1,
            },
            block: {
              height: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              display: 'block',
              textSizeAdjust: 'auto',
            },
            pre: {
              display: 'block',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: '1em',
              fontStretch: 'normal',
              height: `fit-content`,
              lineHeight: styleGlobals.lineHeight,
              margin: '0',
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              padding: '0',
              whiteSpace: 'break-spaces',
              wordWrap: styleGlobals.wordWrap,
              wordBreak: 'break-word',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0',
            },
            code: {
              display: 'block',
              tabSize: '2',
              width: '100%',
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              height: `fit-content`,
              border: 'none',
              padding: '0px',
              backgroundColor: 'transparent',
              wordBreak: 'break-word',
            },
          },
        },
        resizeBar: {
          touchAction: 'none',
          zIndex: '1',
          boxSizing: 'border-box',
          width: '8px',
          minWidth: '8px',
          display: 'block',
          height: '100%',
          cursor: 'ew-resize',
        },
        graphicSectionStyle: {
          container: {
            width: '100%',
            display: 'block',
            placeSelf: 'flex-end',
            height: '100%',
            position: 'relative',
          },
          sizeBox: {
            position: 'relative',
            bottom: '0px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            right: '0px',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            backgroundColor: UiKitColors.quorum.blue._10,
            color: 'black',
            fontSize: '14px',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            zIndex: 3,
          },
        },
      },
      consoleSectionStyle: {
        outerContainer: {
          display: 'flex',
          width: '100%',
          height: '100px',
          minHeight: '100px',
          maxHeight: '100px',
          borderBottomRightRadius: '10px',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          overflowY: 'auto',
        },
        resizeBar: {
          touchAction: 'none',
          zIndex: '1',
          display: 'block',
          boxSizing: 'border-box',
          width: '100%',
          minWidth: '100%',
          height: '10px',
          minHeight: '10px',
          cursor: 'ns-resize',
        },
        text: {
          fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
          fontSize: '16px',
          lineHeight: styleGlobals.lineHeight,
          marginTop: '5px',
          marginBottom: '5px',
          marginLeft: '5px',
          marginRight: '5px',
          width: 'calc(100% - 10px)',
          height: 'calc(100% - 20px)',
        },
      },
    },
  },
};

const ideMobileFoundation: IdeContents = {
  headerSectionStyle: {
    container: {
      display: 'flex',
      flexDirection: 'row',

      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      minHeight: '100px',
      backgroundColor: '#F5F5F5',
      borderRadius: '10px 10px 0 0',
    },
    title: {
      //make the font size a percentage of the width
      fontSize: '1.5rem',
      margin: '0',
      fontFamily: 'Montserrat',
      padding: '0',
      textAlign: 'center',
      fontWeight: '700',
      //make the line height small
      lineHeight: '1.2',
    },
    buttons: {
      runColor: {},
      stopColor: {},
      container: {},
    },
    icon: {},
  },
  resizeBar: {
    touchAction: 'none',
    display: 'none',
    zIndex: '1',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: '100%',
    height: '2px',
    minHeight: '2px',
    cursor: 'ns-resize',
  },
  contentSectionStyle: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'calc(100% - 100px)',
      minHeight: 'calc(100% - 100px)',
      maxHeight: 'calc(100% - 100px)',
      backgroundColor: '#F5F5F5',
      borderRadius: '0 0 10px 10px',
    },
    modals: {
      settings: {
        display: 'none',
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        bottom: '25px',
        overflow: 'auto',
        width: 'auto',
        height: '350px',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        backgroundColor: UiKitColors.neutral.grey._65,
      },
      help: {
        display: 'none',
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        bottom: '90px',
        width: 'auto',
        maxHeight: 'calc(100vh - 100px)',
        height: 'fit-content',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        backgroundColor: UiKitColors.neutral.grey._65,
        fontFamily: 'Montserrat, sans-serif',
        paddingLeft: '20px',
        overflowY: 'auto',
        paddingRight: '20px',
        paddingTop: '20px',
      },
    },
    sideBarStyle: {
      container: {
        display: 'none',
        flexDirection: 'column',
        position: 'absolute',
        right: '0px',
        zIndex: 4,
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: `${Offsets.sideBarOffset}px`,
        minWidth: `${Offsets.sideBarOffset}px`,
        maxWidth: '100px',
        height: '90%',
        borderBottomLeftRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
      },
      Icon: {},
      TopSection: {},
      BottomSection: {},
    },
    codeOutputStyle: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: `calc(100%)`,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        minHeight: '75%',
        maxHeight: '75%',
        overflow: 'hidden',
      },
      inputAndGraphicSectionStyle: {
        container: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          maxHeight: '1000px',
          backgroundColor: '#F5F5F5',
          overflow: 'auto',
        },
        tabBar: {
          container: {
            display: 'flex',
            flexDirection: 'row',
            height: '46px',
            minWidth: '100%',
            maxWidth: '100%',
            width: '100%',
            borderBottom: `0.1px solid ${UiKitColors.neutral.grey._25}`,
            boxSizing: 'border-box',
          },
          tab: {
            height: '100%',
            backgroundColor: 'transparent',
            width: 'fit-content',
            minWidth: 'fit-content',
            maxWidth: 'fit-content',
            cursor: 'pointer',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
            // border: `0.1px solid ${UiKitColors.neutral.grey._25}`,
            borderBottom: 'none',
            boxSizing: 'border-box',
            //center evertying in the button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 5px',
            //make the text not selectable
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
          },
          activeTab: {},
        },
        inputSectionStyle: {
          container: {
            placeSelf: 'flex-start',
            width: '100%',
            height: '100%',
            display: 'flex',
            boxSizing: 'border-box',
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '0',
            margin: '0',
            // overflow: 'hidden',
          },
          codeEditor: {
            textAndpre: {
              display: 'block',
              height: '100%',
              margin: '0',
              outline: 'none',
              overflow: 'scroll',
              padding: '0',
              position: 'absolute',
              resize: 'none',
              wordWrap: styleGlobals.wordWrap,
            },
            text: {
              border: 'none',
              borderWidth: '0',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              lineHeight: styleGlobals.lineHeight,
              marginLeft: `6ch`,
              width: `calc(100% - 6ch)`,
              wordWrap: styleGlobals.wordWrap,
              whiteSpace: 'break-spaces',
              boxShadow: 'none',
              // TODO: add back
              color: 'transparent',
            },
            lineNumberDiv: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              width: `6ch`,
              minWidth: `6ch`,
              maxWidth: `6ch`,
              lineHeight: styleGlobals.lineHeight,
              fontWeight: 'bold',
              height: `calc(100% - 1ch)`,
              boxSizing: 'border-box',
              overflow: 'hidden',
              zIndex: 1,
            },
            lineNumber: {
              width: '100%',
              display: 'flex',
              boxSizing: 'border-box',
              justifyContent: 'flex-start',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              paddingLeft: '8px',
              fontSize: styleGlobals.fontSize,
              lineHeight: styleGlobals.lineHeight,
              fontWeight: 'normal',
            },
            blocks: {
              width: `20ch`,
              maxWidth: `20ch`,
              wordWrap: styleGlobals.wordWrap,
              display: 'flex',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              lineHeight: styleGlobals.lineHeight,
              flexDirection: 'column',
              height: blocksHeight,
              pointerEvents: 'none',
              zIndex: 1,
            },
            block: {
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              boxSizing: 'border-box',
              display: 'block',
            },
            pre: {
              boxSizing: 'border-box',
              display: 'block',
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
              fontSize: styleGlobals.fontSize,
              fontStretch: 'normal',
              height: `fit-content`,
              lineHeight: styleGlobals.lineHeight,
              margin: '0',
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              padding: '0',
              whiteSpace: 'break-spaces',
              wordWrap: styleGlobals.wordWrap,
              wordBreak: 'break-word',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0',
            },
            code: {
              display: 'block',
              tabSize: '2',
              width: '100%',
              minHeight: `${+styleGlobals.lineHeight * +styleGlobals.fontSize.split('px')[0]
                }px`,
              height: `fit-content`,
              border: 'none',
              padding: '0px',
              backgroundColor: 'transparent',
              wordBreak: 'break-word',
            },
          },
        },
        resizeBar: {
          touchAction: 'none',
          display: 'none',
          zIndex: 2,
          width: '100%',
          height: '8px',
          minHeight: '8px',
          maxHeight: '8px',
          backgroundColor: '#F5F5F5',
        },
        graphicSectionStyle: {
          container: {
            display: 'none',
            height: '100%',
            width: '100%',
            position: 'relative',
          },
          sizeBox: {
            //place at the bottom
            display: 'none',
            position: 'relative',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            left: '0px',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace',
            fontWeight: 'bold',
            zIndex: 3,
            borderRadius: '0px 0px 5px 0px',
          },
        },
      },
      consoleSectionStyle: {
        outerContainer: {
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#F5F5F5',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
        },
        resizeBar: {
          touchAction: 'none',
          display: 'none',
          zIndex: 2,
          width: '100%',
          height: '8px',
          minHeight: '8px',
          maxHeight: '8px',
          backgroundColor: '#F5F5F5',
        },
        text: {
          display: 'block',
          height: '100%',
          margin: '0',
          outline: 'none',
          overflow: 'scroll',
          padding: '0',
          resize: 'none',
          wordWrap: styleGlobals.wordWrap,
        },
      },
    },
  },
};

export const mainDesktopContainer: CSSType.Properties = {
  display: 'flex',
  zIndex: 0,
  flexDirection: 'column',
  justifyContent: 'center',
  width: '95%',
  minWidth: '100px',
  maxWidth: '100dvw',
  height: '850px',
  minHeight: '700px',
  maxHeight: '100%',
  borderRadius: '10px',
  boxSizing: 'border-box',
  boxShadow: THEME === 'light' ? '0px 0px 10px 0px rgba(0,0,0,0.75)' : '0px 0px 10px 0px rgba(100,100,100,0.75)',
  position: 'relative',
  backgroundColor: 'green',
  marginBottom: '16px',
  marginTop: '16px',
}

export const mainMobileContainer: CSSType.Properties = {
  display: 'flex',
  zIndex: 0,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '95%',
  height: '100dvh',
  maxHeight: '1000px',
  borderRadius: '10px',
  boxSizing: 'border-box',
  boxShadow: THEME === 'light' ? '0px 0px 5px 1px rgba(0,0,0,0.75)' : '0px 0px 5px 1px rgba(100,100,100,0.75)',
  position: 'relative',
  margin: '0px',
  padding: '0px',
  backgroundColor: 'green',
  fontSize: '12px',
  lineHeight: '1.5',
  marginBottom: '16px',
  marginTop: '16px',
}

export function createCssForIDE(preId: string, media: 'desktop' | 'mobile') {
  const mediaFoundation = media === 'desktop' ? ideDesktopFoundation : ideMobileFoundation
  const mainContainer = media === 'desktop' ? mainDesktopContainer : mainMobileContainer
  const CSSFrame: CombinedIdeTheme = {
    mainContainer: {
      ...mainContainer,
    },
    light: {
      headerSectionStyle: {
        container: {
          ...mediaFoundation.headerSectionStyle.container,
          backgroundColor: UiKitColors.quorum.blue._10,
          borderBottom: `2px solid ${UiKitColors.quorum.blue._50}`,
        },
        title: {
          ...mediaFoundation.headerSectionStyle.title,
          color: UiKitColors.neutral.black,
        },
        buttons: {
          runColor: {
            ...mediaFoundation.headerSectionStyle.buttons.runColor,
          },
          stopColor: {
            ...mediaFoundation.headerSectionStyle.buttons.stopColor,
          },
          container: {
            ...mediaFoundation.headerSectionStyle.buttons.container,
          },
        },
        icon: {
          ...mediaFoundation.headerSectionStyle.icon,
        },
      },
      resizeBar: {
        ...mediaFoundation.resizeBar,
        borderBottom: `4px solid ${UiKitColors.quorum.blue._50}`,
        borderRight: `4px solid ${UiKitColors.quorum.blue._50}`,
      },
      contentSectionStyle: {
        container: {
          ...mediaFoundation.contentSectionStyle.container,
        },
        modals: {
          settings: {
            ...mediaFoundation.contentSectionStyle.modals.settings,
            backgroundColor: UiKitColors.neutral.grey._10,
            color: UiKitColors.neutral.black,
            border: `none`,
          },
          help: {
            ...mediaFoundation.contentSectionStyle.modals.help,
            backgroundColor: UiKitColors.neutral.grey._10,
            color: UiKitColors.neutral.black,
            border: `none`,
          },
        },
        sideBarStyle: {
          container: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.container,
            backgroundColor: UiKitColors.quorum.blue._10,
            borderRight: `2px solid ${UiKitColors.quorum.blue._50}`,
          },
          Icon: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.Icon,
          },
          TopSection: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.TopSection,
          },
          BottomSection: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.BottomSection,
          },
        },
        codeOutputStyle: {
          container: {
            ...mediaFoundation.contentSectionStyle.codeOutputStyle.container,
          },
          inputAndGraphicSectionStyle: {
            container: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.container,
            },
            tabBar: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.container,
                borderBottom: `0.1px solid ${UiKitColors.neutral.grey._15}`,
                backgroundColor: UiKitColors.neutral.grey._15
              },
              tab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.tab,
                // border: `0.1px solid ${UiKitColors.neutral.grey._25}`,
                color: UiKitColors.neutral.black,
              },
              activeTab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.activeTab,
                // borderBottom: `3px solid ${UiKitColors.quorum.blue._50}`,
              },
            },
            inputSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.inputSectionStyle.container,
                backgroundColor: UiKitColors.neutral.white,
              },
              codeEditor: {
                textAndpre: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .textAndpre,
                },
                text: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .text,
                  backgroundColor: UiKitColors.neutral.white,
                  caretColor: UiKitColors.neutral.black,
                },
                lineNumberDiv: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumberDiv,
                  backgroundColor: UiKitColors.neutral.white,
                },
                lineNumber: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumber,
                  color: '#727272',
                },
                blocks: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .blocks,
                },
                block: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .block,
                },
                pre: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .pre,
                },
                code: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .code,
                  color: UiKitColors.neutral.black,
                },
              },
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.resizeBar,
              backgroundColor: UiKitColors.quorum.blue._50,
            },
            graphicSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.container,
                backgroundColor: UiKitColors.neutral.grey._10,
              },
              sizeBox: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox,
                borderTop: `none`,
                backgroundColor: UiKitColors.quorum.blue._10,
                color: UiKitColors.neutral.black,
              },
            },
          },
          consoleSectionStyle: {
            outerContainer: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.outerContainer,
              backgroundColor: UiKitColors.neutral.grey._10,
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.resizeBar,
              backgroundColor: UiKitColors.quorum.blue._50,
            },
            text: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.text,
              color: UiKitColors.neutral.black,
            },
          },
        },
      },
    },
    dark: {
      ...mediaFoundation,
      headerSectionStyle: {
        ...mediaFoundation.headerSectionStyle,
        container: {
          ...mediaFoundation.headerSectionStyle.container,
          backgroundColor: UiKitColors.neutral.grey._95,
          borderBottom: `2px solid ${UiKitColors.neutral.black}`,
        },
        title: {
          ...mediaFoundation.headerSectionStyle.title,
          color: UiKitColors.neutral.white,
        },
      },
      resizeBar: {
        ...mediaFoundation.resizeBar,
        borderBottom: `4px solid ${UiKitColors.neutral.grey._40}`,
        borderRight: `4px solid ${UiKitColors.neutral.grey._40}`,
      },
      contentSectionStyle: {
        ...mediaFoundation.contentSectionStyle,
        sideBarStyle: {
          ...mediaFoundation.contentSectionStyle.sideBarStyle,
          container: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.container,
            backgroundColor: UiKitColors.neutral.grey._65,
            borderRight: `2px solid ${UiKitColors.neutral.grey._95}`,
          },
        },
        modals: {
          settings: {
            ...mediaFoundation.contentSectionStyle.modals.settings,
            backgroundColor: UiKitColors.neutral.grey._65,
            color: UiKitColors.neutral.white,
            border: `none`,
          },
          help: {
            ...mediaFoundation.contentSectionStyle.modals.help,
            backgroundColor: UiKitColors.neutral.grey._65,
            color: UiKitColors.neutral.white,
            border: `none`,
          },
        },
        codeOutputStyle: {
          container: {
            ...mediaFoundation.contentSectionStyle.codeOutputStyle.container,
            backgroundColor: UiKitColors.neutral.grey._75,
          },
          inputAndGraphicSectionStyle: {
            container: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.container,
            },
            tabBar: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.container,
                borderBottom: `0.1px solid ${UiKitColors.neutral.grey._25}`,
                backgroundColor: UiKitColors.neutral.grey._85,
              },
              tab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.tab,
                // border: `0.1px solid ${UiKitColors.neutral.grey._85}`,
                color: UiKitColors.neutral.white,
              },
              activeTab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.activeTab,
                // borderBottom: `3px solid ${UiKitColors.quorum.blue._100}`,
              },
            },
            inputSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.inputSectionStyle.container,
                backgroundColor: UiKitColors.neutral.grey._75,
              },
              codeEditor: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor,
                text: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .text,
                  caretColor: UiKitColors.quorum.blue._50,
                  backgroundColor: UiKitColors.neutral.grey._75,
                },
                lineNumberDiv: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumberDiv,
                  backgroundColor: UiKitColors.neutral.grey._75,
                },
                lineNumber: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumber,
                  color: '#B0AEAE',
                },
                code: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .code,
                  color: UiKitColors.neutral.white,
                },
              },
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.resizeBar,
              backgroundColor: UiKitColors.neutral.black,
            },
            graphicSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.container,
                backgroundColor: UiKitColors.neutral.grey._65,
              },
              sizeBox: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox,
                borderTop: `none`,
                backgroundColor: UiKitColors.neutral.grey._85,
                color: UiKitColors.neutral.white,
              },
            },
          },
          consoleSectionStyle: {
            outerContainer: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.outerContainer,
              backgroundColor: UiKitColors.neutral.grey._95,
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.resizeBar,
              backgroundColor: UiKitColors.neutral.black,
            },
            text: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.text,
              color: UiKitColors.neutral.white,
            },
          },
        },
      },
    },
    "high-contrast": {
      ...mediaFoundation,
      headerSectionStyle: {
        ...mediaFoundation.headerSectionStyle,
        container: {
          ...mediaFoundation.headerSectionStyle.container,
          backgroundColor: UiKitColors.neutral.black,
          borderBottom: `2px solid ${UiKitColors.neutral.white}`,
        },
        title: {
          ...mediaFoundation.headerSectionStyle.title,
          color: UiKitColors.neutral.white,
        },
      },
      resizeBar: {
        ...mediaFoundation.resizeBar,
        borderBottom: `4px solid ${UiKitColors.neutral.white}`,
        borderRight: `4px solid ${UiKitColors.neutral.white}`,
      },
      contentSectionStyle: {
        ...mediaFoundation.contentSectionStyle,
        sideBarStyle: {
          ...mediaFoundation.contentSectionStyle.sideBarStyle,
          container: {
            ...mediaFoundation.contentSectionStyle.sideBarStyle.container,
            backgroundColor: UiKitColors.neutral.black,
            borderRight: `2px solid ${UiKitColors.neutral.white}`,
          },
        },
        modals: {
          settings: {
            ...mediaFoundation.contentSectionStyle.modals.settings,
            backgroundColor: UiKitColors.neutral.black,
            color: UiKitColors.neutral.white,
            border: `2px solid ${UiKitColors.neutral.white}`,
          },
          help: {
            ...mediaFoundation.contentSectionStyle.modals.help,
            backgroundColor: UiKitColors.neutral.black,
            color: UiKitColors.neutral.white,
            border: `2px solid ${UiKitColors.neutral.white}`,
          },
        },
        codeOutputStyle: {
          container: {
            ...mediaFoundation.contentSectionStyle.codeOutputStyle.container,
            backgroundColor: UiKitColors.neutral.black,
          },
          inputAndGraphicSectionStyle: {
            container: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.container,
            },
            tabBar: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.container,
                borderBottom: `0.1px solid ${UiKitColors.neutral.white}`,
                backgroundColor: UiKitColors.neutral.black,
              },
              tab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.tab,
                // border: `0.1px solid ${UiKitColors.neutral.grey._25}`,
                color: UiKitColors.neutral.white,
              },
              activeTab: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.tabBar.activeTab,
                // borderBottom: `3px solid ${UiKitColors.text.hico.blue}`,
              },
            },
            inputSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.inputSectionStyle.container,
                backgroundColor: UiKitColors.neutral.black,
              },
              codeEditor: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor,
                text: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .text,
                  caretColor: UiKitColors.quorum.blue._50,
                  backgroundColor: UiKitColors.neutral.black,
                },
                lineNumberDiv: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumberDiv,
                  backgroundColor: UiKitColors.neutral.black,
                },
                lineNumber: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .lineNumber,
                  color: '#B0AEAE',
                },
                code: {
                  ...mediaFoundation.contentSectionStyle.codeOutputStyle
                    .inputAndGraphicSectionStyle.inputSectionStyle.codeEditor
                    .code,
                  color: UiKitColors.neutral.white,
                },
              },
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .inputAndGraphicSectionStyle.resizeBar,
              backgroundColor: UiKitColors.neutral.white,
            },
            graphicSectionStyle: {
              container: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.container,
                backgroundColor: UiKitColors.neutral.black,
              },
              sizeBox: {
                ...mediaFoundation.contentSectionStyle.codeOutputStyle
                  .inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox,
                borderTop: `1px solid ${UiKitColors.neutral.white}`,
                backgroundColor: UiKitColors.neutral.black,
                color: UiKitColors.neutral.white,
              },
            },
          },
          consoleSectionStyle: {
            outerContainer: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.outerContainer,
              backgroundColor: UiKitColors.neutral.black,
            },
            resizeBar: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.resizeBar,
              backgroundColor: UiKitColors.neutral.white,
            },
            text: {
              ...mediaFoundation.contentSectionStyle.codeOutputStyle
                .consoleSectionStyle.text,
              color: UiKitColors.neutral.white,
            },
          },
        },
      },
    },
  };
  CSS[preId] = CSSFrame
}


export function setTheme(styleTheme: 'light' | 'dark' | 'high-contrast', preId: string) {
  // Get the div that has class 'data11y-code' with the id that starts with 'preId'
  const IDE = document.getElementById(preId) as HTMLDivElement
  if (IDE && IDE.dataset.keepTheme !== 'true') {
    const headerSection = document.getElementById(preId + "headerSection")
    const headerTitle = document.getElementById(preId + "headerTitle")
    const sideBar = document.getElementById(preId + "sideBar")
    const ideInput = document.getElementById(preId + "IdeInput") as HTMLTextAreaElement
    const lineNumberDiv = document.getElementById(preId + "lineNumberDiv")
    const consoleSection = document.getElementById(preId + "consoleSection")
    const outerConsoleSection = document.getElementById(preId + "outerConsole")
    const quorumSection = document.getElementById(preId + "QuorumUIContainer")
    const inputSection = document.getElementById(preId + "inputSection")
    const resizeHandle = document.getElementById(preId + "resizeHandle")
    const resizeIdeHandle = document.getElementById(preId + "resizeIdeHandle")
    const resizeConsoleHandle = document.getElementById(preId + "resizeConsoleHandle")
    const helpModal = document.getElementById(preId + "helpModal")
    const settingsModal = document.getElementById(preId + "settingsModal")
    const sizeBox = document.getElementById(preId + 'QuUiContainerSize');

    const settingsCloseButton = document.getElementById(preId + "settingsModalCloseButton")
    const helpCloseButton = document.getElementById(preId + "helpModalCloseButton")
    const tabBar = document.getElementById(preId + "tabBar");

    if (
      !IDE ||
      !headerSection ||
      !headerTitle ||
      !sideBar ||
      !ideInput ||
      !lineNumberDiv ||
      !consoleSection ||
      !outerConsoleSection ||
      !quorumSection ||
      !inputSection ||
      !resizeHandle ||
      !resizeIdeHandle ||
      !resizeConsoleHandle ||
      !helpModal ||
      !settingsModal ||
      !settingsCloseButton ||
      !helpCloseButton ||
      !tabBar ||
      !sizeBox
    ) {
      return console.error('Error: Could not find all elements to set theme');
    }

    ////from the elements above, swap the style to use the CSS dark mode
    headerSection.style.backgroundColor = CSS[preId][styleTheme].headerSectionStyle.container.backgroundColor as string
    headerSection.style.borderBottom = CSS[preId][styleTheme].headerSectionStyle.container.borderBottom as string
    headerTitle.style.color = CSS[preId][styleTheme].headerSectionStyle.title.color as string

    sideBar.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.sideBarStyle.container.backgroundColor as string
    sideBar.style.borderRight = CSS[preId][styleTheme].contentSectionStyle.sideBarStyle.container.borderRight as string

    quorumSection.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.graphicSectionStyle.container.backgroundColor as string

    outerConsoleSection.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.consoleSectionStyle.outerContainer.backgroundColor as string
    consoleSection.style.color = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.consoleSectionStyle.text.color as string

    resizeHandle.style.borderBottom = CSS[preId][styleTheme].resizeBar.borderBottom as string
    resizeHandle.style.borderRight = CSS[preId][styleTheme].resizeBar.borderRight as string
    resizeConsoleHandle.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.consoleSectionStyle.resizeBar.backgroundColor as string
    resizeIdeHandle.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.consoleSectionStyle.resizeBar.backgroundColor as string


    lineNumberDiv.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumberDiv.backgroundColor as string
    inputSection.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.container.backgroundColor as string
    ideInput.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.text.backgroundColor as string
    ideInput.style.caretColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.text.caretColor as string

    sizeBox.style.borderTop = CSS[preId][styleTheme].contentSectionStyle
      .codeOutputStyle.inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox
      .borderTop as string;
    sizeBox.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle
      .codeOutputStyle.inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox
      .backgroundColor as string;
    sizeBox.style.color = CSS[preId][styleTheme].contentSectionStyle
      .codeOutputStyle.inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox
      .color as string;

    settingsModal.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.modals.settings.backgroundColor as string
    settingsModal.style.color = CSS[preId][styleTheme].contentSectionStyle.modals.settings.color as string
    const selectors = settingsModal.querySelectorAll('select');
    //make selectors color be black
    selectors.forEach(function(element) {
      element.style.color = 'black';
    });

    settingsModal.style.border = CSS[preId][styleTheme].contentSectionStyle.modals.settings.border as string
    root.style.setProperty('--ide-input-background', CSS[preId][styleTheme].contentSectionStyle.modals.settings.color as string);
    root.style.setProperty('--ide-text-color', CSS[preId][styleTheme].contentSectionStyle.modals.settings.color as string);

    helpModal.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.modals.help.backgroundColor as string
    helpModal.style.color = CSS[preId][styleTheme].contentSectionStyle.modals.help.color as string
    helpModal.style.border = CSS[preId][styleTheme].contentSectionStyle.modals.help.border as string

    settingsCloseButton.style.color = CSS[preId][styleTheme].contentSectionStyle.modals.settings.color as string
    helpCloseButton.style.color = CSS[preId][styleTheme].contentSectionStyle.modals.help.color as string

    //TODO make modal colors
    const lineNumber = document.querySelectorAll(`[id^="${preId}"][id*="lineNumberEl"]`) as NodeListOf<HTMLElement>
    const codeBlocks = document.querySelectorAll(`[id^="${preId}"][id*="code"] .code-line`) as NodeListOf<HTMLElement>
    for (let i = 0; i < lineNumber.length; i++) {
      lineNumber[i].style.color = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.lineNumber.color as string
      codeBlocks[i].style.color = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.inputSectionStyle.codeEditor.code.color as string
    }

    tabBar.style.backgroundColor = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.tabBar.container.backgroundColor as string
    tabBar.style.borderBottom = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.tabBar.container.borderBottom as string
    if (tabBar) {
      for (let i = 0; i < tabBar.children.length; i++) {
        const child = tabBar.children[i];
        if (child instanceof HTMLElement) {
          child.style.border = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.tabBar.tab.border as string
          child.style.color = CSS[preId][styleTheme].contentSectionStyle.codeOutputStyle.inputAndGraphicSectionStyle.tabBar.tab.color as string
        }
      }
    }

    //inside of sidebar get all paths and update the fill color
    const pathColor = styleTheme === 'light' ? UiKitColors.neutral.black : UiKitColors.neutral.white
    let quorumRed, quorumBlue: string
    if (styleTheme === 'light') {
      quorumRed = UiKitColors.secondary.red._50
      quorumBlue = UiKitColors.quorum.blue._100
    } else if (styleTheme === 'dark') {
      quorumRed = UiKitColors.secondary.red._50
      quorumBlue = UiKitColors.quorum.blue._50
    } else {
      quorumRed = UiKitColors.text.hico.red
      quorumBlue = UiKitColors.text.hico.blue
    }

    const paths = document.querySelectorAll(`[id^="${preId}"][id*="sideBar"] path`)
    const buttons = document.querySelectorAll(`[id^="${preId}"][id*="sideBar"] button`) as NodeListOf<HTMLButtonElement>
    const hamPath = document.querySelectorAll(`[id^="${preId}"][id*="hamburgerButton"] path`)
    // Get the second g tag's path within the SVG elements that contain "tabBar" in their id
    const quorumIcon = document.querySelectorAll(`[id^="${preId}"][id*="tabBar"] g`);
    //get every 2nd tabIcons
    const tabIcons = Array.from(quorumIcon).filter((_, index) => index % 2 === 1);

    const headerIcon = document.querySelector(`[id^="${preId}"][id*="headerIcon"] path`) as HTMLElement
    console.log(tabIcons);

    headerIcon.setAttribute('fill', quorumBlue)

    for (let i = 0; i < paths.length; i++) {
      paths[i].setAttribute('fill', pathColor)
      if (hamPath[i]) {
        hamPath[i].setAttribute('fill', pathColor)
      }
      if (tabIcons[i] && i !== 0) {
        tabIcons[i].setAttribute('fill', quorumBlue)
      } else if (tabIcons[i] && i === 0) {
        tabIcons[i].setAttribute('fill', quorumRed)
      }

      buttons[i].style.color = pathColor
    }

    if (styleTheme === 'dark') {
      highlightDark(IDE)
    } else if (styleTheme === 'light') {
      highlightLight(IDE)
    } else if (styleTheme === 'high-contrast') {
      highlightHico(IDE)
    }

    //tab scrollbar theming
    if (styleTheme === 'light') {
      root.style.setProperty('--tab-scrollbar-thumb-background', UiKitColors.neutral.grey._25);
      root.style.setProperty('--tab-scrollbar-gutter-background', UiKitColors.neutral.grey._15);
      root.style.setProperty('--tab-scrollbar-thumb-hover-color', UiKitColors.neutral.grey._40);
    } else if (styleTheme === 'dark') {
      root.style.setProperty('--tab-scrollbar-thumb-background', UiKitColors.neutral.grey._40);
      root.style.setProperty('--tab-scrollbar-gutter-background', UiKitColors.neutral.grey._85);
      root.style.setProperty('--tab-scrollbar-thumb-hover-color', UiKitColors.neutral.grey._25);
    } else {
      root.style.setProperty('--tab-scrollbar-thumb-background', UiKitColors.neutral.black);
      root.style.setProperty('--tab-scrollbar-gutter-background', UiKitColors.neutral.white);
      root.style.setProperty('--tab-scrollbar-thumb-hover-color', UiKitColors.neutral.grey._40);
    }

    ideCache[preId].theme = styleTheme
    THEME = styleTheme
  }
}


// export function switchMobileDesktop(isMobile: boolean) { }

export function switchMobileDesktop(isMobile: boolean) {
  console.time('switchMobileDesktop')
  document.querySelectorAll('.data11y-code').forEach((IDEEl: Element) => {
    const IDE = IDEEl as HTMLDivElement;

    const preId = IDE.id;
    const options = getCookie<IDE_OPTIONS>('DATA11Y-THEME', JSON.parse);

    if (!options) return;


    const { fontSize = 12 } = options;

    const updateFontSize = (elements: NodeListOf<Element>) => {
      elements.forEach((el: Element) => {
        (el as HTMLElement).style.fontSize = `${fontSize}px`;
      });
    };

    const headerSection = document.getElementById(
      `${preId}headerSection`
    ) as HTMLDivElement;
    const QuorumUIContainer = document.getElementById(
      `${preId}QuorumUIContainer`
    ) as HTMLDivElement;
    const codeOutputSection = document.getElementById(
      `${preId}codeOutput`
    ) as HTMLDivElement;
    const consoleSection = document.getElementById(
      `${preId}consoleSection`
    ) as HTMLDivElement;
    const contentSection = document.getElementById(
      `${preId}contentSection`
    ) as HTMLDivElement;
    const headerTitle = document.getElementById(
      `${preId}headerTitle`
    ) as HTMLDivElement;
    const inputAndGraphicSection = document.getElementById(
      `${preId}inputAndGraphicSection`
    ) as HTMLDivElement;
    const inputSection = document.getElementById(
      `${preId}inputSection`
    ) as HTMLDivElement;
    const outerConsoleSection = document.getElementById(
      `${preId}outerConsole`
    ) as HTMLDivElement;
    const resizeConsoleHandle = document.getElementById(
      `${preId}resizeConsoleHandle`
    ) as HTMLDivElement;
    const resizeHandle = document.getElementById(
      `${preId}resizeHandle`
    ) as HTMLDivElement;
    const resizeIdeHandle = document.getElementById(
      `${preId}resizeIdeHandle`
    ) as HTMLDivElement;
    const sideBar = document.getElementById(
      `${preId}sideBar`
    ) as HTMLDivElement;
    const sizeBox = document.getElementById(
      `${preId}QuUiContainerSize`
    ) as HTMLDivElement;
    const lineNumber = document.querySelectorAll(
      `[id^="${preId}"][id*="lineNumberEl"]`
    );
    const code = document.querySelectorAll(
      `[id^="${preId}"][id*="code"] .code-line`
    );
    const codePres = document.querySelectorAll(`[id^="${preId}"] .pre-code`);
    const textarea = document.getElementById(
      `${preId}IdeInput`
    ) as HTMLTextAreaElement;
    const mobileBottom = document.getElementById(`${preId}mobileBottom`);
    const inputAndTabBar = document.getElementById(`${preId}inputAndTabBar`) as HTMLDivElement;
    const UiContainer = document.getElementById(`${preId}UiContainer`) as HTMLDivElement;

    QuorumUIContainer.style.cssText = '';
    codeOutputSection.style.cssText = '';
    consoleSection.style.cssText = '';
    contentSection.style.cssText = '';
    inputAndGraphicSection.style.cssText = '';
    inputSection.style.cssText = '';
    outerConsoleSection.style.cssText = '';
    resizeHandle.style.cssText = '';
    resizeIdeHandle.style.cssText = '';
    sideBar.style.cssText = '';
    sizeBox.style.cssText = '';




    //get the element with the id hideDisplay inside of the sideBar element 
    const hideDisplay = sideBar.querySelector(`#${preId}hideDisplayButton`) as HTMLButtonElement;
    const hideConsole = sideBar.querySelector(`#${preId}showConsoleButton`) as HTMLButtonElement;
    const hideCodeEl = IDE.querySelector(`#${preId}hideCodeButton`) as HTMLButtonElement;

    updateFontSize(lineNumber);
    updateFontSize(code);
    updateFontSize(codePres);

    const userTheme = getCookie<IDE_OPTIONS>('DATA11Y-THEME', JSON.parse)

    if (isMobile && !userTheme?.desktopMode) {
      console.log('mobile');
      hideDisplay.style.display = 'none';
      hideConsole.style.display = 'none';
      hideCodeEl.style.display = 'none';
      createCssForIDE(preId, 'mobile');
      headerSection.replaceWith(makeMobileHeaderSection(IDE, preId));
      if (!mobileBottom) {
        createMobileBottom(contentSection);
      }
      inputAndTabBar.style.display = 'flex';
      UiContainer.style.height = '100%';
      UiContainer.style.display = 'none';
      UiContainer.style.width = '100%';
    } else {
      console.log('desktop');
      createCssForIDE(preId, 'desktop');
      hideDisplay.style.display = 'block';
      hideConsole.style.display = 'block';
      hideCodeEl.style.display = 'block';
      headerSection.replaceWith(makeHeaderSection(IDE, preId));
      inputSection.style.display = 'flex';
      outerConsoleSection.style.display = 'flex';
      if (mobileBottom) {
        mobileBottom.remove();
      }
      inputAndTabBar.style.display = 'flex';
      UiContainer.style.height = '100%';
      UiContainer.style.display = 'flex';
      UiContainer.style.width = '40%';
    }

    Object.assign(
      headerSection.style,
      CSS[preId][ideCache[preId].theme].headerSectionStyle.container
    );
    Object.assign(
      headerTitle.style,
      CSS[preId][ideCache[preId].theme].headerSectionStyle.title
    );
    Object.assign(
      sideBar.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.sideBarStyle.container
    );
    Object.assign(
      inputAndGraphicSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.container
    );
    Object.assign(resizeHandle.style, CSS[preId][ideCache[preId].theme].resizeBar);
    Object.assign(
      resizeConsoleHandle.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.consoleSectionStyle
        .resizeBar
    );
    Object.assign(
      resizeIdeHandle.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.resizeBar
    );
    Object.assign(
      inputSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.inputSectionStyle.container
    );
    Object.assign(
      contentSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.container
    );
    Object.assign(
      QuorumUIContainer.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.graphicSectionStyle.container
    );
    Object.assign(
      sizeBox.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle
        .inputAndGraphicSectionStyle.graphicSectionStyle.sizeBox
    );
    Object.assign(
      consoleSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.consoleSectionStyle
        .text
    );
    Object.assign(
      outerConsoleSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.consoleSectionStyle
        .outerContainer
    );
    Object.assign(IDE.style, CSS[preId].mainContainer);
    Object.assign(
      codeOutputSection.style,
      CSS[preId][ideCache[preId].theme].contentSectionStyle.codeOutputStyle.container
    );
    if (textarea) {
      mimicTextAreaStyle(textarea);
      updateCodeEditorDisplay(textarea);
    }
    updateFromCookie(IDE);
  });
  console.timeEnd('switchMobileDesktop');
}
