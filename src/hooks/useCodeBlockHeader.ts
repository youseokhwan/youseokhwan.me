import { useEffect } from "react"

const useCodeBlockHeader = () => {
  useEffect(() => {
    if (!document.querySelector("#code-header-style")) {
      const style = document.createElement("style")
      style.id = "code-header-style"
      style.innerHTML = `
        .code-header {
          position: sticky;
          left: 0px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background-color: #434041;
          border-radius: 8px 8px 0 0;
        }

        .code-header .btn-group {
          display: flex;
        }

        .code-header .btn {
          border-radius: 50%;
          width: 12px;
          height: 12px;
          margin-right: 5px;
        }

        .code-header .btn.red {
          background-color: #F5655B;
        }

        .code-header .btn.yellow {
          background-color: #F6BD3B;
        }

        .code-header .btn.green {
          background-color: #43C645;
        }

        .code-header .lang {
          flex-group: 1;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
        }

        .code-header .copy-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: opacity 0.2s ease-in-out;
        }

        .code-header .copy-btn:hover {
          opacity: 0.7;
        }
      `
      document.head.appendChild(style)
    }

    document.querySelectorAll("pre.grvsc-container").forEach((pre) => {
      if (pre.querySelector(".code-header")) return

      const language = pre.getAttribute("data-language") || "text"

      const header = document.createElement("div")
      header.className = "code-header"
      header.innerHTML = `
        <div class="btn-group">
          <span class="red btn"></span>
          <span class="yellow btn"></span>
          <span class="green btn"></span>
        </div>
        <div class="lang">${language}</div>
        <button class="copy-btn">Copy</button>
      `

      const copyButton = header.querySelector(".copy-btn") as HTMLButtonElement
      copyButton.addEventListener("click", () => {
        const codeElement = pre.querySelector("code")
        if (codeElement) {
            const codeText = codeElement.innerText
            navigator.clipboard.writeText(codeText)
        }
      })

      pre.insertBefore(header, pre.firstChild)
    })
  }, [])
}

export default useCodeBlockHeader
