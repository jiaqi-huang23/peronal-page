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

/**
 * 
 * @todo format createdDate 
 */

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMongodbTestPosts {
        edges {
          node {
          id
          createdDate
          title
          content
          }
        }
      }
    }
  `);
  console.log(data);

  const { edges } = data.allMongodbTestPosts;

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
              const { id, title, createdDate } = edge.node;
              const path = `post-${id}`;
              return (
                <div key={id} style={{ marginBottom: "Irem" , paddingTop:"20px"}}>
                  <Link to={path} 
                  style={{fontSize: "25px", fontFamily:"Merriweather, Impact, Serif"}}>
                  {title} </Link>-{" "}
                  {createdDate}
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
