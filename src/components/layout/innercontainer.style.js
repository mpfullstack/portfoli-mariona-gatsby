import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px 0;
  max-width: ${theme.sizes.contentWidth};
  @media (max-width: ${theme.sizes.small}) {
    margin: 55px auto 0;
  }
`;
