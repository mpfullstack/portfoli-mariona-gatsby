import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const InputWrapper = styled.div`
  width: 100%;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  input,
  textarea {
    font-size: 16px;
    font-family: Nunito;
    border: none;
    background-color: transparent;
    position: relative;
    width: 100%;
    display: block;
    padding: 3px 4px;
    color: ${theme.textColor};
    &:focus + .border-bottom + .border-bottom-focus {
      background-color: ${theme.borderInputColorHover};
      height: 2px;
      width: 100%;
      transition: width .5s ease !important;
    }
  }
  textarea {
    height: 60px;
    overflow: hidden;
  }
  .border-bottom,
  .border-bottom-focus {
    width: 100%;
    background-color: ${theme.borderInputColor};
    height: 1px;
    position: absolute;
    bottom: 0;
  }
  .border-bottom-focus {
    width: 0;
  }
`;

export default ({ children }) => {
  return (
    <InputWrapper>
      {children}
      <span className='border-bottom' />
      <span className='border-bottom-focus' />
    </InputWrapper>
  );
}
