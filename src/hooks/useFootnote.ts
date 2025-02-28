import { useEffect } from "react"

const useFootnote = () => {
  useEffect(() => {
    const footnotes = document.querySelectorAll("sup a")

    footnotes.forEach((link) => {
      link.classList.add("useFootnoteTest")
    })
  }, [])
}

export default useFootnote