import { useState, useEffect } from "react"

const useFootnote = () => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  useEffect(() => {
    const refs = document.querySelectorAll("sup .footnote-ref")
    const backRefs = document.querySelectorAll(".footnotes .footnote-backref")
  
    refs.forEach((footnote) => {
      const content = footnote.textContent ?? ""
      
      if (!/^\[.*\]$/.test(content)) {
        footnote.textContent = `[${content}]`
      }
    })

    const handleClick = (e: Event) => {
      e.preventDefault()
      
      const targetId = (e.target as HTMLAnchorElement).getAttribute("href")?.slice(1)

      if (targetId) {
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    const handleMouseEnter = (e: Event) => {
      e.preventDefault()

      const target = e.target as HTMLElement
      const targetId = (target as HTMLAnchorElement).getAttribute("href")?.slice(1)
      const tooltipText = document.querySelector(`.footnotes li[id="${targetId}"] p`)?.textContent
      const rect = target.getBoundingClientRect()
      const tooltipWidth = 350

      const dummyDiv = document.createElement("div")
      dummyDiv.style.visibility = "hidden"
      dummyDiv.style.position = "absolute"
      dummyDiv.style.width = `${tooltipWidth}px`
      dummyDiv.style.whiteSpace = "normal"
      dummyDiv.textContent = tooltipText ?? ""
      document.body.appendChild(dummyDiv)
      const tooltipHeight = dummyDiv.offsetHeight
      document.body.removeChild(dummyDiv)

      setTooltip({
        text: tooltipText ?? "",
        x: rect.left + window.scrollX - tooltipWidth / 2 + rect.width / 2,
        y: rect.top + window.scrollY - tooltipHeight - 10
      })
    }

    const handleMouseLeave = () => {
      setTooltip(null)
    }
  
    refs.forEach((link) => link.addEventListener("click", handleClick))
    refs.forEach((link) => link.addEventListener("mouseenter", handleMouseEnter))
    refs.forEach((link) => link.addEventListener("mouseleave", handleMouseLeave))
    backRefs.forEach((link) => link.addEventListener("click", handleClick))
  
    return () => {
      refs.forEach((link) => link.removeEventListener("click", handleClick))
      refs.forEach((link) => link.removeEventListener("mouseenter", handleMouseEnter))
      refs.forEach((link) => link.removeEventListener("mouseleave", handleMouseLeave))
      backRefs.forEach((link) => link.removeEventListener("click", handleClick))
    }
  }, [])

  return tooltip
}

export default useFootnote