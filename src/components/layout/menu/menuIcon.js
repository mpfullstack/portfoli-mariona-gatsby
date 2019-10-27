import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';

const MenuIconWrapper = styled.div`
  width: 14px;
  height: 10px;
  position: relative;
  & span {
    transition: width .3s ease;
  }
  &:hover span {
    width: 100%;
    transition: width .3s ease;
  }
`;

const Line = styled.span`
  width: 96%;
  height: 2px;
  background-color: ${theme.textColor};
  position: absolute;
  top: 44%;
  left: 0;
  border-radius: 2px;
  &:first-child {
    top: 0;
    width: 78%;
  }
  &:last-child {
    top: 84%;
    width: 78%;
  }
`;

// To close
// translate(1px, 3px) rotate(45deg)

export default () => {
  return (
    <MenuIconWrapper>
      <Line />
      <Line />
      <Line />
    </MenuIconWrapper>
  );
}
