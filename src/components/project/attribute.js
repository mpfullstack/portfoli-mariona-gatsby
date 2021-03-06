import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const Attribute = styled.p`
  .property {
    width: 100%;
    display: block;
    &.property-name {
      font-size: 14px;
      font-weight: 600;
      font-family: Montserrat;
      line-height: 17px;
      letter-spacing: .15em;
      color: ${theme.tagColor};
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    &.property-value {
      font-size: 16px;
      font-weight: 300;
      line-height: 22px;
      color: ${theme.textColor};
    }
    &.quoted {
      font-size: 30px;
      font-style: italic;
      font-weight: 300;
      line-height: 41px;
      &:after,
      &:before {
        content: '"';
      }
    }
  }
`;

export default ({ name, value, quoted = false }) => {
  return (
    <Attribute className='attribute'>
      <span className='property property-name'>{name}</span>
      <span className={`property property-value${quoted ? ' quoted' : ''}`}>{value}</span>
    </Attribute>
  );
};
