import './assets/App.css'
import { Calculator, AllButtons, Button, Output } from './assets/StyledComponents.tsx'
import { InputProvider, useInput } from './Input.tsx'
import { DigitButton } from './components/DigitButton.tsx'
import { OperationButton } from './components/OperationButton.tsx'
import { useReducer } from 'react'

function reducer (state, { type, payload }) {
  switch(type) {
    case 'bla': 
      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <InputProvider>
      <Calculator>
        <Output>
          {currentOperand}{operation}{previousOperand}
        </Output>
        <AllButtons>
          <OperationButton operation="C"/>
          <OperationButton operation="CC"/>
          <OperationButton operation="*"/>
          <OperationButton operation="/"/>

          <DigitButton digit="7" dispatch={dispatch}/>
          <DigitButton digit="8" dispatch={dispatch}/>
          <DigitButton digit="9" dispatch={dispatch}/>
          <OperationButton operation="-"/>

          <DigitButton digit="4" dispatch={dispatch}/>
          <DigitButton digit="5" dispatch={dispatch}/>
          <DigitButton digit="6" dispatch={dispatch}/>
          <OperationButton operation="+"/>

          <DigitButton digit="1" dispatch={dispatch}/>
          <DigitButton digit="2" dispatch={dispatch}/>
          <DigitButton digit="3" dispatch={dispatch}/>
          <OperationButton operation="="/>

          <DigitButton digit="0" dispatch={dispatch}/>
          <DigitButton digit="." dispatch={dispatch}/>
        </AllButtons>
      </Calculator>
   </InputProvider>
  )
}

export default App
