import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const NavigatorWrapper = styled.div`
  width: 15px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const NavigatorItem = styled.div`
  border: 3px solid ${theme.navigatorItemColor};
  box-sizing: border-box;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  margin: 10px 0;
  cursor: pointer;
  &.selected,
  &:hover {
    border: 3px solid ${theme.selectedNavigatorItemColor};
    background-color: ${theme.selectedNavigatorItemColor};
  }
  &.selected {
    margin-top: 150px;
  }
`;

const Span = styled.span`
  transform-origin: 13px -47px;
  transform: rotate(-90deg);
  width: 140px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.15em;
  color: ${theme.textColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Navigator = ({ items }) => {
  return (
    <NavigatorWrapper>
      <NavigatorItem></NavigatorItem>
      <NavigatorItem></NavigatorItem>
      <NavigatorItem className='selected'></NavigatorItem>
      <Span>Easy monit</Span>
      <NavigatorItem style={{marginTop: '-10px'}}></NavigatorItem>
    </NavigatorWrapper>
  );
}

Navigator.propTypes = {
  items: PropTypes.array
}

export default Navigator;
