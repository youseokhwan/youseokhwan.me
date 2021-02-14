import React from "react"
// import { Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

const PostList = ({ location, pageContext }) => {
    const { tag, posts } = pageContext

    return (
      <Layout location={location} title={tag}>
        <SEO title="All posts" />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <Post key={post.fields.slug} post={post} title={title} />
            )
          })}
        </ol>
      </Layout>
    )
  }
  
  export default PostList

