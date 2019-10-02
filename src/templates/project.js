import React/*, { useState, useEffect }*/ from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

export default ({ data }) => {
  const project = data.allStrapiProject.edges[0].node;

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   console.log('useEffect');
  //   console.log(project);
  // });

  return (
    <Layout>
      <SEO title={project.title} description={project.meta_description} />
      <div>
        <h1>{project.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: md.render(project.content) }} />
      </div>
    </Layout>
  )
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
        }
      }
    }
  }
`
