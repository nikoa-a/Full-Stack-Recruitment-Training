import { useState } from 'react';
import ContactCard from './components/ContactCard';
import ContactInfo from './components/ContactInfo';
import NamedChildren from './components/NamedChildren';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContactCard>
        <ContactInfo name="Matti Meikäläinen" profession="Hackerman" />
      </ContactCard>
      <ContactCard>
        <h3>Current Count: {count}</h3>
        <button onClick={() => setCount(count => count + 1)}>Click</button>
      </ContactCard>
      <NamedChildren
        header={<h2>Complex Card</h2>}
        media={<h2>Media Content</h2>}
        content={<h2>Content Area</h2>}>
      </NamedChildren>
      <NamedChildren
        header={<h2>No media</h2>}
        content={<h2>Content Area</h2>}>
      </NamedChildren>
    </>
  )
}

export default App
