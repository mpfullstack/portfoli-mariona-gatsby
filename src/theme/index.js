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
const getScreenSize = width => {
  if (width < 479) {
    return 'xs';
  } else if (width < 767) {
    return 's';
  } else if (width < 991) {
    return 'm';
  } else if (width < 1280) {
    return 'l';
  } else {
    return 'xl';
  }
}

const sizes = {
  small: '768px',
  maxInnerContentWidth: '1280px'
}

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

// Variants
// const innerContainerWidth = theme.variants('mode', 'variant', {
//   xs: { light: 'gray', dark: 'darkgray' },
//   x: { light: 'blue', dark: 'darkblue' },
//   m: { light: 'green', dark: 'darkgreen' },
//   l: { light: 'orange', dark: 'darkorange' },
//   xl: { light: 'orange', dark: 'darkorange' }
// });

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
  // Constants
  colors,
  sizes,
  transitions,
  // Helpers methods
  getScreenSize
};
