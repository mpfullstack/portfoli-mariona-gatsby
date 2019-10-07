import React from 'react';
import styled from 'styled-components';

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
