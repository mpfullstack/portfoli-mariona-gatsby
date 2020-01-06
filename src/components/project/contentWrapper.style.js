import styled from 'styled-components';
import theme from '../../theme';
import arrow from './arrow.png';

export default styled.div`
  width: 48%;
  top: 380px;
  left: 440px;
  position: absolute;
  z-index: 10;
  @media only screen and (max-width: ${theme.SIZES.L}) {
    width: 100%;
    top: 470px;
    left: 100px;
  }
  @media only screen and (max-width: ${theme.SIZES.M}) {
    width: 90%;
    top: 450px;
    left: 30px;
  }
  @media only screen and (max-height: 600px) {
    top: 375px;
  }
  .know-more {
    color: ${theme.linkColor};
    font-family: Montserrat;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    &::after {
      content: url(${arrow});
      padding-left: 4px;
      top: 2px;
      position: relative;
    }
  }
`;
