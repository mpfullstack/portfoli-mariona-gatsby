import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProjectDetail from '../components/project/projectDetail';

export default ({ data }) => {
  const project = data.allStrapiProject.edges[0].node;
  return (
    <Layout>
      <ProjectDetail project={project} />
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    allStrapiProject (
      filter: {
      	id: { eq: $id }
      }
    ) {
      edges {
        node {
          id
          title
          meta_description
          content
          tags {
            name
          }
          color {
            hex_code
          }
          blocks {
            content
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
