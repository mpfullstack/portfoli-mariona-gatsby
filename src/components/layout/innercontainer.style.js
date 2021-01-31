import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px 0;
  max-width: 1280px;
  position: relative;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    padding: 0;
  }
`;
