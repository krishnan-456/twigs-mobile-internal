// ── Named sub-types for each token category ──
// Consumers can import these to type individual overrides.

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent50: string;
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;
  accent600: string;
  accent700: string;
  accent800: string;
  accent900: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  warning50: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  warning600: string;
  warning700: string;
  warning800: string;
  warning900: string;
  highlight50: string;
  highlight100: string;
  highlight200: string;
  highlight300: string;
  highlight400: string;
  highlight500: string;
  highlight600: string;
  highlight700: string;
  highlight800: string;
  highlight900: string;
  positive50: string;
  positive100: string;
  positive200: string;
  positive300: string;
  positive400: string;
  positive500: string;
  positive600: string;
  positive700: string;
  positive800: string;
  positive900: string;
  secondary50: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;
  negative50: string;
  negative100: string;
  negative200: string;
  negative300: string;
  negative400: string;
  negative500: string;
  negative600: string;
  negative700: string;
  negative800: string;
  negative900: string;
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
  black50: string;
  black100: string;
  black200: string;
  black300: string;
  black400: string;
  black500: string;
  black600: string;
  black700: string;
  black800: string;
  black900: string;
  white50: string;
  white100: string;
  white200: string;
  white300: string;
  white400: string;
  white500: string;
  white600: string;
  white700: string;
  white800: string;
  white900: string;
}

/** Space tokens in dp (density-independent pixels). Key is a scale number. */
export interface ThemeSpace {
  [key: string]: number;
}

/** Font size tokens in dp. */
export interface ThemeFontSizes {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
}

/** Font family tokens. */
export interface ThemeFonts {
  regular: string;
  medium: string;
  bold: string;
}

/** Font weight tokens (React Native expects string values). */
export interface ThemeFontWeights {
  [key: string]: string;
}

/** Line height tokens in dp. */
export interface ThemeLineHeights {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

/** Letter spacing tokens in dp. */
export interface ThemeLetterSpacings {
  [key: string]: number;
}

/** Component size tokens in dp. */
export interface ThemeSizes {
  [key: string]: number;
}

/** Border width tokens in dp. */
export interface ThemeBorderWidths {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/** Border style tokens. */
export interface ThemeBorderStyles {
  [key: string]: string;
}

/** Border radius tokens in dp. `round` and `pill` use 9999. */
export interface ThemeRadii {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  round: number;
  pill: number;
}

/** Shadow tokens (React Native shadow objects serialised as strings). */
export interface ThemeShadows {
  [key: string]: string;
}

/** Z-index tokens. */
export interface ThemeZIndices {
  [key: string]: number;
}

/** Transition duration tokens in milliseconds. */
export interface ThemeTransitions {
  [key: string]: number;
}

// ── Composite theme interface ──

export interface TwigsTheme {
  colors: ThemeColors;
  space: ThemeSpace;
  fontSizes: ThemeFontSizes;
  fonts: ThemeFonts;
  fontWeights: ThemeFontWeights;
  lineHeights: ThemeLineHeights;
  letterSpacings: ThemeLetterSpacings;
  sizes: ThemeSizes;
  borderWidths: ThemeBorderWidths;
  borderStyles: ThemeBorderStyles;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  zIndices: ThemeZIndices;
  transitions: ThemeTransitions;
}

// ── Default theme values ──
// All dimension tokens are React Native dp numbers (1rem web = 16dp).

export const defaultTheme: TwigsTheme = {
  colors: {
    primary: '#2E666D',
    secondary: '#363A43',
    accent50: '#F3F3FF',
    accent100: '#EAE9FE',
    accent200: '#D7D6FE',
    accent300: '#B9B5FD',
    accent400: '#978CF9',
    accent500: '#7158F5',
    accent600: '#623BEC',
    accent700: '#5329D8',
    accent800: '#4622B5',
    accent900: '#3B1E94',
    primary50: '#E6F5F6',
    primary100: '#B8E1E5',
    primary200: '#8ACCD2',
    primary300: '#5CB5BD',
    primary400: '#2E9CA6',
    primary500: '#00828D',
    primary600: '#006B74',
    primary700: '#00555C',
    primary800: '#003E43',
    primary900: '#00272A',
    warning50: '#FFF6EF',
    warning100: '#FEEAC7',
    warning200: '#FDD28A',
    warning300: '#FCBD4F',
    warning400: '#FBAB24',
    warning500: '#F59E0B',
    warning600: '#DB8D06',
    warning700: '#B47409',
    warning800: '#92610E',
    warning900: '#78510F',
    highlight50: '#FFFCDA',
    highlight100: '#FFF7AD',
    highlight200: '#FFF27D',
    highlight300: '#FFED4B',
    highlight400: '#FFE81A',
    highlight500: '#E6CF00',
    highlight600: '#B3A100',
    highlight700: '#807300',
    highlight800: '#786B03',
    highlight900: '#6A5F00',
    positive50: '#F4FAF1',
    positive100: '#E8F4E3',
    positive200: '#D4E8CA',
    positive300: '#A8D291',
    positive400: '#67B034',
    positive500: '#5EA130',
    positive600: '#55932A',
    positive700: '#4C8425',
    positive800: '#437720',
    positive900: '#3C691C',
    secondary50: '#F4F6F7',
    secondary100: '#E2E6EB',
    secondary200: '#C9CFD8',
    secondary300: '#A3AEBD',
    secondary400: '#76859A',
    secondary500: '#64748B',
    secondary600: '#4E596C',
    secondary700: '#444B5A',
    secondary800: '#3D424D',
    secondary900: '#363A43',
    negative50: '#FFF6F3',
    negative100: '#FDEDE8',
    negative200: '#FFDAD0',
    negative300: '#FFB4A1',
    negative400: '#FA7659',
    negative500: '#F65633',
    negative600: '#E75030',
    negative700: '#D14729',
    negative800: '#BC4024',
    negative900: '#A9371E',
    neutral50: '#F8F8F8',
    neutral100: '#F1F1F1',
    neutral200: '#E2E2E2',
    neutral300: '#C6C6C6',
    neutral400: '#9E9E9E',
    neutral500: '#919191',
    neutral600: '#848484',
    neutral700: '#757575',
    neutral800: '#575757',
    neutral900: '#111111',
    black50: '#0000000A',
    black100: '#00000014',
    black200: '#0000001A',
    black300: '#00000026',
    black400: '#00000033',
    black500: '#0000004D',
    black600: '#00000080',
    black700: '#000000B2',
    black800: '#000000CC',
    black900: '#000000',
    white50: '#FFFFFF0D',
    white100: '#FFFFFF14',
    white200: '#FFFFFF1A',
    white300: '#FFFFFF26',
    white400: '#FFFFFF33',
    white500: '#FFFFFF4D',
    white600: '#FFFFFF80',
    white700: '#FFFFFFB2',
    white800: '#FFFFFFCC',
    white900: '#FFFFFF',
  },

  // Space scale: key × 2dp  (1 = 2dp, 2 = 4dp, … 50 = 100dp)
  space: {
    '1': 2,
    '2': 4,
    '3': 6,
    '4': 8,
    '5': 10,
    '6': 12,
    '7': 14,
    '8': 16,
    '9': 18,
    '10': 20,
    '11': 22,
    '12': 24,
    '13': 26,
    '14': 28,
    '15': 30,
    '16': 32,
    '17': 34,
    '18': 36,
    '19': 38,
    '20': 40,
    '21': 42,
    '22': 44,
    '23': 46,
    '24': 48,
    '25': 50,
    '26': 52,
    '27': 54,
    '28': 56,
    '29': 58,
    '30': 60,
    '31': 62,
    '32': 64,
    '33': 66,
    '34': 68,
    '35': 70,
    '36': 72,
    '37': 74,
    '38': 76,
    '39': 78,
    '40': 80,
    '41': 82,
    '42': 84,
    '43': 86,
    '44': 88,
    '45': 90,
    '46': 92,
    '47': 94,
    '48': 96,
    '49': 98,
    '50': 100,
  },

  // Font sizes in dp (web rem × 16)
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 19.2,
    xl: 23.04,
    '2xl': 27.65,
    '3xl': 33.18,
    '4xl': 39.81,
    '5xl': 47.78,
  },

  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font weights as strings (React Native requirement)
  fontWeights: {
    '1': '100',
    '2': '200',
    '3': '300',
    '4': '400',
    '5': '500',
    '6': '600',
    '7': '700',
    '8': '800',
    '9': '900',
  },

  // Line heights in dp (web rem × 16)
  lineHeights: {
    xxs: 12,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64,
  },

  letterSpacings: {},

  // Component sizes in dp (web px = dp)
  sizes: {
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32,
    '9': 36,
    '10': 40,
    '11': 44,
    '12': 48,
    '13': 52,
    '14': 56,
    '15': 60,
    '16': 64,
    '17': 68,
    '18': 72,
    '19': 76,
    '20': 80,
    '21': 84,
    '22': 88,
    '23': 92,
    '24': 96,
    '25': 100,
    '26': 104,
    '27': 108,
    '28': 112,
    '29': 116,
    '30': 120,
    '31': 124,
    '32': 128,
    '33': 132,
    '34': 136,
  },

  // Border widths in dp
  borderWidths: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },

  borderStyles: {},

  // Border radii in dp. round/pill use 9999 (RN equivalent of 50%/9999px)
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 20,
    '4xl': 24,
    round: 9999,
    pill: 9999,
  },

  shadows: {
    sm: '0px 5px 15px rgba(0, 0, 0, 0.04)',
  },

  zIndices: {},

  // Transition durations in milliseconds
  transitions: {
    '1': 100,
    '2': 200,
    '3': 300,
  },
};
