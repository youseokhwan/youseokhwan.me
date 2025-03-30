import React from "react"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import defaultOpenGraphImage from "../images/og-default.png"

const DEFAULT_LANG = "en"

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[]

interface SEOProperties
  extends Pick<Queries.MarkdownRemarkFrontmatter, "title"> {
  desc?: Queries.Maybe<string>
  image?: Queries.Maybe<string>
  meta?: Meta
}

export function Head({ title, desc = "", image }: SEOProperties) {
  const site = useSiteMetadata()
  const description = desc || site.description || ""
  const ogImageUrl =
    (site.siteUrl || "") + (image || (defaultOpenGraphImage as string))

  return (
    <>
      <html lang={site.lang || DEFAULT_LANG} />
      <title>{title ? `${title} | ${site.title}` : site.title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title || ""} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.author || ""} />
      <meta name="twitter:title" content={title || ""} />
      <meta name="twitter:description" content={description} />
      <meta property="image" content={ogImageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="twitter:image" content={ogImageUrl} />
    </>
  )
}

export default function SEO({ title, desc = "", image }: SEOProperties) {
  return null
}
