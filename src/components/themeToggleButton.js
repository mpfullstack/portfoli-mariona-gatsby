import React from "react"
import PropTypes from "prop-types"

function ThemeToggleButton(props) {
  const { setThemeMode, mode } = props;
  return (
    <button onClick={() => {
      document.documentElement.classList.add('color-theme-in-transition');
      setThemeMode(mode === 'dark' ? 'light' : 'dark')
      window.setTimeout(() => document.documentElement.classList.remove('color-theme-in-transition'), 1000);
    }}>
      Click me
    </button>
  );
}

ThemeToggleButton.propTypes = {
  setThemeMode: PropTypes.func,
  mode: PropTypes.string
}

export default ThemeToggleButton;
