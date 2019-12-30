import React from "react";
import styled from 'styled-components';
import theme from '../theme';

const Tag = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.15em;
  color: ${theme.tagColor};
  text-transform: uppercase;
  white-space: nowrap;
  &::after {
    content: '/';
    padding: 0 5px;
  }
`;

export default ({ children }) => {
  return (
    <Tag className='tag'>{children}</Tag>
  );
}
