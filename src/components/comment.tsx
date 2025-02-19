import React, { useContext, useEffect, useRef } from "react"

import { DARK } from "~/src/constants/theme"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import ThemeContext from "~/src/stores/themeContext"

// const source = "https://utteranc.es"
// const utterancesSelector = "iframe.utterances-frame"
// const LIGHT_THEME = "github-light"
// const DARK_THEME = "github-dark"
const LIGHT_THEME = "noborder_light"
const DARK_THEME = "noborder_dark"

type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME

const Comment = () => {
  const site = useSiteMetadata()
  // const { repo } = site.utterances ?? { repo: undefined }
  const theme = useContext(ThemeContext)
  const containerReference = useRef<HTMLDivElement>(null)
  // const isUtterancesCreated = useRef(false)
  const isGiscusCreated = useRef(false)

  useEffect(() => {
    if (!containerReference.current) return

    containerReference.current.innerHTML = ""

    // if (!repo) return
    let themeMode: ThemeMode

    // if (isUtterancesCreated.current) {
    if (isGiscusCreated.current) {
      themeMode = theme === DARK ? DARK_THEME : LIGHT_THEME
    } else {
      themeMode = document.body.dataset.theme === DARK ? DARK_THEME : LIGHT_THEME
    }

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", "youseokhwan/youseokhwan.me")
    script.setAttribute("data-repo-id", "R_kgDON3pfpA")
    script.setAttribute("data-category", "Comments")
    script.setAttribute("data-category-id", "DIC_kwDON3pfpM4CnF_P")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "0")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", themeMode)
    script.setAttribute("data-lang", "ko")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    containerReference.current.appendChild(script)

    // const createUtterancesElement = () => {
    //   const comment = document.createElement("script")
    //   const attributes = {
    //     src: `${source}/client.js`,
    //     repo,
    //     "issue-term": "title",
    //     label: "comment",
    //     theme: themeMode,
    //     crossOrigin: "anonymous",
    //     async: "true",
    //   }
    //   for (const [key, value] of Object.entries(attributes)) {
    //     comment.setAttribute(key, value)
    //   }
    //   containerReference.current?.append(comment)
    //   // isUtterancesCreated.current = true
    //   isGiscusCreated.current = true
    // }

    // const utterancesElement = containerReference.current?.querySelector(
    //   utterancesSelector,
    // ) as HTMLIFrameElement

    // const postThemeMessage = () => {
    //   if (!utterancesElement) return
    //   const message = {
    //     type: "set-theme",
    //     theme: themeMode,
    //   }
    //   utterancesElement?.contentWindow?.postMessage(message, source)
    // }

    // // isUtterancesCreated.current ? postThemeMessage() : createUtterancesElement()
    // isGiscusCreated.current ? postThemeMessage() : createUtterancesElement()
    // }, [repo, theme])
  }, [theme])

  return <div ref={containerReference} />
}

Comment.displayName = "comment"

export default Comment
