import { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import type { ThemeType } from './context/ThemeContext';
import { themes } from './context/themes';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

interface State {
  theme: ThemeType;
}

function App() {
  const [state, setState] = useState<State>({
    theme: themes.dark
  });

  const toggleTheme = () => {
    if (state.theme === themes.dark) {
      setState({
        theme: themes.light
      })
    } else {
      setState({
        theme: themes.dark
      })
    }
  }

  return (
    <>
      <ThemeContext.Provider value={state.theme}>
        <Headline>
          Mitä ihmettä? Pyöräilytähti repi fanikyltin kahtia ja tunki sen paitansa sisään
        </Headline>
        <Paragraph>
          Ranskan ympäriajossa nähtiin lauantaina hämmentävä hetki, 
          kun ranskalaistähti Julian Alaphilippe tarrasi vauhdissa fanin tekemään kylttiin ja repäisi sen kahtia.
        </Paragraph>
        <ThemeButton toggleTheme={toggleTheme} />
      </ThemeContext.Provider>
    </>
  )
}

export default App
