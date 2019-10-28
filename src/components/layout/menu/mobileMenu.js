import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import MenuIcon from './menuIcon';

const MobileMenu = styled.div`
  width: auto;
  .text {
    font-size: 14px;
    font-weight: bold;
    font-family: Montserrat;
    text-transform: uppercase;
    line-height: 17px;
    color: ${theme.textColor};
    display: inline-block;
    margin-right: 4px;
  }
  .icon {
    display: inline-block;
  }
`;

export default ({ text, opened }) => {
  return (
    <MobileMenu>
      <div className='text'>{text}</div>
      <div className='icon'><MenuIcon state={opened ? 'opened' : null} /></div>
    </MobileMenu>
  );
}
