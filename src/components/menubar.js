import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
const TagsListQuery = graphql`
  query TagListQuery {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`;

const Menubar = () => {
  const tags = useStaticQuery(TagsListQuery).allMarkdownRemark.group;
  return (
    <div className="menubar-container">
      <Link className="menubar-header" to="/">
        youseokhwan.me
      </Link>
      
      <div className="menubar-category">
        {tags.map(tag => {
            return (
              <Link className="menubar-menu" to={`/${tag.fieldValue}`} key={tag.fieldValue}> {tag.fieldValue} </Link>
            )
        })}
      </div>

      <footer className="menubar-footer">
        © {new Date().getFullYear()},&nbsp;
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Menubar

// export const pageQuery = graphql`
//   query TagListQuery {
//     tags: allMarkdownRemark(limit: 2000) {
//       group(field: frontmatter___tag) {
//         fieldValue
//         totalCount
//       }
//     }
//   }
// `
