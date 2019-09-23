// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for projects model in strapi
  const result = await graphql(
    `
    query {
      allStrapiProject {
        edges {
          node {
            id
            title
            seo_url
          }
        }
      }
    }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each project
  const projectTemplate = require.resolve(`./src/templates/project.js`);
  result.data.allStrapiProject.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.seo_url}`, //TODO: In case seo_url is not present, create a canonical url from title
      component: projectTemplate,
      // In your project template's graphql query, you can use id
      // as a GraphQL variable to query for data from the strapi project.
      context: { id: node.id }
    })
  })
}
