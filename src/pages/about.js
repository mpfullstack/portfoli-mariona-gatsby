import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location, data }) => {
  return (
    <Layout location={location}>
      <SEO title="Portfolio Mariona Mercadal" />
      <h1>About Mariona Mercadal</h1>
    </Layout>
  );
}

export default AboutPage
