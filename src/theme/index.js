import theme from 'styled-theming';

// Colors
// ------------------------------------------------------
const colors = {
  primary: '#6cc3bf',
  superDarkGrey: '#222222',
  darkGrey: '#444444',
  mediumGrey: '#737373',
  lightGrey: '#bbbbbb',
  superLightGrey: '#f9f9f9',
  purple: '#eeeefc',
  green: '#e8f5e0'
}

// Sizes
// ------------------------------------------------------
// Function that returns the current screen size string value (xs, s, m, l, xl) based on width
// Ref. https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
const SIZES = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL'
};
// const { XS, S, M, L XL } = ...SIZES;

let _screenSize;

const getScreenSize = width => {
  if (!width)
    return _screenSize;
  if (width < 479) {
    _screenSize =  SIZES.XS;
  } else if (width < 767) {
    _screenSize = SIZES.S;
  } else if (width < 991) {
    _screenSize = SIZES.M;
  } else if (width < 1280) {
    _screenSize = SIZES.L;
  } else {
    _screenSize = SIZES.XL;
  }
  return _screenSize;
}

const sizes = {
  small: '768px',
  maxInnerContentWidth: '1280px'
}

const screenSizeThemeFactory = (sizes, defaultValue) => {
  const defaults = {};
  for (let size in SIZES) {
    if (!(size in sizes)) {
      defaults[size] = defaultValue
    }
  }
  return theme('screenSize', {...sizes, ...defaults});
}

const screenMode = {
  rightContentMaxWidth: screenSizeThemeFactory(
    { L: '65%', XL: '870px' },
    '100%'
  ),
  mainContainerWidth: screenSizeThemeFactory(
    { L: '100%', XL: '100%' },
    '98%'
  ),
  mainContainerMargin: screenSizeThemeFactory(
    { L: '0', XL: '0' },
    '0 1%'
  ),
  mainContainerPadding: screenSizeThemeFactory(
    { L: '40px 0 0 0', XL: '40px 0 0 0' },
    '0'
  ),
  innerContainerPadding: screenSizeThemeFactory(
    { L: '20px 20px 0', XL: '20px 20px 0' },
    '0'
  ),
  leftContentHeight: screenSizeThemeFactory(
    { L: '650px', XL: '650px' },
    '100vh'
  ),
  leftContentWidth: screenSizeThemeFactory(
    { L: '340px', XL: '340px' },
    '90%'
  ),
  leftInnerContentMaxWidth: screenSizeThemeFactory(
    { L: '240px', XL: '240px' },
    '88%'
  ),
  leftContentPosition: screenSizeThemeFactory(
    { L: 'fixed', XL: 'fixed' },
    'static'
  ),
  leftInnerContentPosition: screenSizeThemeFactory(
    { L: 'absolute', XL: 'absolute' },
    'fixed'
  ),
  leftInnerContentHeight: screenSizeThemeFactory(
    { L: 'auto', XL: 'auto' },
    '82vh'
  ),
  siteMenuPadding: screenSizeThemeFactory(
    { L: '0 20px 0 0', XL: '0 20px 0 0' },
    '0'
  )
};

// Theme definitions
// ------------------------------------------------------
const backgroundColor = theme('mode', {
  light: colors.superLightGrey,
  dark: colors.superDarkGrey
});
const textColor = theme('mode', {
  light: colors.mediumGrey,
  dark: colors.lightGrey
});
const titleColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.lightGrey
});
const tagColor = theme('mode', {
  light: colors.lightGrey,
  dark: colors.mediumGrey
});
const menuBackgroundColor = theme('mode', {
  light: 'rgba(108, 195, 191, 0.6)',
  dark: 'rgba(108, 195, 191, 0.6)'
});
const buttonBackgroundColor = theme('mode', {
  light: colors.primary,
  dark: colors.primary
});
const buttonTextColor = theme('mode', {
  light: '#ffffff',
  dark: colors.darkGrey
});
const navigatorItemColor = theme('mode', {
  light: colors.lightGrey,
  dark: colors.mediumGrey
});
const selectedNavigatorItemColor = theme('mode', {
  light: colors.primary,
  dark: colors.mediumGrey
});
const borderInputColor = theme('mode', {
  light: colors.lightGrey,
  dark: colors.darkGrey
});
const borderInputColorHover = theme('mode', {
  light: colors.primary,
  dark: colors.darkGrey
});
const labelColor = theme('mode', {
  light: colors.lightGrey,
  dark: colors.darkGrey
});

// Transitions
// -------------------------------------------------------
const transitions = {
  ease: 'width 0.5s ease, box-shadow 0.5s ease !important'
};

export default {
  // Theme functions
  backgroundColor,
  textColor,
  titleColor,
  tagColor,
  menuBackgroundColor,
  buttonTextColor,
  buttonBackgroundColor,
  navigatorItemColor,
  selectedNavigatorItemColor,
  borderInputColor,
  borderInputColorHover,
  labelColor,
  ...screenMode,
  // Constants
  colors,
  sizes,
  SIZES,
  transitions,
  // Helpers methods
  getScreenSize
};
