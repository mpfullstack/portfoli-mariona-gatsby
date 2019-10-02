import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Portfolio Mariona Mercadal" />
      <h1>Portfolio Mariona Mercadal</h1>
      <ul>
        {
          data.allStrapiProject.edges.map( ({node}) => {
            return (
              <li className="projects-list__item">
                <Link to={`/${node.seo_url}`}>{node.title}</Link>
                {
                  node.tags.map(tag => {
                    return <span>{tag.name}</span>
                  })
                }
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
          seo_url
          tags {
            name
          }
        }
      }
    }
  }
`
