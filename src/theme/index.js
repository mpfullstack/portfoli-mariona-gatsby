import theme from 'styled-theming';

// Colors
// ------------------------------------------------------
const COLORS = {
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
// Ref. https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
// ------------------------------------------------------
const SIZES = {
  XS: '478px',
  S: '766px',
  M: '990px',
  L: '1279px'
};

// Theme definitions
// ------------------------------------------------------
const backgroundColor = theme('mode', {
  light: COLORS.superLightGrey,
  dark: COLORS.superDarkGrey
});
const textColor = theme('mode', {
  light: COLORS.mediumGrey,
  dark: COLORS.lightGrey
});
const titleColor = theme('mode', {
  light: COLORS.darkGrey,
  dark: COLORS.lightGrey
});
const tagColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.mediumGrey
});
const menuBackgroundColor = theme('mode', {
  light: 'rgba(108, 195, 191, 0.6)',
  dark: 'rgba(108, 195, 191, 0.6)'
});
const buttonBackgroundColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.primary
});
const buttonTextColor = theme('mode', {
  light: '#ffffff',
  dark: COLORS.darkGrey
});
const navigatorItemColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.mediumGrey
});
const selectedNavigatorItemColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.mediumGrey
});
const borderInputColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.darkGrey
});
const borderInputColorHover = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.darkGrey
});
const labelColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.darkGrey
});

// Transitions
// -------------------------------------------------------
const TRANSITIONS = {
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
  // Constants
  COLORS,
  SIZES,
  TRANSITIONS
};
