import styled from 'styled-components';
import theme from '../../theme';

console.log(theme);

export default styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px 0;
  max-width: ${theme.sizes.contentWidth};
  @media (max-width: ${theme.sizes.small}) {
    margin: 55px auto 0;
  }
  border: ${props => {
    alert(JSON.stringify(props.theme.size()));
    if (props.theme.size().height < 600)
      return '1px solid red'
    else
      return '1px solid blue'
  }}
`;
