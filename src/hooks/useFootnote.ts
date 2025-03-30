import { useEffect, useState } from "react"
import disableScroll from "disable-scroll"

const useFootnote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      // 터치 이벤트를 지원하는지 확인
      const hasTouch = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      
      setIsTouchDevice(hasTouch)
    }

    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)

    return () => {
      window.removeEventListener('resize', checkTouchDevice)
    }
  }, [])

  // 모달 상태에 따라 스크롤 제어
  useEffect(() => {
    if (isModalOpen) {
      disableScroll.on()
    } else {
      disableScroll.off()
    }

    return () => {
      disableScroll.off()
    }
  }, [isModalOpen])

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

      // 마우스 디바이스에서는 툴팁 사용
      if (!isTouchDevice) {
        footnote.setAttribute("data-tooltip-id", "footnote-tooltip")
        footnote.setAttribute("data-tooltip-content", tooltipText ?? "")
      } else {
        // 터치 디바이스에서는 툴팁 속성 제거
        footnote.removeAttribute("data-tooltip-id")
        footnote.removeAttribute("data-tooltip-content")
      }

      // 터치 디바이스에서는 클릭 이벤트로 모달 표시
      footnote.addEventListener("click", (e) => {
        if (isTouchDevice) {
          e.preventDefault()
          setModalContent(tooltipText ?? "")
          setIsModalOpen(true)
        }
      })
    })

    const handleClick = (e: Event) => {
      e.preventDefault()
      
      const targetId = (e.target as HTMLAnchorElement).getAttribute("href")?.slice(1)
      if (!targetId) return

      // 뒤로 가기 링크인 경우 (각주 설명에서 원래 각주로 돌아가는 경우)
      const isBackRef = (e.target as HTMLElement).classList.contains('footnote-backref')
      
      // 터치 디바이스에서 뒤로 가기 링크가 아닌 경우에만 스크롤 이동을 막습니다
      if (isTouchDevice && !isBackRef) {
        return
      }

      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }

    refs.forEach((link) => link.addEventListener("click", handleClick))
    backRefs.forEach((link) => link.addEventListener("click", handleClick))
  
    return () => {
      refs.forEach((link) => link.removeEventListener("click", handleClick))
      backRefs.forEach((link) => link.removeEventListener("click", handleClick))
    }
  }, [isTouchDevice])

  return { isModalOpen, setIsModalOpen, modalContent }
}

export default useFootnote