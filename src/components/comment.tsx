import React, { useContext, useEffect, useRef } from "react"

import { DARK } from "~/src/constants/theme"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import ThemeContext from "~/src/stores/themeContext"

const LIGHT_THEME = "noborder_light"
const DARK_THEME = "noborder_dark"

type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME

const Comment = () => {
  const site = useSiteMetadata()
  const theme = useContext(ThemeContext)
  const containerReference = useRef<HTMLDivElement>(null)
  const isGiscusCreated = useRef(false)

  useEffect(() => {
    if (!containerReference.current) return

    containerReference.current.innerHTML = ""

    let themeMode: ThemeMode

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
  }, [theme])

  return <div ref={containerReference} />
}

Comment.displayName = "comment"

export default Comment
