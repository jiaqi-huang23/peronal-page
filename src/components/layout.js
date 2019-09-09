/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Sidebar from "./sidebar"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query posts {
      allMarkdownRemark (sort: {order:[DESC], fields: [frontmatter___date]}, filter: {frontmatter: {tags: {eq: "post"}}}){
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
  `)
  //console.log(data);

  const { edges } = data.allMarkdownRemark

  return (
    <>
      <div id="outer-container">
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="content-container">
          <div id='content'>
          <main>
            {edges.map(edge => {
              const { frontmatter } = edge.node
              return (
                <div key={frontmatter.path} style={{ marginBottom: "Irem" , paddingTop:"20px"}}>
                  <Link to={frontmatter.path} 
                  style={{fontSize: "25px", fontFamily:"Merriweather, Impact, Serif"}}>
                  {frontmatter.title} </Link>-{" "}
                  {frontmatter.date}
                </div>
              )
            })}
          </main>
          </div>
        </div>
      </div>
      <footer id='footer'>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
