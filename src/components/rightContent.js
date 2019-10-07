import React from 'react';
import styled from 'styled-components';
import SiteMenu from './layout/siteMenu';
import SocialLinks from './layout/socialLinks';
import Button from './button';

const RightContent = styled.section`
  width: 100%;
  max-width: 870px;
  float: right;
`;

export default ({ children }) => (
    <RightContent>
      {children}
    </RightContent>
);
