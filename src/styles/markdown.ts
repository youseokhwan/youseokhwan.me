import styled from "styled-components"

import type typography from "./typography"

const Markdown = styled.article<{ rhythm: (typeof typography)["rhythm"] }>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: var(--font-weight-bold);
  }

  table {
    margin-bottom: var(--sizing-base);
  }
  td,
  th {
    padding: var(--padding-xs);
    border: 1px solid var(--color-gray-3);
  }
  th {
    font-weight: var(--font-weight-semi-bold);
  }

  strong {
    font-weight: var(--font-weight-semi-bold);
  }

  a,
  p {
    font-weight: var(--font-weight-regular);
  }

  a {
    text-decoration: none;
    color: var(--color-green) !important;
    * {
      color: var(--color-green) !important;
    }
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }

  & > *:first-child {
    margin-top: 0;
  }

  h1 {
    font-size: 2.5rem;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(2.25)};

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.3125rem;
    }
  }

  h3 {
    font-size: 1.31951rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(1.5)};

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.1875rem;
    }
  }

  h4,
  h5,
  h6 {
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1)};
  }

  ul,
  ol {
    margin-top: ${({ rhythm }) => rhythm(1)};
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  ol {
    list-style: auto;
  }
  ul {
    list-style: disc;
  }

  li > ul,
  li > ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: 0;
  }

  li > ol,
  li > ul {
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  li {
    margin-bottom: ${({ rhythm }) => rhythm(0.3)};
  }

  li {
    line-height: 1.68;
  }

  p,
  li,
  blockquote {
    font-size: 1.0625rem;
  }

  p {
    line-height: 1.68;
    text-align: left;
    margin-bottom: var(--sizing-md);
  }

  hr {
    margin: var(--sizing-lg) 0;
    background: var(--color-gray-3);
  }

  blockquote {
    border-left: 0.25rem solid var(--color-gray-2);
    padding-left: var(--sizing-base);
    margin: var(--sizing-md) 0;
    * {
      color: var(--color-gray-6);
    }
  }

  img {
    display: block;
  }

  pre,
  code {
    font-family:
      SFMono-Regular,
      Consolas,
      Liberation Mono,
      Menlo,
      monospace;
    background-color: var(--color-code-block);
  }

  pre {
    border: 1px solid var(--color-gray-3);
  }

  pre.grvsc-container {
    margin: var(--sizing-md) 0;
  }

  .grvsc-line-highlighted::before {
    background-color: var(--color-code-highlight) !important;
    box-shadow: inset 4px 0 0 0 var(--color-code-highlight-border) !important;
  }

  *:not(pre) > code {
    background-color: var(--color-code);
    padding: 0.2rem 0.4rem;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
  }

  /* mac 스타일 코드블럭 적용 */
  pre {
    position: relative;
    padding-top: 3rem;
    background-color: var(--color-code-block);
    border-radius: 8px;
  }

  // pre::before {
  //   content: "";
  //   display: flex;
  //   align-items: center;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   height: 2rem;
  //   background-color: #434041;
  //   border-bottom: 1px solid #3c3c3c;
  // }

  // pre::after {
  //   content: "";
  //   position: absolute;
  //   top: 0.6rem;
  //   left: 1.0rem;
  //   width: 0.75rem;
  //   height: 0.75rem;
  //   border-radius: 50%;
  //   background-color: #f5655b;
  //   box-shadow: 1.1rem 0 0 #f6bd3b, 2.2rem 0 0 #43c645;
  // }

  pre {
    counter-reset: line-number;
  }

  pre code {
    position: relative;
    padding-left: 0.7rem;
  }

  pre code > * {
    display: block;
    line-height: 1.5;
    counter-increment: line-number;
  }

  pre code > *::before {
    content: counter(line-number);
    position: absolute;
    left: 0;
    width: 2rem;
    text-align: right;
    padding-right: 0.5rem;
    color: #757575;
  }

  .grvsc-source {
    padding-left: 2.5rem;
  }
`

export default Markdown
