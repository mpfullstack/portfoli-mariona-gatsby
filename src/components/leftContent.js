import React, { useState } from 'react';
import styled from 'styled-components';
import SiteMenu from './layout/siteMenu';
import SocialLinks from './layout/socialLinks';
import Button from './button';
import ContactForm from './form/contact';
import { Animated } from "react-animated-css";

const LeftContent = styled.section`
  min-width: 340px;
  height: 650px;
  position: fixed;
  .left-inner-content {
    max-width: 240px;
    position: ${props => {
      if (props.theme.windowDimensions().height < 720) {
        return 'fixed'
      } else {
        return 'absolute';
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
    &,
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

  return (
    <LeftContent>

      <SiteMenu location={location} />

      <div className='left-inner-content'>

        <Animated className='intro' isVisible={section === 'intro'}
          animationIn={'fadeIn'} animationOut='fadeOut'
          animationInDelay={250}
          animationOutDuration={500}
          animationInDuration={1500}>
            <h1>Research.<br /> Think.<br /> Create.</h1>
            <p>{`Hi, my name is `}<br /><strong>Mariona Mercadal</strong> and<br />{` I'm a UX & UI designer`}</p>
            <SocialLinks />
            <Button className='contact-form-button' onClick={(e) => setSection('contact-form')}>{`Let's talk`}</Button>
        </Animated>

        <Animated isVisible={section === 'contact-form'}
          animationInDelay={250}
          animationIn={'fadeInRight'}
          animationOut='fadeOutRight'>
            <ContactForm onClickBack={() => setSection('intro')}/>
        </Animated>

      </div>

    </LeftContent>
  );
}
