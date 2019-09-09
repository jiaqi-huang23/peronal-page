import React from 'react'
import './blog-post.css'
import { graphql, Link } from 'gatsby'

const Template = ({ data, pageContext }) => {
  console.log(pageContext)
  const frontmatter = data.markdownRemark.frontmatter
  const html = data.markdownRemark.html
  const { next, prev } = pageContext
  return (
    <div id="post-container">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <div className="blogpost">
        <div className="navi">
          <div id="prev">
            {prev && <Link to={prev.frontmatter.path}>Previous Post</Link>}
          </div>
          <div id="next">
            {next && <Link to={next.frontmatter.path}>Next Post</Link>}
          </div>
        </div>
        <div></div>
        <div className="content">
        <h1 id="title">{frontmatter.title}</h1>
          <h5>{frontmatter.date}</h5>

          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
    query ($pathSlug: String!) {
        markdownRemark (frontmatter: {path: {eq: $pathSlug}}) {
            frontmatter{
                title
                date
            }
            html
            timeToRead
            }
    }
`

export default Template;