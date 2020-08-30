import React, { useEffect, useState } from "react";
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
import ProjectBlock from './projectBlock';
import { isDevice } from '../../helpers';
import ArrowUp from './arrowUp';
import { CleanButton } from '../../components/button';
import {ProjectDetailWrapper, ProjectDetailInnerWrapper } from './projectDetailWrapper.style';

const moment = require('moment');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const ProjectDetail = ({ project, blocks }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [arrowUpVisible, setArrowUpVisible] = useState(false);
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
      <Scrollbar style={{ height: isDevice() ? '100vh' : '90vh' }} scrollTop={scrollTop} onScroll={scrollValues => {
        setScrollTop(scrollValues.scrollTop);
        if (scrollValues.scrollTop > 250) {
          setArrowUpVisible(true);
        } else {
          setArrowUpVisible(false);
        }
      }}>
        <ImageContainer className='project-item-image'>
          <div id='mobile-img' className='img mobile-img'><Img fluid={project.mobile.childImageSharp.fluid} /></div>
        </ImageContainer>
        <ProjectDetailInnerWrapper>
          <ImageContainer className='project-item-image'>
            <div id='background' className='background' style={{backgroundColor: project.color.hex_code}} />
            <div id='img' className='img desktop-img'><Img fluid={project.image.childImageSharp.fluid} /></div>
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
                blocks.map(({ node }) => (
                  <ProjectBlock
                    node={node}
                    project={project}
                    blockType={node.blocktype.qname} />
                ))
              }
            </Animated>
          </ContentWrapper>
        </ProjectDetailInnerWrapper>
      </Scrollbar>
      <Animated className='arrow-up-container' animationIn='fadeIn' animationOut='fadeOut' isVisible={arrowUpVisible}
        animateOnMount={false} animationInDuration={300} animationOutDuration={300}>
        <CleanButton onClick={e => setScrollTop(0)}><ArrowUp /></CleanButton>
      </Animated>
    </ProjectDetailWrapper>
  );
}

export default ProjectDetail;
