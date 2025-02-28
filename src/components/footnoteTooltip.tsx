import React from "react"
import useFootnote from "~/src/hooks/useFootnote"

const FootnoteTooltip = () => {
  const tooltip = useFootnote()

  if (!tooltip) return null

  return (
    <div
      style={{
        position: "absolute",
        top: tooltip.y,
        left: tooltip.x,
        padding: "5px 10px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "4px",
        fontSize: "0.875rem",
        zIndex: 1000,
        pointerEvents: "none"
      }}
    >
      {tooltip.text}
    </div>
  )
}

export default FootnoteTooltip