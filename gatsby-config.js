const meta = require("./gatsby-meta-config")

const siteMetadata = {
  title: meta.title,
  description: meta.description,
  author: meta.author,
  siteUrl: meta.siteUrl,
  lang: meta.lang,
  giscus: {
    src: "https://giscus.app/client.js",
    light_theme: "noborder_light",
    dark_theme: "noborder_dark",
    data_repo: "youseokhwan/youseokhwan.me",
    data_repo_id: "R_kgDON3pfpA",
    data_category: "Comments",
    data_category_id: "DIC_kwDON3pfpM4CnF_P",
  },
  postTitle: "All",
  menuLinks: [
    {
      link: "/clear-terms/",
      name: "Clear Terms 🚀",
    },
    {
      link: meta.links.github,
      name: "Github 🔗",
    },
  ],
}

const corePlugins = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "src",
      path: `${__dirname}/src`,
      ignore: [`**/*.d.ts`],
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: `${__dirname}/src/images`,
    },
  },
]

const devPlugins = [
  {
    resolve: "gatsby-plugin-alias-imports",
    options: {
      alias: {
        "~": ".",
      },
      extensions: ["js", "ts", "tsx"],
    },
  },
  {
    resolve: "gatsby-plugin-typography",
    options: {
      pathToConfigModule: "src/styles/typography",
    },
  },
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-typescript",
  "gatsby-plugin-styled-components",
]

const imagePlugins = [
  "gatsby-plugin-image",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
]

const markdownPlugins = [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        "gatsby-remark-copy-linked-files",
        {
          resolve: "gatsby-remark-vscode",
          options: {
            theme: {
              default: "Github Light Theme",
              parentSelector: {
                "body[data-theme=dark]": "Dark Github",
              },
            },
            languageAliases: {
              applescript: "shellscript"
            },
            extensions: ["vscode-theme-github-light", "dark-github-theme"],
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: "gatsby-remark-images-medium-zoom",
          options: {
            background: "#1C1C1C"
          },
        },
        {
          resolve: "gatsby-remark-footnotes",
          options: {
            footnoteBackRefPreviousElementDisplay: "inline",
            footnoteBackRefDisplay: "inline",
            footnoteBackRefInnerText: "↩︎",
            footnoteBackRefAnchorStyle: `text-decoration: none;`,
            useCustomDivider: ""
          },
        },
      ],
    },
  },
]

const searchPlugins = [
  "gatsby-plugin-sitemap",
  "gatsby-plugin-robots-txt",
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }],
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
                sort: { frontmatter: { date: DESC } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          output: "/rss.xml",
          title: `${meta.title}'s RSS Feed`,
        },
      ],
    },
  },
]

const pwaPlugins = [
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: meta.title,
      short_name: meta.title,
      description: meta.description,
      lang: meta.lang,
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      display: "standalone",
      icon: meta.favicon,
      icon_options: {
        purpose: "any maskable",
      },
    },
  },
]

module.exports = {
  graphqlTypegen: true,
  siteMetadata,
  plugins: [
    ...corePlugins,
    ...devPlugins,
    ...imagePlugins,
    ...markdownPlugins,
    ...searchPlugins,
    ...pwaPlugins,
  ],
}
