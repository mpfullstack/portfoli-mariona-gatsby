import React from "react";
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Img from 'gatsby-image';
import styled from 'styled-components';
import ImageContainer from './imageContainer.style';
import theme from '../../theme';
import leftArrow from '../../images/leftArrow.png';
import rightArrow from '../../images/leftArrow.png';

const ProjectNavigatorWrapper = styled.div`
  .project-navigator {
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;
    .project-navigator-title {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      font-family: Montserrat;
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
        }
        .project-title {
          margin: 0;
          text-transform: uppercase;
          font-size: 14px;
          color: ${theme.textColor};
          z-index: 100;
          font-weight: 600;
        }
      }
      .previous {
        position: relative;
        width: 35%;
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
      }
      .next {
        position: relative;
        margin-left: auto;
        width: 35%;
        .project-title {
          margin-right: 10px;
          &::after {
            content: ' ';
            background: url(${rightArrow}) no-repeat 0 0;
            width: 28px;
            height: 13px;
            display: inline-block;
            background-size: 18px auto;
          }
        }
      }
    }
  }
`;

const ProjectNavigator = ({ next, previous }) => {
  return (
    <ProjectNavigatorWrapper>
      <div className='project-navigator'>
        <p className='project-navigator-title'>More projects</p>
        <div className='project-inner-navigator'>
          <div className='previous'>
            <AniLink fade to={`/${previous.seo_url}`}>
              <ImageContainer className='project-item-image'>
                <p className='project-title'>{previous.title}</p>
                <div id='background' className='background' style={{backgroundColor: previous.color.hex_code}} />
                <div id='img' className='img desktop-img'><Img fluid={previous.image.childImageSharp.fluid} /></div>
              </ImageContainer>
            </AniLink>
          </div>
          <div className='next'>
            <AniLink fade to={`/${next.seo_url}`}>
              <ImageContainer className='project-item-image'>
                <div id='background' className='background' style={{backgroundColor: next.color.hex_code}} />
                <div id='img' className='img desktop-img'><Img fluid={next.image.childImageSharp.fluid} /></div>
                <p className='project-title'>{next.title}</p>
              </ImageContainer>
            </AniLink>
          </div>
        </div>
      </div>
    </ProjectNavigatorWrapper>
  );
}

export default ProjectNavigator;