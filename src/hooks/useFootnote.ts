import { useEffect } from "react"

const useFootnote = () => {
  useEffect(() => {
    const refs = document.querySelectorAll("sup .footnote-ref")
    const backRefs = document.querySelectorAll(".footnotes .footnote-backref")
  
    refs.forEach((footnote) => {
      const content = footnote.textContent ?? ""
      
      if (!/^\[.*\]$/.test(content)) {
        footnote.textContent = `[${content}]`
      }

      const targetId = footnote.getAttribute("href")?.slice(1)
      const tooltipText = document.querySelector(`.footnotes li[id="${targetId}"] p`)?.textContent

      footnote.setAttribute("data-tooltip-id", "footnote-tooltip")
      footnote.setAttribute("data-tooltip-content", tooltipText ?? "")
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

    refs.forEach((link) => link.addEventListener("click", handleClick))
    backRefs.forEach((link) => link.addEventListener("click", handleClick))
  
    return () => {
      refs.forEach((link) => link.removeEventListener("click", handleClick))
      backRefs.forEach((link) => link.removeEventListener("click", handleClick))
    }
  }, [])
}

export default useFootnote