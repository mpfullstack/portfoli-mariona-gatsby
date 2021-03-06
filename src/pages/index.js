import React from "react";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ProjectList from '../components/project/projectList';

const IndexPage = ({ location, data }) => {
  const intl = useIntl();
  return (
    <Layout location={location}>
      <SEO title={intl.formatMessage({ id: "projectTitle" })} lang={intl.locale} />
      <h1 style={{display: 'none'}}>{intl.formatMessage({ id: "projectTitle" })}</h1>
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
          title_es
          seo_url
          seo_url_es
          tags {
            name
            name_es
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
