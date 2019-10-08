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
const sizes = {
  small: '768px',
  contentWidth: '1280px'
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

// Transitions
// -------------------------------------------------------
const transitions = {
  ease: 'width 0.5s ease, box-shadow 0.5s ease !important'
};

export default {
  backgroundColor,
  textColor,
  titleColor,
  tagColor,
  menuBackgroundColor,
  buttonTextColor,
  buttonBackgroundColor,
  colors,
  sizes,
  transitions
};
