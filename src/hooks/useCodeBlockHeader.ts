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
          padding: 10px 14px;
          background-color: #434041;
          border-radius: 8px 8px 0 0;
        }

        .code-header .btn {
          border-radius: 50%;
          width: 15px;
          height: 15px;
          margin: 0 5px;
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
      `
      document.head.appendChild(style)
    }

    document.querySelectorAll("pre.grvsc-container").forEach((pre) => {
      if (pre.querySelector(".code-header")) return

      const header = document.createElement("div")
      header.className = "code-header"
      header.innerHTML = `
        <span class="red btn"></span>
        <span class="yellow btn"></span>
        <span class="green btn"></span>
      `

      pre.insertBefore(header, pre.firstChild)
    })
  }, [])
}

export default useCodeBlockHeader
