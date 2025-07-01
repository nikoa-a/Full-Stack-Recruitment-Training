import { useState } from "react";
import ContactForm from "./components/ContactForm"
import type Person from "./models/Person";

interface State {
  greeting: string;
}

function App() {
  const [state, setState] = useState<State>({
    greeting: "No greeting yet"
  })

  const setGreeting = (person: Person) => {
    setState({
      greeting: "Hello, " + person.firstname + " " + person.lastname
    })
  }
  
  return (
    <>
      <ContactForm setGreeting={setGreeting}/>
      <h2>Greeting: {state.greeting}</h2>
    </>
  )
}

export default App
