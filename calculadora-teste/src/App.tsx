import './assets/App.css'
import { InputProvider } from './Input.tsx'
import { Calculator } from './Calculator.tsx'

function App() {

  return (
    <InputProvider>
      <Calculator />
    </InputProvider>
  )
}

export default App
