import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const RightContent = styled.section`
  width: 100%;
  max-width: ${theme.rightContentMaxWidth};
  float: right;
`;

export default ({ children }) => (
    <RightContent>
      {children}
    </RightContent>
);
