import React from "react"
import resource from "../../resources"
import { Link, useStaticQuery, graphql} from "gatsby"

const avatarStyle = {
  borderRadius: "70%",
  display: "block",
  marginTop: "100px",
  objectFit: "cover",
  padding: "20%",
}

const listStyle = {
  marginTop: "150px",
  marginLeft: "0px",
  textAlign: "center",
}

const itemStyle = {
  margin: "0 auto",
  paddingTop: "15px",
  listStyleYype: "none",
  fontSize: "22px",
  color: "aliceblue",
}

const Sidebar = props => {
    console.log(props);
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
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
  `)
  const aboutmePagePath = data.allMarkdownRemark.edges[0].node.frontmatter.path;
  return (
    <div>
      <img src={resource.avatar} style={avatarStyle} />
      <ul style={listStyle}>
        <li style={itemStyle}><Link to='/'>Blogs</Link></li>
        <li style={itemStyle}>Projects</li>
        <li style={itemStyle}>
          <Link to={aboutmePagePath}>About Me</Link>
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
