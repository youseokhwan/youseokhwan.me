import React, { useContext, useEffect, useRef } from "react"

import { DARK } from "~/src/constants/theme"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import ThemeContext from "~/src/stores/themeContext"

const GISCUS_URL = "https://giscus.app/client.js"
const LIGHT_THEME = "noborder_light"
const DARK_THEME = "noborder_dark"

const Comment = () => {
  const giscus = useSiteMetadata().giscus
  const theme = useContext(ThemeContext) === DARK ? DARK_THEME : LIGHT_THEME
  const containerReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!giscus || !containerReference.current) return

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
    script.setAttribute("data-theme", theme)
    script.setAttribute("data-lang", "ko")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    containerReference.current.appendChild(script)
  }, [theme])

  return <div ref={containerReference} />
}

Comment.displayName = "comment"

export default Comment
