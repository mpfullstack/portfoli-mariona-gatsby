import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

export default ({ data }) => {
  const project = data.allStrapiProject.edges[0].node;
  return (
    <Layout>
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
      	id: { eq: $id}
      }
    ) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
