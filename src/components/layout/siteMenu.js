import React from 'react';
import { Link } from "gatsby";
import styled from 'styled-components';
import theme from '../../theme';

const SiteMenu = styled.div`
  .menu {
    text-align: right;
    padding: 0 20px 0 0;
    margin: 0;
    .item {
      list-style-type: none;
      padding: 0;
      a {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 800;
        text-align: right;
        text-transform: uppercase;
        line-height: 20px;
        position: relative;
        color: ${theme.textColor};
        z-index: 1;
        &::after {
          z-index: -1;
          content: "";
          height: 12px;
          background-color: ${theme.menuBackgroundColor};
          width: 0;
          position: absolute;
          top: 42%;
          left: -5px;
        }
        &:hover {
          &::after {
            width: calc(100% + 10px);
            -webkit-transition: ${theme.transitions.ease};
            -moz-transition: ${theme.transitions.ease};
            -ms-transition: ${theme.transitions.ease};
            -o-transition: ${theme.transitions.ease};
            transition: ${theme.transitions.ease};
          }
        }
      }
    }
  }
`;

export default () => (
  <SiteMenu>
    <ul className='menu'>
      <li className='item'><Link to='/'>Works</Link></li>
      <li className='item'><Link to='/about'>About</Link></li>
    </ul>
  </SiteMenu>
);
