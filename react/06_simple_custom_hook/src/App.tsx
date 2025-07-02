import useCount from "./hooks/useCount";

function App() {
  const { count, add, substract } = useCount(10);

  return (
    <>
     <h2>Current count: {count}</h2>
     <button onClick={add}>+</button>
     <button onClick={substract}>-</button>
    </>
  )
}

export default App
