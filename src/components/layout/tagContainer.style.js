import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  & > .tag:last-child {
    &::after {
      content: '';
    }
  }
`;
