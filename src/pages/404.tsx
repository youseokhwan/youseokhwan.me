import React from "react"

import styled from "styled-components"

import SEO from "~/src/components/seo"
import Layout from "~/src/layouts/layout"

const NotFound = () => {
  return (
    <Layout>
      <SEO title="Not found" />
      <Container>
        <TitleWrap>
          <Title>404</Title>
          <Divider />
          <Desc>Page not found</Desc>
        </TitleWrap>
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
`

const Divider = styled.div`
  width: 100%;
  height: 4px;
  margin: 1rem 0 1.5rem 0;
  background-color: var(--color-gray-3);
`

const TitleWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
`

const Title = styled.h1`
  color: var(--text-color);
  font-size: 8rem;
`

const Desc = styled.h2`
  color: var(--text-color);
  font-size: 2.5rem;
`

export default NotFound
