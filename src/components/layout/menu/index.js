import React, { useState } from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { Animated } from "react-animated-css";
import styled from 'styled-components';
import theme from '../../../theme';
import MobileMenu from './mobileMenu';
import { isDevice, isDesktop } from '../../../helpers';

const SiteMenu = styled.div`
  .mobile {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    cursor: pointer;
    z-index: 1001;
  }
  .mobile-menu-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    width: auto;
    cursor: pointer;
    z-index: 1002;
  }
  .menu {
    text-align: right;
    padding: 0 20px 0 0;
    margin: 0;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      padding: 40% 0 0 0;
      position: relative;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-color: ${theme.backgroundColor};
      z-index: 1000;
    }
    .item {
      list-style-type: none;
      padding: 0;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        height: 16%;
        text-align: center;
      }
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
        @media only screen and (max-width: ${theme.SIZES.M}) {
          font-size: 24px;
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

export default ({ location, onClickMenuCallBack }) => {
  const [isMobileMenuOpened, openMobileMenu] = useState(false);
  const [isFirstTime, setFirstTime] = useState(true);

  if (!location) {
    location = {
      pathname: '/'
    };
  }

  const menuItems = [];
  if (isDesktop()) {
    menuItems.push({
      linkTo: '/',
      name: 'Works'
    });
    menuItems.push({
      linkTo: '/about',
      name: 'About'
    });
  } else {
    menuItems.push({
      linkTo: '/',
      name: 'Home'
    });
    menuItems.push({
      linkTo: '/#works',
      name: 'Works'
    });
    menuItems.push({
      linkTo: '/about',
      name: 'About'
    });
    menuItems.push({
      linkTo: '/#contact',
      name: 'Contact'
    });
  }

  function handleOnClickMenu(e) {
    if (!isMobileMenuOpened) {
      setFirstTime(false);
    } else {
      setTimeout(() => {
        setFirstTime(true);
      }, 900);
    }
    openMobileMenu(!isMobileMenuOpened);
  }

  const Menu = () => (
    <ul className='menu'>
    {
      menuItems.map(menuItem => {
        const itemCssClasses = ['item'];
        if (menuItem.linkTo === location.pathname) {
          itemCssClasses.push('selected');
        }
        return (
          <li className={itemCssClasses.join(' ')} key={menuItem.name}>
            <AniLink onClick={e => {
              if (e.target.innerText === 'HOME') {
                handleOnClickMenu();
              }
              onClickMenuCallBack(e, isMobileMenuOpened);
            }} fade to={menuItem.linkTo}>{menuItem.name}</AniLink>
          </li>
        );
      })
    }
    </ul>
  );

  return (
    <SiteMenu>
      {
        isDevice()
        ?
        <div className='mobile-menu-wrapper disable-tap-highlight' onClick={e => handleOnClickMenu(e)}>
          <MobileMenu text={isMobileMenuOpened ? 'Close' : 'Menu'} opened={isMobileMenuOpened}/>
        </div>
        : null
      }
      {
        isDevice()
        ?
        <div className={`mobile disable-tap-highlight`}
          style={{display: isFirstTime ? 'none' : 'block'}}>
          <Animated animationIn={'slideInUp'} animationOut={'slideOutDown'} isVisible={isMobileMenuOpened}>
            <Menu />
          </Animated>
        </div>
        :
        <Menu />
      }
    </SiteMenu>
  );
}
