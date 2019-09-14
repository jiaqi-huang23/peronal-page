import React from 'react'
import './blog-post.css'
import { graphql, Link } from 'gatsby'
const moment = require('moment');
const md = require('markdown-it')({
  html: true,
linkify: true,
typographer: true
});


/**
 * 
 * @todo format createdDate 
 */
const Template = ({ data, pageContext }) => {
  const { prevPath, nextPath } = pageContext;
  const { content, createdDate, title } = data.mongodbTestPosts;
  const html = md.render(content);
  const dateString = moment(createdDate).format("YYYY-MM-DD hh:mm:ss");
  return (
    <div id="post-container">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <div className="blogpost">
        <div className="navi">
          <div id="prev">
            {prevPath && <Link to={prevPath}>Previous Post</Link>}
          </div>
          <div id="next">
            {nextPath && <Link to={nextPath}>Next Post</Link>}
          </div>
        </div>
        <div className="content">
        <h1 id="title">{title}</h1>
          <h5>{dateString}</h5>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query mongopage($id:String!) {
    mongodbTestPosts(id:{eq:$id}) {
      id
      createdDate
      title
      content
    }
  }
`;

export default Template;