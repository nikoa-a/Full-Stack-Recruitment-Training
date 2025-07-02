import { useState } from "react"

const useCount = (initalState = 0) => {
  const [count, setCount] = useState(initalState);

  const add = () => {
    setCount(count => count + 1);
  }

  const substract = () => {
    setCount(count => count - 1);
  }

  return {count, add, substract}
}

export default useCount;