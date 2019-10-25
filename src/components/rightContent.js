import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const RightContent = styled.section`
  width: 100%;
  max-width: 870px;
  float: right;
  @media only screen and (max-width: ${theme.SIZES.L}) {
    max-width: 65%;
  }
  @media only screen and (max-width: ${theme.SIZES.M}) {
    max-width: 100%;
  }
`;

export default ({ children }) => (
    <RightContent>
      {children}
    </RightContent>
);
