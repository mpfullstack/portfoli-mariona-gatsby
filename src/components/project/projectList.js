import React from "react";
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Img from 'gatsby-image';
import styled from 'styled-components';
import theme from '../../theme';
import TagContainer from '../layout/tagContainer.style';
import Tag from '../tag';
import Navigator from '../navigator';
import arrow from './arrow.png';

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
      height: 100vh;
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

const ProjectList = ({ projects }) => {
  return (
    <Wrapper>
      <ProjectListWrapper>
        <ul className='project-list'>
          {
            projects.map( ({ node }) => {
              return (
                <li className='project-item'>
                  <ImageContainer>
                    <Img fluid={node.image.childImageSharp.fluid} />
                    <div className={`background background--${node.background}`} />
                  </ImageContainer>
                  <ContentWrapper>
                    <TagContainer>
                      {node.tags.map(tag => <Tag>{tag.name}</Tag>)}
                    </TagContainer>
                    <h1 className='project-title'>
                      {<AniLink fade to={`/${node.seo_url}`}>{node.title}</AniLink>}
                    </h1>
                    <AniLink className='know-more' fade to={`/${node.seo_url}`}>Know more</AniLink>
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
