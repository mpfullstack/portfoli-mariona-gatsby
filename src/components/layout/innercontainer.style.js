import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px 0;
  max-width: ${theme.sizes.maxInnerContentWidth};
  /*border: ${props => {
    console.log('props.theme.screenSize', props.theme.screenSize)
    if (props.theme.screenSize === 'xs')
      return '1px solid red';
    else
      return '1px solid blue';
  }}*/
`;
