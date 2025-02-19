import React, { useContext, useEffect, useRef } from "react"

import { DARK } from "~/src/constants/theme"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import ThemeContext from "~/src/stores/themeContext"

const GISCUS_URL = "https://giscus.app/client.js"
const LIGHT_THEME = "noborder_light"
const DARK_THEME = "noborder_dark"

type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME

const Comment = () => {
  const giscus = useSiteMetadata().giscus
  const theme = useContext(ThemeContext)
  const containerReference = useRef<HTMLDivElement>(null)
  const isGiscusCreated = useRef(false)

  useEffect(() => {
    if (!giscus || !containerReference.current) return

    let themeMode: ThemeMode

    if (isGiscusCreated.current) {
      themeMode = theme === DARK ? DARK_THEME : LIGHT_THEME
    } else {
      themeMode = document.body.dataset.theme === DARK ? DARK_THEME : LIGHT_THEME
    }

    const script = document.createElement("script")
    script.src = GISCUS_URL
    script.setAttribute("data-repo", giscus.data_repo ?? "")
    script.setAttribute("data-repo-id", giscus.data_repo_id ?? "")
    script.setAttribute("data-category", giscus.data_category ?? "")
    script.setAttribute("data-category-id", giscus.data_category_id ?? "")
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
  }, [theme])

  return <div ref={containerReference} />
}

Comment.displayName = "comment"

export default Comment
