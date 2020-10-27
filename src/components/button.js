import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../theme';

const ButtonWrapper = styled.div`
  button {
    width: 100%;
    background-color: ${theme.buttonBackgroundColor};
    color: ${theme.buttonTextColor};
    border: none;
    text-transform: uppercase;
    text-align: center;
    font-family: Nunito;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.15em;
    border-radius: 100px;
    height: 44px;
    padding: 0 70px;
    transition: box-shadow .5s ease;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 10px 20px rgba(163, 201, 199, 0.48);
      transition: box-shadow .5s ease;
    }
  }
  &.clean-button {
    button {
      width: auto;
      height: auto;
      background-color: transparent;
      border: none;
      color: transparent;
      border-radius: inherit;
      box-shadow: none;
      transition: none;
      padding: 0;
      margin: 0;
    }
  }
`;

const Button = ({ children, onClick, ...rest }) => {
  return (
    <ButtonWrapper>
      <button onClick={e => onClick(e)} {...rest}>{children}</button>
    </ButtonWrapper>
  );
}

const CleanButton = ({ children, onClick, ...rest }) => {
  return (
    <ButtonWrapper className='clean-button'>
      <button onClick={e => onClick(e)} {...rest}>{children}</button>
    </ButtonWrapper>
  );
}

Button.propTypes = {
  onClick: PropTypes.func
}

export { CleanButton };
export default Button;
