import React from "react";
import { Link } from "gatsby";
import Img from 'gatsby-image';
import styled from 'styled-components';
import theme from '../theme';

const ProjectListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  .project-item {
    height: 100vh;
    position: relative;
  }
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
  }
  .background {
    position: absolute;
    width: 100%;
    top: 150px;
    left: 0;
    height: 500px;
    z-index: 0;
    &.background--purple {
      background-color: ${theme.colors.purple};
    }
    &.background--green {
      background-color: ${theme.colors.green};
    }
  }
`;

const ProjectList = ({ projects }) => {
  return (
    <ProjectListWrapper>
      {
        projects.map( ({ node }) => {
          return (
            <li className='project-item'>
              <ImageContainer>
                <Img fluid={node.image.childImageSharp.fluid} />
                <div className={`background background--${node.background}`} />
              </ImageContainer>
              {
                node.tags.map(tag => {
                  return <span>{tag.name}</span>
                })
              }
              <Link to={`/${node.seo_url}`}>{node.title}</Link>
            </li>
          )
        })
      }
    </ProjectListWrapper>
  );
}

export default ProjectList;
