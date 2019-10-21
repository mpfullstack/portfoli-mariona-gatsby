import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ProjectList from '../components/project/projectList';

const IndexPage = ({ location, data }) => {
  return (
    <Layout location={location}>
      <SEO title="Portfolio Mariona Mercadal" />
      <h1 style={{display: 'none'}}>Portfolio Mariona Mercadal</h1>
      <ProjectList projects={data.allStrapiProject.edges} />
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query{
    allStrapiProject {
      edges {
        node {
          id
          title
          seo_url
          background
          tags {
            name
          }
          color {
            hex_code
          }
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
