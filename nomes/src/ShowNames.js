import React, { useState, useEffect } from 'react'

export function ShowNames() {
    const [firstName, setFirstName] = useState(getName('FIRST'))

    const [lastName, setLastName] = useState(getName('LAST'))

    // recuperar nome salvo no Local Storage
    function getName(position) {
        const name = localStorage.getItem(`${position}-NAME`)
        if (name == null) return ''

        return name
    }

    const fullName = firstName + ' ' + lastName

    // Salva o nome digitado no Local Storage
    useEffect(() => {
        localStorage.setItem("FIRST-NAME", firstName)
        localStorage.setItem("LAST-NAME", lastName)
    })

    function handleFirstName(e) {
        setFirstName(capitalizeName(e.target.value))
    }

    function handleLastName(e) {
        setLastName(capitalizeName(e.target.value))
    }

    // lógica para capitalizar os nomes
    function capitalizeName(name) {
    name = name.split(' ')
    for (let pos in name) {
        name[pos] = name[pos].charAt(0).toUpperCase() + name[pos].slice(1)
    }
    name = name.join(' ')
    return name
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
    )
}
