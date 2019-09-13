import React from 'react'
import './blog-post.css'
import { Link, graphql} from 'gatsby'

const Template = ({ data, pageContext }) => {
  console.log("++++++++")
  console.log(data);
  console.log(pageContext)
  const html = data.markdownRemark.html
  return (
    <div id="post-container">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <div className="aboutme">
        <div></div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
    query pages ($pathSlug: String!) {
        markdownRemark (frontmatter: {path: {eq: $pathSlug}}) {
            frontmatter{
                title
            }
            html
            timeToRead
       }
    }
  `
export default Template;