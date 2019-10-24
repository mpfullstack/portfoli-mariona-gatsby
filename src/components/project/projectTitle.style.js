import styled from 'styled-components';
import theme from '../../theme';

export default styled.h1`
  font-size: 32px;
  font-weight: normal;
  line-height: 44px;
  margin: 10px 0;
  &,
  & > a {
    color: ${theme.titleColor};
  }
`;
