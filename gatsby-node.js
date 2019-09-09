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
          posts: allMarkdownRemark (sort: {fields: [frontmatter___date]}, filter: {frontmatter: {
            tags: {eq: "post"}
          }}){
            edges {
              next {
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
                  date
                  title
                  path
                  tags
                }
              }
            }
          }
          
          other: allMarkdownRemark (filter: {frontmatter: {
            tags: {ne: "post"}
          }}){
            edges {
              node {
                frontmatter {
                  date
                  title
                  path
                  tags
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
            reporters.panicOnBuild(`Error while running GraphQL query.`);
            return;
          }
    }
    console.log(JSON.stringify(result.data));
    //create pages for each markdown files.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
    const amboutMeTemplate = path.resolve(`src/templates/blog-post.js`);
    result.data.posts.edges.forEach(({node, next, previous}) => {
        const path = node.frontmatter.path;
       
          createPage({
            path,
            component: blogPostTemplate,
            context: {
                pathSlug: path,
                next,
                prev: previous,
            }
        })
    });
    result.data.other.edges.forEach(({node}) => {
      const path = node.frontmatter.path;
        createPage({
          path,
          component: amboutMeTemplate,
          context: {
              pathSlug: path,
          }
      })
  });

}