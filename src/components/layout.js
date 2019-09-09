/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query posts {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
            date
            tags
            excerpt
          }
          html
        }
      }
    }
  }
  `
)
  //console.log(data);

  const { edges } = data.allMarkdownRemark;

  return (
    <>
     <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>
          {edges.map(edge => {
            const { frontmatter} = edge.node;
            return (
              <div key={frontmatter.path}
                   style={{marginBottom: 'Irem'}}
              >
                <Link to={frontmatter.path}>
                {frontmatter.title} </Link>- {frontmatter.date} 
              </div>
            )
          })}
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
 
export default Layout
