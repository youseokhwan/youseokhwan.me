import React from "react"
import { Link } from "gatsby"

const Menubar = ({ children }) => {
  return (
    <div className="menubar-container">
      <Link className="menubar-header" to="/">
        youseokhwan.me
      </Link>

      <div className="menubar-category">
        <div>
          <Link className="menubar-menu" to="/Swift">Swift</Link>
        </div>
        <div>
          <Link className="menubar-menu" to="/iOS">iOS</Link>
        </div>
        <div>
          <Link className="menubar-menu" to="/GitHub">GitHub</Link>
        </div>
        <div>
          <Link className="menubar-menu" to="/Blog">Blog</Link>
        </div>
      </div>

      <footer className="menubar-footer">
        © {new Date().getFullYear()},&nbsp;
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Menubar
