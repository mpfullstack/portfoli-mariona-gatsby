import React, { useEffect } from "react";
// import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Scrollbar from 'react-scrollbars-custom';
import SEO from '../seo';
import TagContainer from '../layout/tagContainer.style';
import Tag from '../tag';
import ProjectTitle from './projectTitle.style';
import { Animated } from "react-animated-css";
import AnimatedInView from '../animatedInView';
import ImageContainer from './imageContainer.style';
import ContentWrapper from './contentWrapper.style';
import Attribute from './attribute.js';

const moment = require('moment');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const ProjectDetailWrapper = styled.div`
  .ScrollbarsCustom-Track {
    display: none;
  }
  p {
    font-size: 16px;
  }
  @media only screen and (min-width: 991px) {
    .project-item-image {
      .background {
        transition: transform 1s ease-in .2s, height 1s ease-in .2s;
        &.animate {
          transform: scaleX(2.5) translateY(-100px);
          height: 224px;
        }
      }
      .img {
        transition: margin-top 1s ease-in .2s;
        &.animate {
          margin-top: 70px;
        }
      }
    }
    .project-content {
      transition: top 1s ease-in .2s;
      &.animate {
        top: 95px;
      }
    }
    .extra-content {
      .attribute {
        width: 50%;
        display: inline-block;
        vertical-align: top;
      }
    }
    .project-blocks {
      width: 100%;
      left: 0;
      top: 75vh;
      @media only screen and (max-height: 875px) {
        top: 85vh;
      }
      @media only screen and (max-height: 800px) {
        top: 90vh;
      }
    }
  }
`;

const ProjectDetail = ({ project, blocks }) => {
  // const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Start project detail css animations
    const background = document.getElementById('background');
    background.classList.add('animate');
    const img = document.getElementById('img');
    img.classList.add('animate');
    const projectContent = document.getElementById('project-content');
    projectContent.classList.add('animate');
  });

  return (
    <ProjectDetailWrapper>
      <SEO title={project.title} description={project.meta_description} />
      <Scrollbar style={{ height: '90vh' }} onScroll={scrollValues => {
        // if (scrollValues.scrollTop > 500)
        //   setVisible(true);
      }}>
        <div style={{width: '100%'}}>
          <ImageContainer className='project-item-image'>
            <div id='background' className='background' style={{backgroundColor: project.color.hex_code}} />
            <div id='img' className='img'><Img fluid={project.image.childImageSharp.fluid} /></div>
          </ImageContainer>

          <ContentWrapper id='project-content' className='project-content'>
            <TagContainer>
              {project.tags.map((tag, j) => <Tag key={`project-item-${project.id}-tag-${j}`}>{tag.name}</Tag>)}
            </TagContainer>
            <ProjectTitle>{project.title}</ProjectTitle>
          </ContentWrapper>

          <ContentWrapper className='extra-content'>
            <AnimatedInView animationIn='fadeInRight' animationInDelay={1000} animationInDuration={1000} offset={0}>
              <Attribute name='Date' value={moment(project.creation_date).format('MMMM YYYY')} />
              <Attribute name='Credits' value={project.credits} />
              <div dangerouslySetInnerHTML={{ __html: md.render(project.content) }}/>
            </AnimatedInView>
          </ContentWrapper>

          <ContentWrapper className='project-blocks'>
            <Animated animationIn='fadeInRight' animationInDelay={1000} animationInDuration={1000}>
            {
              blocks.map(({ node }) => {
                // TODO: Layout block based on node.blocktype.qname
                console.log('block', node.blocktype.qname);
                return (
                    <div key={`${project.id}-block-${node.id}`}>
                      {
                        node.image
                        ?
                        <Img fluid={node.image.childImageSharp.fluid} />
                        :
                        null
                      }
                      <Attribute name={node.title} value={node.content} />
                    </div>
                );
              })
            }
            </Animated>
          </ContentWrapper>
        </div>
      </Scrollbar>
    </ProjectDetailWrapper>
  );
}

export default ProjectDetail;
