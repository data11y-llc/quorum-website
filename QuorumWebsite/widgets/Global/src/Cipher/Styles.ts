import { ICssInterface } from './Types.js';
import type * as CSSType from 'csstype'

/**
  * used to add hover effect to a style
  */
export function hoverStyle(div: HTMLElement, ogStyle: CSSType.Properties, hoverStyle: CSSType.Properties) {
  div.onmouseover = function() {
    Object.assign(div.style, hoverStyle);
  }
  div.onmouseout = function() {
    Object.assign(div.style, ogStyle);
  }
  div.onfocus = function() {
    Object.assign(div.style, hoverStyle);
  }
  div.onblur = function() {
    Object.assign(div.style, ogStyle);
  }
}

export const CSS: ICssInterface = {
  ariaLive: {
    left: '-10000px',
    position: 'absolute',
    top: '-10000px',
  },
  topSection: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '94%',
      height: 'fit-content',
      paddingTop: '2%',
      paddingLeft: '3%',
      paddingRight: '3%',
      backgroundColor: 'white',
    },
    sentenceAndOptions: {
      container: {
        width: '47%',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      header: {
        fontSize: '1.5em',
        fontFamily: 'monospace',
        marginBottom: '0',
      },
      sentence: {
        container: {
          alignItems: 'center',
          backgroundColor: 'lightblue',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          height: '250px',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
        },
        paragraph: {
          fontSize: '1.3em',
          margin: '0.5em',
          fontFamily: 'monospace',
        }
      },
      options: {
        container: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        dropdown: {
          height: '40px',
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '5px',
          fontSize: '1.0em',
        },
      }
    },
    instructions: {
      container: {
        width: '47%',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

      },
      header: {
        fontSize: '1.5em',
        fontFamily: 'monospace',
      },
      h2: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginTop: '5px',
        marginBottom: '5px',
      },
      h3: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginTop: '5px',
        marginBottom: '5px',
      },
      paragraph: {
        fontSize: '1.0em',
        marginTop: '0',
        marginBottom: '0',
      },
    },
  },
  sortSection: {
    header: {
      fontSize: '1.5em',
      fontFamily: 'monospace',
      marginTop: '0',
    },
    sortContainer: {
      display: 'flex',
      flexFlow: 'column nowrap',
      width: '95%',
      height: 'max-content',
      padding: '10px',
      borderRadius: '10px',
      // border: '1px dashed #ccc',
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '33%',
      alignItems: 'center',
      height: '100%',
      paddingTop: '10px',
    },
    tabContentContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      width: '97%',
      backgroundColor: 'white',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      borderTopRightRadius: '5px',
      border: '5px double lightblue'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      height: 'max-content',
      padding: '10px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
    tabButtons: {
      button: {
        height: '40px',
        border: 'none',
        backgroundColor: 'lightblue',
        color: 'black',
        cursor: 'pointer',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        padding: '5px',
      },
      inactive: {
        backgroundColor: 'white',
        outline: 'none',
      },
      active: {
        backgroundColor: 'lightblue',
        outline: 'none',
      },
      hover: {
        outline: '0.5px solid black',
      },
      container: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        backgroundColor: 'white',
        borderRadius: '5px',
      },
    },
  },
  buttonStyles: {
    disabled: {
      backgroundColor: 'lightgrey',
      border: 'none',
      cursor: 'not-allowed',
    },
    enabled: {
      cursor: 'pointer',
    },
    lr: {
      alignItems: 'center',
      backgroundColor: '#e6e6e6',
      border: '1px solid black',
      borderRadius: '10%',
      display: 'flex',
      marginLeft: '5px',
      marginRight: '5px',
      padding: '0.2em',
      width: '20px',
    },
    lrHover: {
      backgroundColor: '#d9d9d9',
    },
    main: {
      border: '1px solid #000',
      borderRadius: '10px',
      boxShadow: '0 0 5px #ccc',
      cursor: 'pointer',
      margin: '10px',
      padding: '12px',
      width: 'fit-content',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    SortHover: {
      backgroundColor: '#CCDFFF',
    },
    blue: {
      backgroundColor: 'rgb(174, 219, 240)',
    },
    blueHover: {
      //make this a lighter blue
      backgroundColor: 'rgb(174, 219, 240, 0.5)',
    },
    darkBlue: {
      backgroundColor: 'rgb(48, 79, 155)',
      color: 'white',
    },
    darkBlueHover: {
      backgroundColor: 'rgb(48, 79, 155, 0.5)',
    },
    orange: {
      backgroundColor: 'rgb(255, 166, 35)',
    },
    orangeHover: {
      backgroundColor: 'rgb(255, 166, 35, 0.5)',
    },

  },

  containerStyles: {
    cipherLoader: {
      alignItems: 'center',
      border: '1px solid #000',
      borderRadius: '10px',
      boxShadow: '0 0 10px #000',
      display: 'flex',
      flexDirection: 'column',
      width: '1100px',
      paddingBottom: '10px',
    },
    letter: {
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      border: '5px double #ccc',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: '50px',
      width: 'fit-content',
    },
    quorumChart: {
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '25vh',
      minHeight: '300px',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      zIndex: '1',
      border: '1px solid #000',
    },
    largerChart: {
      height: '40vh'
    }
  },

  letterStyles: {
    header: {
      fontSize: '1.5em',
      fontFamily: 'monospace',
      marginLeft: '-40px',
      marginTop: '0',
    },
    labels: {
      ogLabel: {
        position: 'relative',
        whiteSpace: 'nowrap',
        top: '15px',
        left: '-35px',
        height: '0px',
        padding: '0px',
        margin: '0px',
        width: '0px',
        fontSize: '10px',
      },
      lockedLabel: {
        position: 'relative',
        whiteSpace: 'nowrap',
        top: '12px',
        left: '-35px',
        height: '0px',
        width: '0px',
        padding: '0px',
        margin: '0px',
        fontSize: '10px',
      },
      unlockedLabel: {
        position: 'relative',
        whiteSpace: 'nowrap',
        padding: '0px',
        margin: '0px',
        top: '10px',
        left: '-40px',
        height: '0px',
        width: '0px',
        fontSize: '10px',
      },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      borderBottom: '1px solid #ccc',
      margin: '10px',
      padding: '10px',
      paddingLeft: '50px',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: `repeat(26, 1fr)`,
    },
    buttons: {
      borderRadius: '10%',
      fontSize: '1em',
      margin: '0.2em',
      padding: '0.2em',
      textAlign: 'center',
      width: '2em',
      height: '2em',
      maxWidth: '2em',
      maxHeight: '2em',
    },
    letterdiv: {
      borderRadius: '10%',
      margin: '0.2em',
      padding: '0.2em',
      textAlign: 'center',
      width: '1.6em',
      height: '1.6em',
    },
    marked: {
      border: '1px red solid',
    },
    locked: {
      backgroundColor: 'white',
      border: '1px solid black',
    },
    unlocked: {
      backgroundColor: 'lightgrey',
      border: 'none',
    },
    original: {
      backgroundColor: 'transparent',
      border: 'none',
    },
  },

  offsetStyle: {
    container: {
      alignItems: 'flex-start',
      display: 'flex',
      flexFlow: 'row wrap',
      padding: '10px',
    },
    input: {
      width: '50px',
    }
  },
}
