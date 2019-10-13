import React from "react";
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Img from 'gatsby-image';
import styled from 'styled-components';
import theme from '../../theme';
import TagContainer from '../layout/tagContainer.style';
import Tag from '../tag';
import Navigator from '../navigator';
import arrow from './arrow.png';
import AnimatedInView from '../animatedInView';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProjectListWrapper = styled.div`
  flex-grow: 1;
  .project-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .project-item {
      height: 110vh;
      position: relative;
    }
  }
`;

const NavigatorWrapper = styled.div`
  flex-basis: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 650px;
  position: absolute;
  top: 0;
  left: 0;
  vertical-align: bottom;
  .gatsby-image-wrapper {
    z-index: 1;
    width: 90%;
  }
  .background {
    position: absolute;
    width: 100%;
    top: 150px;
    left: 0;
    height: 500px;
    z-index: 0;
    opacity: .5;
    &.background--purple {
      background-color: ${theme.colors.purple};
    }
    &.background--green {
      background-color: ${theme.colors.green};
    }
  }
`;

const ContentWrapper = styled.div`
  width: 48%;
  position: absolute;
  z-index: 10;
  top: 380px;
  left: 51%;
  .project-title {
    font-size: 32px;
    font-weight: normal;
    line-height: 44px;
    margin: 10px 0;
    a {
      color: ${theme.titleColor};
    }
  }
  .know-more {
    color: ${theme.textColor};
    font-family: Montserrat;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    &::after {
      content: url(${arrow});
      padding-left: 4px;
    }
  }
`;

const animationInDuration = 1400;

const ProjectList = ({ projects }) => {
  return (
    <Wrapper>
      <ProjectListWrapper>
        <ul className='project-list'>
          {
            projects.map( ({ node }, i) => {
              return (
                <li className='project-item' key={`project-item-${i}`} id={`project-item-${i}`} name={`project-item-${i}`}>
                  <ImageContainer>
                    <AnimatedInView animationIn='fadeInLeft' animationInDuration={animationInDuration}>
                      <div className={`background background--${node.background}`} />
                    </AnimatedInView>
                    <AnimatedInView animationIn='fadeInDown' animationInDelay={ i > 0 ? 200 : 0} animationInDuration={animationInDuration}>
                      <Img fluid={node.image.childImageSharp.fluid} />
                    </AnimatedInView>
                  </ImageContainer>
                  <ContentWrapper>
                    <AnimatedInView animationIn='fadeInRight' animationInDuration={animationInDuration}>
                      <TagContainer>
                        {node.tags.map((tag, j) => <Tag key={`project-item-${i}-tag-${j}`}>{tag.name}</Tag>)}
                      </TagContainer>
                      <h1 className='project-title'>
                        {<AniLink fade to={`/${node.seo_url}`}>{node.title}</AniLink>}
                      </h1>
                      <AniLink className='know-more' fade to={`/${node.seo_url}`}>Know more</AniLink>
                    </AnimatedInView>
                  </ContentWrapper>
                </li>
              )
            })
          }
        </ul>
      </ProjectListWrapper>
      <NavigatorWrapper>
        <Navigator items={projects} />
      </NavigatorWrapper>
    </Wrapper>
  );
}

export default ProjectList;
