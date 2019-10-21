import React from 'react';
import styled from 'styled-components';
import SiteMenu from './layout/siteMenu';
import SocialLinks from './layout/socialLinks';
import Button from './button';

const LeftContent = styled.section`
  min-width: 320px;
  height: 650px;
  position: fixed;
  .left-inner-content {
    position: fixed;
    bottom: 10px;
    h1 {
      font-size: 36px;
      line-height: 49px;
      font-weight: normal;
      /*margin-top: 150px;*/
    }
    p {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 50px;
    }
    .contact-form-button {
      margin-top: 50px;
    }
  }
`;

export default ({ location }) => (
    <LeftContent>
        <SiteMenu location={location} />
        <div className='left-inner-content'>
          <h1>Research.<br /> Think.<br /> Create.</h1>
          <p>{`Hi, my name is `}<br /><strong>Mariona Mercadal</strong> and<br />{` I'm a UX & UI designer`}</p>
          <SocialLinks />
          <Button className='contact-form-button'>{`Let's talk`}</Button>
        </div>
    </LeftContent>
);
