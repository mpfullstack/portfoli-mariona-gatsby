// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
    query {
      allStrapiProject {
        edges {
          node {
            id
            title
            content
            meta_description
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

  // Create pages for each markdown file.
  const projectTemplate = require.resolve(`./src/templates/project.js`);
  result.data.allStrapiProject.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.id}`,
      component: projectTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: { id: node.id }
    })
  })
}
