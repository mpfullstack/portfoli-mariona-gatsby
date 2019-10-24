import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const FieldWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;
  height: 70px;
  &:last-child {
    margin-bottom: 0;
    height: auto;
    overflow: inherit;
  }
  label {
    width: 100%;
    display: block;
    font-family: Montserrat;
    font-size: 10px;
    color: ${theme.labelColor};
    text-transform: uppercase;
    font-weight: 600;
    padding-left: 4px;
    position: absolute;
    bottom: 0;
    transition: bottom .5s ease !important;
    &.default-position {
      bottom: 26px;
    }
  }
  &.focus label {
    bottom: 26px;
    transition: bottom .5s ease !important;
  }
  &.explainMe-field {
    height: 100px;
    &.focus label {
      bottom: 55px;
    }
  }
`;

export default ({ className, children }) => {
  return (
    <FieldWrapper className={className}>
      {children}
    </FieldWrapper>
  );
}
