import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProjectDetail from '../components/project/projectDetail';
import { isDevice } from '../helpers';

export default ({ data, path }) => {
  const project = data.currentProject.edges[0].node;
  const previous = data.previousProject.edges[0].node;
  const next = data.nextProject.edges[0].node;
  const blocks = project.blocks || [];

  return (
    <Layout hideMenu={isDevice()} project={project}>
      <ProjectDetail project={project} blocks={blocks} next={next} previous={previous} />
    </Layout>
  );
}

export const query = graphql`
  query($id: String!, $prevId: String!, $nextId: String!) {
    previousProject: allStrapiProject (
      filter: {
        strapiId: { eq: $prevId }
      }
    ) {
      edges {
        node {
          title
          title_es
          seo_url
          seo_url_es
          color {
            hex_code
          }
          image {
            childImageSharp {
              fluid(maxWidth: 220) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    nextProject: allStrapiProject (
      filter: {
        strapiId: { eq: $nextId }
      }
    ) {
      edges {
        node {
          title
          title_es
          seo_url
          seo_url_es
          color {
            hex_code
          }
          image {
            childImageSharp {
              fluid(maxWidth: 220) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    currentProject: allStrapiProject (
      filter: {
      	strapiId: { eq: $id }
      }
    ) {
      edges {
        node {
          id
          title
          title_es
          seo_url
          seo_url_es
          meta_description
          creation_date
          credits
          credits_es
          content
          content_es
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
          mobile {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          blocks {
            id
            title
            title_es
            content
            content_es
            blocktype {
              qname
            }
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
