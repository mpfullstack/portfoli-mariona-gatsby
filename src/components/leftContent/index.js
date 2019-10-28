import React, { useState } from 'react';
import styled from 'styled-components';
import { Animated } from "react-animated-css";
import SiteMenu from '../layout/menu';
import SocialLinks from '../layout/socialLinks';
import Button from '../button';
import ContactForm from '../form/contact';
import MobileWorksButton from './mobileWorksButton';
import theme from '../../theme';

const LeftContent = styled.section`
  width: 340px;
  height: 650px;
  position: fixed;
  margin: 0 auto;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    width: 90%;
    height: 100vh;
    position: static;
  }
  .left-inner-content {
    width: 100%;
    height: auto;
    max-width: 240px;
    position: absolute;
    bottom: 0;
    @media only screen and (max-height: 719px) {
      bottom: 30px;
    }
    @media only screen and (max-width: ${theme.SIZES.M}) {
      height: 82vh;
      position: fixed;
      max-width: 300px;
    }
    h1 {
      font-size: 36px;
      line-height: 49px;
      font-weight: normal;
      margin-top: 0;
      @media only screen and (min-height: 720px) {
        margin-top: 169px;
      }
      @media only screen and (max-width: ${theme.SIZES.M}) {
        margin-top: 0;
        font-size: 52px;
        line-height: 64px;
      }
    }
    p {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 10px;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        font-size: 22px;
        line-height: 30px;
      }
    }
    .contact-form-button {
      margin-top: 50px;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        display: none;
      }
    }
    & .intro {
      bottom: 0;
      top: inherit;
      position: absolute;
      @media only screen and (max-height: 719px) {
        bottom: 40px;
      }
      @media only screen and (max-width: ${theme.SIZES.M}) {
        top: 100px;
        position: fixed;
      }
    }
    & .social-links-wrapper {
      margin-top: 30px;
    }
    & .contact {
      bottom: 0;
      position: absolute;
      width: 100%;
    }
  }
`;

const handleMobileWorksClick = e => {
  e.persist();
  console.log(e);
}

export default ({ location }) => {
  const [section, setSection] = useState('intro');
  const [isFirstTime, setFirstTime] = useState(true);

  // Intro content component
  const Intro = () => {
    const Content = () => (
      <div>
        <h1>Research.<br /> Think.<br /> Create.</h1>
        <p>{`Hi, my name is `}<br /><strong>Mariona Mercadal</strong> and<br />{` I'm a UX & UI designer`}</p>
        <div className='social-links-wrapper'>
          <SocialLinks />
        </div>
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
        <Animated className='contact' isVisible={section === 'contact-form'}
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

      {
        section === 'intro'
        ?
        <MobileWorksButton onClick={handleMobileWorksClick} />
        :
        null
      }

    </LeftContent>
  );
}
