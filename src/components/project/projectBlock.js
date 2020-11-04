import React from "react";
import styled from 'styled-components';
import Img from 'gatsby-image';
import Attribute from './attribute.js';
import theme from '../../theme';

const Block = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 0 80px 0;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    margin: 0;
  }
  .attribute {
    margin-top: 50px;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      width: 100% !important;
    }
  }
  &.img_left_title_text {
    .gatsby-image-wrapper {
      float: left;
      width: 46%;
      margin: 0 0 10px 0;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        width: 100%;
      }
    }
    .attribute {
      float: right;
      width: 39%;
      margin-top: 0;
    }
  }
  &.img_right_title_text {
    .gatsby-image-wrapper {
      float: right;
      width: 46%;
      margin: 0 0 10px 0;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        width: 100%;
      }
    }
    .attribute {
      float: left;
      width: 39%;
      margin-top: 0;
    }
  }
`;

const Image = ({ image }) => {
  return (
    image ?
      <Img fluid={image.childImageSharp.fluid} />
    :
      null
  );
}

const ProjectBlock = ({ block, project, blockType }) => {
  return (
    <Block key={`${project.id}-block-${block.id}`} className={`${blockType}`}>
      {
        blockType === 'full_image_title_text' || blockType === 'img_left_title_text' ?
          <React.Fragment>
            <Image image={block.image} />
            <Attribute name={block.title} value={block.content} />
          </React.Fragment>
        :
        blockType === 'img_right_title_text' ?
          <React.Fragment>
            <Attribute name={block.title} value={block.content} />
            <Image image={block.image} />
          </React.Fragment>
        :
        blockType === 'title_quoted_text' ?
          <React.Fragment>
            <Attribute name={block.title} value={block.content} quoted={true} />
          </React.Fragment>
        :
          null
      }
    </Block>
  );
}

export default ProjectBlock;
