import React, { useLayoutEffect, useState } from "react"
import { PageProps, graphql } from "gatsby"
import styled from "styled-components"

import { useFlexSearch } from "react-use-flexsearch"

import CategoryFilter from "~/src/components/catetgoryFilter"
import PostGrid from "~/src/components/postGrid"
import SEO from "~/src/components/seo"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import Layout from "~/src/layouts/layout"
import type Post from "~/src/types/Post"

const Home = ({
  pageContext,
  data,
}: PageProps<Queries.Query, Queries.MarkdownRemarkFrontmatter>) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const currentCategory = pageContext.category
  const postData = data.allMarkdownRemark.edges

  // FlexSearch 관련 데이터
  const searchResults = useFlexSearch<Post>(
    searchTerm,
    data.localSearchPosts?.index || "",
    data.localSearchPosts?.store || {}
  )

  useLayoutEffect(() => {
    if (searchTerm) {
      setPosts(searchResults)
    } else {
      const filteredPostData = currentCategory
        ? postData.filter(
            ({ node }) => node?.frontmatter?.category === currentCategory,
          )
        : postData

      const postList: Post[] = filteredPostData.map(({ node }) => {
        const { id, fields, frontmatter, timeToRead } = node
        const { slug } = fields!
        const { title, desc, date, category, thumbnail } = frontmatter!
        const { childImageSharp } = thumbnail!

        return {
          id,
          slug,
          title,
          desc,
          date,
          category,
          thumbnail: childImageSharp?.id,
          timeToRead: timeToRead ?? 0,
        }
      })

      setPosts(postList)
    }
  }, [currentCategory, postData, searchTerm, searchResults])

  const site = useSiteMetadata()
  const postTitle = currentCategory || site.postTitle
  const postCount = currentCategory
    ? data.allMarkdownRemark.group.find(
        group => group.fieldValue === currentCategory,
      )?.totalCount
    : data.allMarkdownRemark.totalCount

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <Content>
          <CategoryFilter categoryList={data.allMarkdownRemark.group} />
          <PostTitle>
            <div>
              {postTitle}
              <span className="count">{postCount}</span>
            </div>
            <SearchInput
              type="text"
              placeholder="🔍 Search..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </PostTitle>
          <PostGrid posts={searchTerm ? searchResults : posts} />
        </Content>
      </Main>
    </Layout>
  )
}

const Main = styled.main`
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`

const Content = styled.div`
  box-sizing: content-box;
  width: 87.5%;
  max-width: var(--width);
  padding-top: var(--sizing-lg);
  padding-bottom: var(--sizing-lg);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-top: var(--grid-gap-lg);
    width: 87.5%;
  }
`

const PostTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 2rem;
  font-weight: var(--font-weight-extra-bold);
  margin-bottom: var(--sizing-md);
  line-height: 1.21875;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: var(--sizing-sm);
  }

  .count {
    font-size: 1.25rem;
    color: var(--color-text-3);
    margin-left: 0.5rem;
    font-weight: var(--font-weight-normal);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.125rem;
    }
  }
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-gray-3);
  border-radius: var(--border-radius-base);
  font-size: 0.85rem;
  font-weight: var(--font-weight-regular);
  width: 200px;
  background-color: var(--color-background);
  color: var(--color-text);
  height: 1rem;
  line-height: 1;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    text-indent: 1rem;
  }
`

export const query = graphql`
  query Home {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
      limit: 2000
      sort: { frontmatter: { date: DESC } }
    ) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            category
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }

    localSearchPosts {
      index
      store
    }
  }
`

export default Home
