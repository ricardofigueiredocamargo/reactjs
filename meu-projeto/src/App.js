import React, { useEffect, useState } from 'react'

function App() {
  const [firstName, setFirstName] = useState(() => {
    const name = localStorage.getItem("FIRST-NAME")
    if (name == null) return ''

    return name
  })

  const [lastName, setLastName] = useState(() => {
    const name = localStorage.getItem("LAST-NAME")
    if (name == null) return ''

    return name
  })

  const fullName = firstName + ' ' + lastName

  useEffect(() => {
    localStorage.setItem("FIRST-NAME", firstName)
  }, [firstName])

  useEffect(() => {
    localStorage.setItem("LAST-NAME", lastName)
  }, [lastName])

  function handleFirstName(e) {
    setFirstName(e.target.value)
  }

  function handleLastName(e) {
    setLastName(e.target.value)
  }

  return (
    <>
      <div>
        <label htmlFor='iname'>Your Fist Name: </label>
        <input type='text' id='iname' value={firstName} onChange={handleFirstName} />
      </div>  
      <div>
        <label htmlFor='iname'>Your Last Name: </label>
        <input type='text' id='iname' value={lastName} onChange={handleLastName} />
      </div>
      <h1>Hello, {fullName}!</h1>
    </>
  );
}

export default App;
