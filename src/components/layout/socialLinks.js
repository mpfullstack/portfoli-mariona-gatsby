import React from 'react';
import Icon from '../icon';
import styled from 'styled-components';
import theme from '../../theme';

const SocialLinks = styled.div`
  a {
    display: inline-block;
    margin-right: 40px;
    vertical-align: top;
    .behance {
      margin-top: -2px;
    }
  }
`;

export default () => (
  <SocialLinks>
    <a href='https://www.dribbble.com'>
      <Icon type='dribbble' size={24} color={[theme.COLORS.mediumGrey, theme.COLORS.primary]} />
    </a>
    <a href='https://www.dribbble.com'>
      <Icon type='linkedin' size={24} color={[theme.COLORS.mediumGrey, theme.COLORS.primary]} />
    </a>
    <a href='https://www.dribbble.com'>
      <Icon type='behance' size={28} color={[theme.COLORS.mediumGrey, theme.COLORS.primary]} />
    </a>
  </SocialLinks>
);
