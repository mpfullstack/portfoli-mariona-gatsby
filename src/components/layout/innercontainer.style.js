import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  margin: 0 auto;
  padding: ${theme.innerContainerPadding};
  max-width: ${theme.sizes.maxInnerContentWidth};
`;
