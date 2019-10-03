import React from 'react';
import { Link } from "gatsby"
import styled from 'styled-components';
import theme from '../theme';

const LeftContent = styled.section`
  flex-basis: 400px;
  min-width: 400px;
  h1 {
    font-size: 36px;
    line-height: 49px;
    font-weight: normal;
  }
  p {
    font-size: 16px;
    line-height: 22px;
  }
`;

export default () => (
  <LeftContent>
    <div>
      <ul>
        <li><Link to='/'>Works</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </div>
    <h1>Research.<br /> Think.<br /> Create</h1>
    <p>{`Hi, my name is `}<br /><strong>Mariona Mercadal</strong> and<br />{` I'm a UX & UI designer`}</p>
    <div>{`Social Links`}</div>
    <button>{`Let's talk`}</button>
  </LeftContent>
);
