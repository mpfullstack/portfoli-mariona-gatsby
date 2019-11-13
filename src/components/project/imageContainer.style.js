import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 650px;
  position: absolute;
  top: 0;
  left: 0;
  vertical-align: bottom;
  .gatsby-image-wrapper {
    z-index: 1;
    width: 90%;
  }
  .background {
    position: absolute;
    width: 100%;
    top: 150px;
    left: 0;
    height: 500px;
    z-index: 0;
    opacity: .5;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      height: 200px;
    }
  }
`;
