import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  background-color: ${theme.backgroundColor};
  width: ${theme.mainContainerWidth};
  margin: ${theme.mainContainerMargin};
  padding: ${theme.mainContainerPadding};
  height: 100%;
  min-height: 100vh;
  color: ${theme.textColor};
`;
