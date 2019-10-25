import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import theme from '../../theme';

const SiteMenu = styled.div`
  .menu {
    text-align: right;
    padding: 0 20px 0 0;
    margin: 0;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      padding: 0;
    }
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
        letter-spacing: 0.15em;
        position: relative;
        color: ${theme.textColor};
        z-index: 1;
        &::after {
          z-index: -1;
          content: '';
          height: 12px;
          background-color: ${theme.menuBackgroundColor};
          width: 0;
          position: absolute;
          top: 42%;
          left: -5px;
        }
      }
      &.selected a,
      & a:hover {
        &::after {
          width: calc(100% + 8px);
          -webkit-transition: ${theme.TRANSITIONS.ease};
          -moz-transition: ${theme.TRANSITIONS.ease};
          -ms-transition: ${theme.TRANSITIONS.ease};
          -o-transition: ${theme.TRANSITIONS.ease};
          transition: ${theme.TRANSITIONS.ease};
        }
      }
    }
  }
`;

export default ({ location }) => {
  if (!location) {
    location = {
      pathname: '/'
    };
  }
  const menuItems = [
    {
      linkTo: '/',
      name: 'Works'
    },
    {
      linkTo: '/about',
      name: 'About'
    }
  ];
  return (
    <SiteMenu>
      <ul className='menu'>
      {
        menuItems.map(menuItem => {
          const itemCssClasses = ['item'];
          if (menuItem.linkTo === location.pathname) {
            itemCssClasses.push('selected');
          }
          return (
            <li className={itemCssClasses.join(' ')} key={menuItem.name}>
              {<AniLink fade to={menuItem.linkTo}>{menuItem.name}</AniLink>}
            </li>
          );
        })
      }
      </ul>
    </SiteMenu>
  );
}
