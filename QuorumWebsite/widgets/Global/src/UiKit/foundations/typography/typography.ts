import type * as CSS from 'csstype'
interface TypographyObject {
  [key: string]: {
    [key: string]: CSS.Properties
  };
}

const fontSize = {
  title: {
    display1: '48px',
    displaySub: '32px',
    title1: '32px',
    title2: '24px',
    title3: '20px',
    title4: '18px',
    title5: '16px',
  },
  text: {
    xlText: '20px',
    lgText: '18px',
    mText: '16px',
    smText: '14px',
    xsText: '12px',
  },
  code: {
    lgText: '18px',
    mText: '16px',
    smText: '14px',
    xsText: '12px',
  }
}

const fontWeight = {
  title: {
    display1: 'bold',
    displaySub: 'medium',
    title1: 'bold',
    title2: 'bold',
    title3: 'bold',
    title4: 'bold',
    title5: 'bold',
  },
  text: {
    xlText: 'regular',
    lgText: 'regular',
    mText: 'regular',
    smText: 'regular',
    xsText: 'regular',
  },
  code: {
    lgText: 'regular',
    mText: 'regular',
    smText: 'regular',
    xsText: 'regular',
  }
}


const fontFamily = {
  title: 'Montserrat',
  text: 'Montserrat',
  code: 'Consolas',
}


export const Typography: TypographyObject = {
  title: {
    display1: {
      fontSize: fontSize.title.display1,
      fontWeight: fontWeight.title.display1,
      fontFamily: fontFamily.title,
    },
    displaySub: {
      fontSize: fontSize.title.displaySub,
      fontWeight: fontWeight.title.displaySub,
      fontFamily: fontFamily.title,
    },
    title1: {
      fontSize: fontSize.title.title1,
      fontWeight: fontWeight.title.title1,
      fontFamily: fontFamily.title,
    },
    title2: {
      fontSize: fontSize.title.title2,
      fontWeight: fontWeight.title.title2,
      fontFamily: fontFamily.title,
    },
    title3: {
      fontSize: fontSize.title.title3,
      fontWeight: fontWeight.title.title3,
      fontFamily: fontFamily.title,
    },
    title4: {
      fontSize: fontSize.title.title4,
      fontWeight: fontWeight.title.title4,
      fontFamily: fontFamily.title,
    },
    title5: {
      fontSize: fontSize.title.title5,
      fontWeight: fontWeight.title.title5,
      fontFamily: fontFamily.title,
    },
  },
  text: {
    xlText: {
      fontSize: fontSize.text.xlText,
      fontWeight: fontWeight.text.xlText,
      fontFamily: fontFamily.text,
    },
    lgText: {
      fontSize: fontSize.text.lgText,
      fontWeight: fontWeight.text.lgText,
      fontFamily: fontFamily.text,
    },
    mText: {
      fontSize: fontSize.text.mText,
      fontWeight: fontWeight.text.mText,
      fontFamily: fontFamily.text,
    },
    smText: {
      fontSize: fontSize.text.smText,
      fontWeight: fontWeight.text.smText,
      fontFamily: fontFamily.text,
    },
    xsText: {
      fontSize: fontSize.text.xsText,
      fontWeight: fontWeight.text.xsText,
      fontFamily: fontFamily.text,
    },
  },
  code: {
    lgText: {
      fontSize: fontSize.code.lgText,
      fontWeight: fontWeight.code.lgText,
      fontFamily: fontFamily.code,
    },
    mText: {
      fontSize: fontSize.code.mText,
      fontWeight: fontWeight.code.mText,
      fontFamily: fontFamily.code,
    },
    smText: {
      fontSize: fontSize.code.smText,
      fontWeight: fontWeight.code.smText,
      fontFamily: fontFamily.code,
    },
    xsText: {
      fontSize: fontSize.code.xsText,
      fontWeight: fontWeight.code.xsText,
      fontFamily: fontFamily.code,
    },
  },
};



