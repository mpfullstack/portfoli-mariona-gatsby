import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../theme';

const ButtonWrapper = styled.div`
  button {
    background-color: ${theme.buttonBackgroundColor};
    color: ${theme.buttonTextColor};
    border: none;
    text-transform: uppercase;
    text-align: center;
    font-family: Nunito;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.15em;
    box-shadow: 0px 10px 20px rgba(163, 201, 199, 0.48);
    border-radius: 100px;
    height: 44px;
    padding: 0 70px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Button = ({ children, onClick, ...rest }) => {
  return (
    <ButtonWrapper>
      <button onClick={onClick} {...rest}>{children}</button>
    </ButtonWrapper>
  );
}

Button.propTypes = {
  onClick: PropTypes.func
}

export default Button;
