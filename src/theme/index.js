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
})

export default {
  backgroundColor,
  textColor,
  titleColor,
  colors,
  sizes
};
