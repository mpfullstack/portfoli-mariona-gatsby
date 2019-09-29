// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for projects model in strapi
  const pagesResult = await graphql(
    `
    query {
      allStrapiPage(filter: {qname: {eq: "works"}}) {
        edges {
          node {
            projects {
              id
              seo_url
            }
          }
        }
      }
    }
    `
  )

  // Handle errors
  if (pagesResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each project
  const projectTemplate = require.resolve(`./src/templates/project.js`);
  pagesResult.data.allStrapiPage.edges.forEach(({ node }) => {
    node.projects.forEach(project => {
      createPage({
        path: `/${project.seo_url}`, //TODO: In case seo_url is not present, create a seo friendly url from title
        component: projectTemplate,
        // In your project template's graphql query, you can use id
        // as a GraphQL variable to query for data from the strapi project.
        context: { id: `Project_${project.id}` }
      })
    });
  })
}
