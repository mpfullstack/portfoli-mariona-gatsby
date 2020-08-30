// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for projects model in strapi
  const projectsResult = await graphql(
    `
    query {
      allStrapiProject {
        edges {
          node {
            strapiId
            seo_url
          }
        }
      }
    }
    `
  )

  // Handle errors
  if (projectsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each project
  const projectTemplate = require.resolve(`./src/templates/project.js`);
  const projects = projectsResult.data.allStrapiProject.edges;
  let prevId;
  let nextId;
  projects.forEach(({ node }, i) => {
    if (i === 0) {
      if (projects.length > 1) {
        nextId = projects[1].node.strapiId;
        prevId = projects[projects.length-1].node.strapiId;
      } else {
        nextId = projects[0].node.strapiId;
        prevId = projects[0].node.strapiId;
      }
    } else if (i === projects.length-1) {
      nextId = projects[0].node.strapiId;
      if (projects.length > 1) {
        prevId = projects[projects.length-2].node.strapiId;
      } else {
        prevId = projects[0].node.strapiId;
      }
    } else {
      if (projects.length > 1) {
        nextId = projects[Math.min(i+1, projects.length-1)].node.strapiId;
        prevId = projects[i-1].node.strapiId;
      } else {
        nextId = projects[0].node.strapiId;
        prevId = projects[0].node.strapiId;
      }
    }
    createPage({
      path: `/${node.seo_url}`, //TODO: In case seo_url is not present, create a seo friendly url from title
      component: projectTemplate,
      // In your project template's graphql query, you can use id
      // as a GraphQL variable to query for data from the strapi project.
      context: { id: node.strapiId, nextId, prevId }
    });
  });
}
