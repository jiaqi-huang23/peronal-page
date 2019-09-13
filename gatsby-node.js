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
    const result = await graphql(`
        query {
          posts: allMongodbTestPosts(sort: 
            {fields: [createdDate], order:[ASC]}){
            edges {
              previous {
                id
              }
              node {
                id
                createdDate
                title
                content
              }
              next {
                id
              }
            }
          }
          
          other: allMarkdownRemark{
            edges {
              node {
                frontmatter {
                  title
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
            reporters.panicOnBuild(`Error while running GraphQL query.`);
            return;
          }
    }
    //console.log(JSON.stringify(result));
    //create pages for each markdown files.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
    const amboutMeTemplate = path.resolve(`src/templates/aboutMe.js`);
    result.data.posts.edges.forEach(({node, next, previous}) => {
        const path = `post-${node.id}` 
        const id = node.id;
        const nextPath = next == null ? null : `post-${next.id}`;
        const prevPath = previous == null ? null : `post-${previous.id}`;
          createPage({
            path,
            component: blogPostTemplate,
            context: {
                id,
                pathSlug: path,
                prevPath,
                nextPath
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