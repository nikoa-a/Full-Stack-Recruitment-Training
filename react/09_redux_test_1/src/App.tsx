import { useSelector, useDispatch } from "react-redux";
import type { State } from './reducers/countReducer';

function App() {
  const dispatch = useDispatch();

  const countSelector = (state: State) => {
    console.log("In state selector. State", state);
    return state.count;
  }

  const count = useSelector(countSelector);

  return (
    <>
      <h2>Current count: {count}</h2>
      <button onClick={() => {
        console.log("Dispatch incremented");
        dispatch({
          type: "INCREMENT"
        })
      }}>Increment</button>
      <button onClick={() => {
        console.log("Dispatch decremented");
        dispatch({
          type: "DECREMENT"
        })
      }}>Decrement</button>
    </>
  )
}

export default App
