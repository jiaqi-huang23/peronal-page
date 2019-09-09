import React from 'react'
import './blog-post.css'
import { graphql, Link } from 'gatsby'

const Template =  ({data, pageContext}) => {
    console.log(pageContext);
    const title = data.markdownRemark.frontmatter.title;
    const html = data.markdownRemark.html;
    const { next, prev } = pageContext;
    return (
        <div>
            <h1>{title}</h1>
           <div className='blogpost' dangerouslySetInnerHTML={{__html: html}}>
           </div>
           <div>
               {prev && <Link to={prev.frontmatter.path}>Previous Post</Link>}
               {!prev && <p>This is the earliest post</p>}
           </div>
           <div>
               {next && <Link to={next.frontmatter.path}>Next Post</Link>}
               {!next && <p>No more posts</p>}
           </div>
        </div>
    )
};

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