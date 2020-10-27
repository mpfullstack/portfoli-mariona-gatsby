import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import arrowUpIcon from '../../images/upArrow.png';

const ArrowUpWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${theme.buttonBackgroundColor};
  box-shadow: 0px 10px 20px rgba(163, 201, 199, 0.48);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    background-repeat: no-repeat;
    width: 10px;
    height: 16px;
  }
`;

const ArrowUp = () => {
  return (
    <ArrowUpWrapper>
      <div className='icon' style={{backgroundImage: `url(${arrowUpIcon})`}} />
    </ArrowUpWrapper>
  );
}

export default ArrowUp;