import React from "react";
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { useIntl } from 'gatsby-plugin-intl';
import Img from 'gatsby-image';
import styled from 'styled-components';
import ImageContainer from './imageContainer.style';
import theme from '../../theme';
import leftArrow from '../../images/leftArrow.png';
import rightArrow from '../../images/rightArrow.png';
import { buildLink, getField, buildPathUrl } from "../../helpers";

const ProjectNavigatorWrapper = styled.div`
  .project-navigator {
    position: absolute;
    left: 0;
    bottom: 125px;
    width: 100%;
    z-index: 1000;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      bottom: -10px;
    }
    .project-navigator-title {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      font-family: Montserrat;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        padding-left: 20px;
        padding-bottom: 10px;
      }
    }
    .project-inner-navigator {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .project-item-image {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .background {
          top: 0;
          height: 80px;
        }
        .desktop-img {
          max-width: 125px;
          width: 100%;
          margin-bottom: 25px;
          @media only screen and (max-width: ${theme.SIZES.M}) {
            display: block;
            width: 110px;
            position: absolute;
            top: -20px;
          }
        }
        .project-title {
          margin: 0;
          text-transform: uppercase;
          font-size: 14px;
          color: ${theme.textColor};
          z-index: 100;
          font-weight: 600;
          @media only screen and (max-width: ${theme.SIZES.M}) {
            .project-title-text {
              display: none;
            }
          }
        }
        @media only screen and (max-width: ${theme.SIZES.M}) {
          height: 120px;
          .background {
            display: inherit;
            height: 120px;
          }
        }
      }
      .previous {
        position: relative;
        width: 45%;
        .project-title {
          margin-left: 10px;
          padding-left: 10px;
          &::before {
            content: ' ';
            background: url(${leftArrow}) no-repeat 0 0;
            width: 28px;
            height: 13px;
            display: inline-block;
            background-size: 18px auto;
          }
        }
        .desktop-img {
          @media only screen and (max-width: ${theme.SIZES.M}) {
            right: 20px;
          }
        }
      }
      .next {
        position: relative;
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
        width: 45%;
        .project-title {
          margin-right: 10px;
          padding-right: 10px;
          &::after {
            content: ' ';
            background: url(${rightArrow}) no-repeat right 0;
            width: 28px;
            height: 13px;
            display: inline-block;
            background-size: 18px auto;
          }
        }
        .desktop-img {
          @media only screen and (max-width: ${theme.SIZES.M}) {
            left: 20px;
          }
        }
      }
    }
  }
`;

const ProjectNavigator = ({ next, previous }) => {
  const intl = useIntl();
  const nextProjectPathUrl = buildPathUrl(next, intl.locale);
  const previousProjectPathUrl = buildPathUrl(previous, intl.locale);
  return (
    <ProjectNavigatorWrapper>
      <div className='project-navigator'>
        <p className='project-navigator-title'>{intl.formatMessage({ id: 'moreProjects' })}</p>
        <div className='project-inner-navigator'>
          <div className='previous'>
            <AniLink fade to={buildLink(previousProjectPathUrl, intl.locale)} className='anylink'>
              <ImageContainer className='project-item-image'>
                <p className='project-title'><span className='project-title-text'>{getField(previous, 'title', intl.locale)}</span></p>
                <div className='background' style={{backgroundColor: previous.color.hex_code}} />
                <div className='img desktop-img'><Img fluid={previous.image.childImageSharp.fluid} /></div>
              </ImageContainer>
            </AniLink>
          </div>
          <div className='next'>
            <AniLink fade to={buildLink(nextProjectPathUrl, intl.locale)} className='anylink'>
              <ImageContainer className='project-item-image'>
                <div className='background' style={{backgroundColor: next.color.hex_code}} />
                <div className='img desktop-img'><Img fluid={next.image.childImageSharp.fluid} /></div>
                <p className='project-title'><span className='project-title-text'>{getField(next, 'title', intl.locale)}</span></p>
              </ImageContainer>
            </AniLink>
          </div>
        </div>
      </div>
    </ProjectNavigatorWrapper>
  );
}

export default ProjectNavigator;