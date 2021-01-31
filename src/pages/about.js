import React from 'react';
import { useIntl } from "gatsby-plugin-intl";
import { graphql } from 'gatsby';
import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import theme from '../theme';
import { getField } from '../helpers';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const AboutPageWrapper = styled.div`
  .about-container {
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
    @media only screen and (max-width: ${theme.SIZES.M}) {
      width: 90%;
      margin: 70px auto 0;
      display: flex;
      flex-direction: column;
      .background-image {
        top: 8%;
        height: 340px;
      }
      .image-container {
        width: 70%;
        position: inherit;
        margin: 0 0 0 20px;
      }
      .text-container {
        position: inherit;
        width: 100%;
        margin: 80px 0 0 0;
      }
    }
  }
  .ScrollbarsCustom-Wrapper {
    right: 0 !important;
  }
  .ScrollbarsCustom-Track {
    display: none;
  }
  .ScrollbarsCustom-Content {
    padding-bottom: 20px !important;
  }
`;

const AboutPage = ({ location, data }) => {
  const page = data.allStrapiPage.edges[0].node;
  const { image, cv } = page;
  const intl = useIntl();

  return (
    <Layout location={location}>
      <SEO title={intl.formatMessage({ id: "aboutTitle" })} lang={intl.locale} />
      <h1 style={{display: 'none'}}>{intl.formatMessage({ id: "aboutTitle" })}</h1>
      <AboutPageWrapper>
        <Scrollbar style={{ height: '100vh'}}>
          <div className='about-container'>
            <div className='background-image'></div>
            <div className='image-container'>
              <Img fluid={image.childImageSharp.fluid} />
            </div>
            <div className='text-container'>
              <div className='introduction' dangerouslySetInnerHTML={{ __html: md.render(getField(page, 'introduction', intl.locale))}}/>
              <div className='content' dangerouslySetInnerHTML={{ __html: md.render(getField(page, 'content', intl.locale))}}/>
              <p className='cv'><a href={cv.publicURL}>{intl.formatMessage({ id: 'downloadCV' })}</a></p>
            </div>
          </div>
        </Scrollbar>
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
          title_es
          content
          content_es
          introduction
          introduction_es
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          cv: document {
            publicURL
            ext
          }
        }
      }
    }
  }
`