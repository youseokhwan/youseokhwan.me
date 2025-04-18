import React from "react"

import styled from "styled-components"

import Category from "~/src/styles/category"
import DateTime from "~/src/styles/dateTime"
import type Post from "~/src/types/Post"

import CenteredImg from "./centeredImg"

type CardProperties = Pick<Post, "thumbnail" | "category" | "title" | "desc" | "date">

const Card: React.FC<CardProperties> = ({
  thumbnail,
  category,
  title,
  desc,
  date,
}) => {
  return (
    <Wrapper>
      <CenteredImg src={thumbnail} />
      <Text>
        <div>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </div>
        <DateTime dateTime={date!}>{date}</DateTime>
      </Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  border-radius: var(--border-radius-base);
  background-color: var(--color-card);

  /* Fix Safari overflow:hidden with border radius not working error */
  transform: translateZ(0);
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: var(--sizing-md);

  & > * {
    display: block;
  }
`

const Title = styled.h3`
  margin-top: var(--sizing-xs);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.device.md}) {
    font-size: 1.3125rem;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: var(--text-md);
  }
`

const Desc = styled.p`
  line-height: 1.5;
  margin-top: 8px;
  padding-bottom: var(--sizing-sm);
  color: var(--color-text-2);
  word-break: break-word;
`

export default React.memo(Card)
