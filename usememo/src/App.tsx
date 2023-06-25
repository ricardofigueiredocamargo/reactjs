import { useState, useMemo, useEffect } from 'react'

export default function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])  

  const themeStyles = useMemo(() => { 
    return{
      backgroundColor: dark ? '#333': '#FFF',
      color: dark ? '#FFF' : '#333'
    }
  }, [dark])  

  useEffect(() => {
    console.log('Theme Changed')
  }, [themeStyles])

  return (
    <>
     <input 
      type="number"
      value={number}
      onChange={(e) => setNumber(parseInt(e.target.value))}
     /> 
     <button onClick={() => setDark(prevDark => !prevDark)} >
      Toggle Theme
     </button>
     <div style={themeStyles}>
      {doubleNumber}
     </div>
    </>
  )
}

function slowFunction(num: number) {
  console.log('Calling Slow Function')
  for (let i = 0; i <= 10000; i++) {}
  return num * 2
}
