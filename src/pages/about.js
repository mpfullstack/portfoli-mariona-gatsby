import React from "react"
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import theme from '../theme';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const AboutPageWrapper = styled.div`
  display: flex;
  position: relative;
  .background-image {
    width: 100%;
    max-width: 500px;
    position: absolute;
    top: 25%;
    left: 0;
    background-color: #E8F5E0;
    height: 450px;
    z-index: 0;
    opacity: .6;
  }
  .image-container {
    position: relative;
    z-index: 1;
    width: 30%;
    margin-left: 20px;
  }
  .text-container {
    position: relative;
    z-index: 1;
    width: 60%;
    margin-left: auto;
    margin-top: 80px;
    .introduction {
      font-size: 32px;
      line-height: 1.5;
    }
    .content {
      p {
        font-size: 16px;
      }
    }
    .cv {
      font-size: 16px;
      a {
        color: ${theme.textColor};
        text-transform: uppercase;
        font-weight: 800;
      }
    }
  }
`;

const AboutPage = ({ location, data }) => {
  const { introduction, content, image, document } = data.allStrapiPage.edges[0].node;

  return (
    <Layout location={location}>
      <SEO title="Portfolio Mariona Mercadal" />
      <AboutPageWrapper>
        <div className='background-image'></div>
        <div className='image-container'>
          <Img fluid={image.childImageSharp.fluid} />
        </div>
        <div className='text-container'>
          <div className='introduction' dangerouslySetInnerHTML={{ __html: md.render(introduction) }}/>
          <div className='content' dangerouslySetInnerHTML={{ __html: md.render(content) }}/>
          <p className='cv'><a href={document.publicURL}>Download CV</a></p>
        </div>
      </AboutPageWrapper>
    </Layout>
  );
}

export default AboutPage;

export const query = graphql`
  query {
    allStrapiPage(filter: {qname: {eq: "about"}}) {
      edges {
        node {
          id
          qname
          title
          content
          introduction
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          document {
            publicURL
            ext
          }
        }
      }
    }
  }
`