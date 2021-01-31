import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import theme from '../../theme';
import worksArrow from '../../images/worksArrow.png';

const WorksButtonWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  @media only screen and (min-width: ${theme.SIZES.M}) {
    display: none;
  }
  .background {
    width: 160px;
    height: 128px;
    background-color: ${theme.backgroundWorksButtonColor};
    opacity: .5;
  }
  .text {
    position: fixed;
    bottom: 54px;
    right: 88px;
    z-index: 10000;
    color: ${theme.textWorksButtonColor};
    font-family: Nunito;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 22px;
    letter-spacing: 0.15em;
    &:after {
      content: url(${worksArrow});
      margin-left: 10px;
      top: 2px;
      position: relative;
    }
  }
`;

export default ({ onClick }) => {
  const intl = useIntl();

  return (
    <div onClick={e => onClick(e)}>
      <WorksButtonWrapper>
        <div className='background' />
        <div className='text'>{intl.formatMessage({ id: 'works' })}</div>
      </WorksButtonWrapper>
    </div>
  )
}
