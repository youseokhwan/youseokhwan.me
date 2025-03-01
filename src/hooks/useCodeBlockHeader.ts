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
          background-color: var(--color-code-header);
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
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: var(--color-text);
          font-size: 14px;
          font-weight: bold;
        }

        .code-header .copy-btn {
          background: none;
          border: none;
          color: var(--color-text);
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: opacity 0.2s ease-in-out;
        }

        .code-header .copy-btn:hover {
          opacity: 0.5;
        }

        .code-header .copied-btn {
          background: none;
          border: none;
          color: var(--color-text);
          font-size: 14px;
          font-weight: bold;
          transition: opacity 0.2s ease-in-out;
        }
      `
      document.head.appendChild(style)
    }

    document.querySelectorAll("pre.grvsc-container").forEach((pre) => {
      if (pre.querySelector(".code-header")) return

      const language = pre.getAttribute("data-language") || ""

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
      let isThrottled = false

      copyButton.addEventListener("click", () => {
        if (isThrottled) return
        isThrottled = true

        const codeElement = pre.querySelector("code")
        if (codeElement) {
          const codeText = codeElement.innerText
          navigator.clipboard.writeText(codeText).then(() => {
            copyButton.textContent = "Copied!"
            copyButton.classList.add("copied-btn")
            copyButton.classList.remove("copy-btn")

            setTimeout(() => {
              copyButton.textContent = "Copy"
              copyButton.classList.add("copy-btn")
              copyButton.classList.remove("copie-btn")
              isThrottled = false
            }, 1500)
          })
        }
      })

      pre.insertBefore(header, pre.firstChild)
    })
  }, [])
}

export default useCodeBlockHeader
