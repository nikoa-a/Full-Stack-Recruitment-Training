import { useState, useMemo } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  const words = ["banana", "icecream", "summer", "heat"];
  const word = words[currentWord];

  const computeWordLength = (word: string) => {
    let i = 0;
    while (i < 1000000000) {
      i++
    }
    return word.length;
  }

  // This would slow down the counter increment that is unrelated to this
  //const wordLength = computeWordLength(word);
  const wordLength = useMemo(() => computeWordLength(word), [word]);

  return (
    <>
      <h2>Compute the length of the word: {word}</h2>
      <h2>{word} has {wordLength} letters</h2>
      <button onClick={() => {
        const next = currentWord + 1 === words.length? 0: currentWord + 1;
        setCurrentWord(next);
      }}>Next Word</button> 

      <h2>Increment counter</h2>
      <h2>Current value: {count}</h2>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
    </>
  )
}

export default App
