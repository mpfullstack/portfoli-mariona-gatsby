import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <ul>
        {
          data.allStrapiProject.edges.map( item => {
            console.log(item);
            return (
              <li><Link to={`/${item.node.seo_url}`}>{item.node.title}</Link></li>
            )
          })
        }
      </ul>
    </Layout>
  );
}

export default IndexPage

export const query = graphql`
  query{
    allStrapiProject {
      edges {
        node {
          title
          seo_url
        }
      }
    }
  }
`
