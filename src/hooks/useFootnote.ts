import { useState, useEffect } from "react"

const useFootnote = () => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  useEffect(() => {
    const refs = document.querySelectorAll("sup .footnote-ref")
    const backRefs = document.querySelectorAll(".footnotes .footnote-backref")
  
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
      const rect = target.getBoundingClientRect()
      
      setTooltip({
        text: "안녕하세요!",
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY + rect.height
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