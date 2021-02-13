import React from "react"
import { Link } from "gatsby"

const Menubar = ({ children }) => {
  return (
    <div className="menubar-container">
        <div className="menubar-header" Link="/">
            youseokhwan.me
        </div>
        <div className="menubar-menu" Link="/Swift">
            Swift
        </div>
    </div>
  )
}

export default Menubar
