import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Portfolio Mariona Mercadal" />
      <h1>Portfolio Mariona Mercadal</h1>
      <ul className="projects-list">
        {
          data.allStrapiProject.edges.map( item => {
            return (
              <li className="projects-list__item">
                <Link to={`/${item.node.seo_url}`}>{item.node.title}</Link>
                <p>{item.node.introduction}</p>
              </li>
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
          introduction
          seo_url
        }
      }
    }
  }
`
