import { graphql, useStaticQuery } from "gatsby"

interface SiteMetaData {
  site: {
    siteMetadata: Queries.SiteSiteMetadata
  }
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaData>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          lang
          giscus {
            src
            light_theme
            dark_theme
            data_repo
            data_repo_id
            data_category
            data_category_id
          }
          utterances {
            repo
          }
          postTitle
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)
  return site.siteMetadata
}

export type UseSiteMetaDataReturnType = ReturnType<typeof useSiteMetadata>

export default useSiteMetadata
