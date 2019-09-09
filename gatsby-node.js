/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async ({graphql, actions, reporters}) => {
    const { createPage } = actions;
    //query for markdown nodes to use in creating pages
    const result = await graphql(
        `
        query {
            allMarkdownRemark(limit: 1000, sort: {fields: [frontmatter___date]}) {
              edges {
                next{
                  frontmatter {
                    path
                  }
                }
                previous {
                  frontmatter {
                    path
                  }
                }
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
    );
    //handle errors
    if(result.errors) {
        if (result.errors) {
            reporter.panicOnBuild(`Error while running GraphQL query.`);
            return;
          }
    }
    //create pages for each markdown files.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
    result.data.allMarkdownRemark.edges.forEach(({node, next, previous}) => {
        const path = node.frontmatter.path;
        createPage({
            path,
            component: blogPostTemplate,
            context: {
                pathSlug: path,
                next: next,
                prev: previous,
            }
        })
    })
}