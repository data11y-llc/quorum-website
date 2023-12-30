export const UiKitColors = {
  quorum: {
    blue: {
      _150: 'rgba(18,90,119,1)',
      _100: 'rgba(6,149,208,1)',
      _50: 'rgba(117,189,219,1)',
      _25: 'rgba(172,209,223,1)',
      _10: 'rgba(238,250,254,1)',
    }
  },
  neutral: {
    black: 'rgba(0,0,0,1)',
    grey: {
      _95: 'rgba(32,32,32,1)',
      _85: 'rgba(43,43,43,1)',
      _75: 'rgba(54,54,55,1)',
      _65: 'rgba(64,64,64,1)',
      _50: 'rgba(101,101,101,1)',
      _40: 'rgba(114,114,114,1)',
      _25: 'rgba(215,215,215,1)',
      _15: 'rgba(229,230,230,1)',
      _10: 'rgba(246,246,247,1)',
    },
    white: 'rgba(255,255,255,1)',
  },
  text: {
    neutral: {
      black: 'rgba(0,0,0,1)',
      grey: {
        _95: 'rgba(32,32,32,1)',
        _10: 'rgba(246,246,247,1)',
      },
      white: 'rgba(255,255,255,1)',
    },
    hico: {
      red: 'rgba(190,11,0,1)',
      blue: 'rgba(58,220,255,1)',
      yellow: 'rgba(255,230,0,1)',
      orange: 'rgba(255,168,0,1)',
      green: 'rgba(0, 255, 148, 1)',
      pink: 'rgba(254, 124, 217, 1)',
      grey: 'rgba(229, 230, 230, 1)',
    },
    dark: {
      green: 'rgba(175,254,217,1)',
      yellow: 'rgba(255,244,149,1)',
      blue: 'rgba(172,209,223,1)',
      pink: 'rgba(249, 161, 198, 1)',
      orange: 'rgba(249, 161, 198, 1)',
      grey: 'rgba(173, 173, 173, 1)',
      purple: 'rgba(215, 154, 253, 1)',
    },
    light: {
      purple: 'rgba(130,0,101,1)',
      blue: 'rgba(16,69,172,1)',
      pink: 'rgba(204,5,55,1)',
      orange: 'rgba(157,75,0,1)',
      green: 'rgba(41,116, 6, 1)',
      red: 'rgba(107,0,0,1)',
      grey: 'rgba(101, 101, 101, 1)',
    },
  },

  primary: {
    hover: 'rgba(1,115,163,1)',
  },
  accent: {
    hover: 'rgba(58,142,177,1)',
  },
  highcontrast: {
    hover: 'rgba(0,159,193,1)',
  },
  secondary: {
    red: {
      _100: 'rgba(148,9,1,1)',
      _50: 'rgba(188,118,114,1)',
    },
    orange: 'rgba(255,136,17,1)',
    green: 'rgba(5,134,45,1)',
    hover: {
      grey: 'rgba(199,197,197,1)',
      red: 'rgba(115,7,1,1)',
    },
  },
  attention: {
    red: {
      _25: 'rgba(255,116, 116,1)',
      _100: 'rgba(255,0,0,1)',
    },
  },
  gradients: {
    text: {
      light: 'linear-gradient(90deg, #202020 50%, #202020 50%, rgba(32, 32, 32, 0) 96.34%)',
      dark: 'linear-gradient(90deg, #F6F6F7 37.8%, rgba(246, 246, 247, 0) 101.11%)',
      highcontrast: 'linear-gradient(90deg, #FFFFFF 16.67%, rgba(255, 255, 255, 0) 101.11%)',
      grey: {
        _65: 'linear-gradient(90deg, #414040 7.78%, rgba(65, 64, 64, 0) 101.11%)',
        _40: 'linear-gradient(90deg, #727272 1.11%, rgba(114, 114, 114, 0) 101.11%)',
        _25: 'linear-gradient(90deg, #D7D7D7 3.33%, rgba(215, 215, 215, 0) 98.89%)',
        _10: 'linear-gradient(90deg, #F6F6F7 1.11%, rgba(246, 246, 247, 0) 101.11%)',
      },
    },
  },
  transparency: {
    primary: 'rgba(6,149,208,0.5)',
    accent: 'rgba(58,142,177,0.5)',
    hico: 'rgba(0,159,193,0.5)',
  },
} as const;
