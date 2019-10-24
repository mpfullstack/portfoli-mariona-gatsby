import React, { useState } from "react";
// import AniLink from 'gatsby-plugin-transition-link/AniLink';
// import styled from 'styled-components';
// import theme from '../../theme';
import Img from 'gatsby-image';
// import { Scrollbars } from 'react-custom-scrollbars';
import Scrollbar from 'react-scrollbars-custom';
import SEO from '../seo';
import TagContainer from '../layout/tagContainer.style';
import Tag from '../tag';
import ProjectTitle from './projectTitle.style';
import { Animated } from "react-animated-css";

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const ProjectDetail = ({ project }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <SEO title={project.title} description={project.meta_description} />
      {/*<Scrollbars style={{ height: '90vh' }} autoHide autoHideTimeout={1500} autoHideDuration={600}>*/}
      <Scrollbar style={{ height: '90vh' }} onScroll={scrollValues => {
        console.log('onScroll', scrollValues.scrollTop);
        if (scrollValues.scrollTop > 500)
          setVisible(true);
      }}>
        <div style={{width: '98%'}}>
          <TagContainer>
            {project.tags.map((tag, j) => <Tag key={`project-item-tag-${j}`}>{tag.name}</Tag>)}
          </TagContainer>
          <ProjectTitle>{project.title}</ProjectTitle>
          <div dangerouslySetInnerHTML={{ __html: md.render(project.content) }}/>
          {
            project.blocks.map((block,i) => {
              return (
                <Animated
                  animationIn={'fadeInLeft'}
                  animationInDuration={1500}
                  isVisible={visible} style={{visibility: visible ? 'inherit': 'hidden'}}>
                  <div>
                    <p>{block.title}</p>
                    <p>{block.content}</p>
                    {
                      block.image
                      ?
                      <Img fluid={block.image.childImageSharp.fluid} />
                      :
                      null
                    }
                  </div>
                </Animated>
              );
            })
          }
        </div>
      </Scrollbar>
    </div>
  );
}

export default ProjectDetail;
