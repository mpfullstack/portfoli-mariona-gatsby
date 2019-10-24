import React, { useState } from 'react';
import styled from 'styled-components';
import SiteMenu from './layout/siteMenu';
import SocialLinks from './layout/socialLinks';
import Button from './button';
import ContactForm from './form/contact';
import { Animated } from "react-animated-css";
import theme from '../theme';

const LeftContent = styled.section`
  width: ${theme.leftContentWidth};
  height: ${theme.leftContentHeight};
  position: ${theme.leftContentPosition};
  margin: 0 auto;
  .left-inner-content {
    width: 100%;
    height: ${theme.leftInnerContentHeight};
    max-width: ${theme.leftInnerContentMaxWidth};
    position: ${theme.leftInnerContentPosition};
    bottom: ${props => {
      if ([theme.SIZES.L, theme.SIZES.XL].find(s => String(s) === String(props.theme.screenSize))) {
        if (props.theme.windowDimensions().height < 720) {
          return '40px'
        } else {
          return '0';
        }
      } else {
        return '40px';
      }
    }};
    h1 {
      font-size: 36px;
      line-height: 49px;
      font-weight: normal;
      margin-top: ${props => props.theme.windowDimensions().height >= 720 && '169px'};
    }
    p {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 10px;
    }
    .contact-form-button {
      margin-top: 50px;
    }
    & .intro {
      bottom: ${props => {
        if (props.theme.windowDimensions().height < 720) {
          return '40px'
        } else {
          return 0;
        }
      }};
      position: ${props => {
        if (props.theme.windowDimensions().height < 720) {
          return 'fixed'
        } else {
          return 'absolute';
        }
      }};
    }
  }
`;

export default ({ location }) => {
  const [section, setSection] = useState('intro');
  const [isFirstTime, setFirstTime] = useState(true);

  // Intro content component
  const Intro = () => {
    const Content = () => (
      <div>
        <h1>Research.<br /> Think.<br /> Create.</h1>
        <p>{`Hi, my name is `}<br /><strong>Mariona Mercadal</strong> and<br />{` I'm a UX & UI designer`}</p>
        <SocialLinks />
        <Button className='contact-form-button' onClick={e => {
          setFirstTime(false);
          setSection('contact-form');
        }}>{`Let's talk`}</Button>
      </div>
    );

    if (!isFirstTime) {
      return (
        <Animated className='intro' isVisible={section === 'intro'}
          animationIn={'fadeIn'} animationOut='fadeOut'
          animationInDelay={250}
          animationOutDuration={500}
          animationInDuration={1500}>
            <Content />
        </Animated>
      );
    } else {
      return (
        <div className='intro'>
          <Content />
        </div>
      );
    }
  }

  // Contact component
  const Contact = () => {
    if (!isFirstTime) {
      return (
        <Animated isVisible={section === 'contact-form'}
        animationInDelay={250}
        animationIn={'fadeInRight'}
        animationOut='fadeOutRight'>
          <ContactForm onClickBack={() => setSection('intro')}/>
        </Animated>
      );
    } else {
      return null;
    }
  }

  return (
    <LeftContent>

      <SiteMenu location={location} />

      <div className='left-inner-content'>

        <Intro />

        <Contact />

      </div>

    </LeftContent>
  );
}
