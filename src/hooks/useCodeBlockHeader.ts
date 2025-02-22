import { useEffect } from "react"

const useCodeBlockHeader = () => {
  useEffect(() => {
    console.log("useCodeBlockHeader useEffect 실행됨")
  }, [])
}

export default useCodeBlockHeader
