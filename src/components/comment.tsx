import React, { useContext, useEffect, useRef } from "react"

import { DARK } from "~/src/constants/theme"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import ThemeContext from "~/src/stores/themeContext"

const Comment = () => {
  const giscus = useSiteMetadata().giscus
  const theme = useContext(ThemeContext) === DARK ? giscus?.dark_theme : giscus?.light_theme
  const containerReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!giscus || !containerReference.current) return

    const script = document.createElement("script")
    script.src = giscus.src ?? ""
    script.setAttribute("data-repo", giscus.data_repo ?? "")
    script.setAttribute("data-repo-id", giscus.data_repo_id ?? "")
    script.setAttribute("data-category", giscus.data_category ?? "")
    script.setAttribute("data-category-id", giscus.data_category_id ?? "")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "0")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", theme ?? "")
    script.setAttribute("data-lang", "ko")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    containerReference.current.appendChild(script)
  }, [theme])

  return <div ref={containerReference} />
}

Comment.displayName = "comment"

export default Comment
