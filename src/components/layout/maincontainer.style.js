import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  background-color: ${theme.backgroundColor};
  width: 100%;
  margin: 0;
  padding: 40px 0 0 0;
  height: 100%;
  min-height: 100vh;
  color: ${theme.textColor};
  @media only screen and (max-width: ${theme.SIZES.M}) {
    padding: 0;
  }
`;
