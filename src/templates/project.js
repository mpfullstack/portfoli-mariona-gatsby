import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default ({ data }) => {
  const project = data.allStrapiProject.edges[0].node;
  console.log('project', project);
  return (
    <Layout>
      <div>
        <h1>{project.title}</h1>
        <p>{project.content}</p>
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
