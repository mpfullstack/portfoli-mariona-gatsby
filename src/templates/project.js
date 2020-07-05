import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProjectDetail from '../components/project/projectDetail';
import { isDevice } from '../helpers';

export default ({ data }) => {
  const project = data.allStrapiProject.edges[0].node;
  const blocks = data.allStrapiBlocks.edges;
  return (
    <Layout hideMenu={isDevice()}>
      <ProjectDetail project={project} blocks={blocks} />
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    allStrapiProject (
      filter: {
      	strapiId: { eq: $id }
      }
    ) {
      edges {
        node {
          id
          title
          meta_description
          creation_date
          credits
          content
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
          mobile {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiBlocks (
      filter: {
        project: {
          id: { eq: $id }
        }
      },
      sort: {
        fields: order,
        order: ASC
      }
    ) {
      edges {
        node {
          id
          content
          title
          blocktype {
            qname
          }
          order
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
`
