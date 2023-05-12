import { useEffect, useState } from 'react'
import { useInput } from './Input.tsx'
import { Main, AllButtons, Output, Result } from './assets/StyledComponents.tsx'
import { DigitButton } from './components/DigitButton.tsx'
import { OperationButton } from './components/OperationButton.tsx'

export const ACTIONS = {
    ADD_NUMBER: 'add-number',
    ADD_OPERATOR: 'add-operator',
    ERASE: 'erase',
    ERASE_ALL: 'erase-all',
    EVALUATE: 'evaluate'
}

let clicked = false // variável para evitar que um operador seja selecionado mais de uma vez antes de adicionar um novo número

export function Calculator() {

    const addFirstNumber = useInput().addFirstNumber
    const addSecondNumber = useInput().addSecondNumber
    const changeOperator = useInput().changeOperator

    const firstNumber = useInput().firstNumber
    const secondNumber = useInput().secondNumber
    const operator = useInput().operator

    

    function handleClick(value: string, type: string) {
        
        switch (type) {
            case ACTIONS.ADD_NUMBER:
                clicked = false

                if (value == '0' && firstNumber == '0') return
                if (value == '.' && firstNumber.includes('.')) return
                if (firstNumber == '0' && value !== '0') {
                    addFirstNumber(value)
                    return
                }
                addFirstNumber(firstNumber + value)
                break

            case ACTIONS.ADD_OPERATOR:
                if (clicked == false) {
                    if (secondNumber == '' && firstNumber == '') return
                    if (secondNumber == '') {
                        addSecondNumber(firstNumber)
                        changeOperator(value)
                        addFirstNumber('')
                        clicked = true
                        return
                    }
                    addSecondNumber(secondNumber + operator + firstNumber)
                    changeOperator(value)
                    addFirstNumber('')
                    clicked = true
                }
                break

            case ACTIONS.ERASE_ALL: 
                clicked = false

                addFirstNumber('')
                addSecondNumber('')
                changeOperator('')
                break   

            case ACTIONS.EVALUATE:
                clicked = false

                addFirstNumber(eval(secondNumber + operator + firstNumber))
                addSecondNumber('')
                changeOperator('')
                break
        }

    }

    return (
        <Main>
            <Output>
                <Result>
                    <span>{secondNumber}</span><span>{operator}</span><span>{firstNumber}</span>
                </Result>
            </Output>
            <AllButtons>
                <OperationButton operation="C" handleClick={handleClick}/>
                <OperationButton operation="CC" handleClick={handleClick}/>
                <OperationButton operation="*" handleClick={handleClick}/>
                <OperationButton operation="/" handleClick={handleClick}/>

                <DigitButton digit="7" handleClick={handleClick}/>
                <DigitButton digit="8" handleClick={handleClick}/>
                <DigitButton digit="9" handleClick={handleClick}/>
                <OperationButton operation="-" handleClick={handleClick}/>

                <DigitButton digit="4" handleClick={handleClick}/>
                <DigitButton digit="5" handleClick={handleClick}/>
                <DigitButton digit="6" handleClick={handleClick}/>
                <OperationButton operation="+" handleClick={handleClick}/>

                <DigitButton digit="1" handleClick={handleClick}/>
                <DigitButton digit="2" handleClick={handleClick}/>
                <DigitButton digit="3" handleClick={handleClick}/>
                <OperationButton operation="=" handleClick={handleClick}/>

                <DigitButton digit="0" handleClick={handleClick}/>
                <DigitButton digit="." handleClick={handleClick}/>
            </AllButtons>
        </Main>
    )
}