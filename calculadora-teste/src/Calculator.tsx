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

let operatorClicked = false // variável para evitar que um operador seja selecionado mais de uma vez antes de adicionar um novo número

export function Calculator() {

    const addFirstNumber = useInput().addFirstNumber
    const addSecondNumber = useInput().addSecondNumber
    const changeOperator = useInput().changeOperator

    const firstNumber = useInput().firstNumber
    const secondNumber = useInput().secondNumber
    const operator = useInput().operator

    function handleClick(value: string, type: string): void {
        
        switch (type) {
            case ACTIONS.ADD_NUMBER:
                operatorClicked = false

                if (value == '0' && firstNumber == '0') return
                if (value == '.' && firstNumber.includes('.')) return
                if (firstNumber == '0' && value !== '0') {
                    if (value == '.') {
                        addFirstNumber(firstNumber + value)
                    } else {
                        addFirstNumber(value)
                    }
                    return
                }
                addFirstNumber(firstNumber + value)
                break

            case ACTIONS.ADD_OPERATOR:
                if (operatorClicked == true) {
                    if (firstNumber == '') {
                        changeOperator(value)
                    }
                }

                if (operatorClicked == false) {
                    if (secondNumber == '' && firstNumber == '') return
                    if (secondNumber == '') {
                        addSecondNumber(firstNumber)
                        changeOperator(value)
                        addFirstNumber('')
                        operatorClicked = true
                        return
                    }
                    addSecondNumber(secondNumber + operator + firstNumber)
                    changeOperator(value)
                    addFirstNumber('')
                    operatorClicked = true
                }
                break

            case ACTIONS.ERASE:
                operatorClicked = false

                if (firstNumber !== '') {
                    addFirstNumber(firstNumber.substring(0, firstNumber.length - 1))
                }
                if (firstNumber == '' && operator !== '') {
                    changeOperator('')
                }
                if (firstNumber == '' && operator == '' && secondNumber !== '') {
                    addSecondNumber(secondNumber.substring(0, secondNumber.length - 1))
                }
                break    

            case ACTIONS.ERASE_ALL: 
                operatorClicked = false

                addFirstNumber('')
                addSecondNumber('')
                changeOperator('')
                break   

            case ACTIONS.EVALUATE:
                operatorClicked = false

                let resultado = eval(secondNumber + operator + firstNumber)
                resultado = resultado.toString()
                
                addFirstNumber(resultado)
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
                <OperationButton digit="C" handleClick={handleClick}/>
                <OperationButton digit="CC" handleClick={handleClick}/>
                <OperationButton digit="*" handleClick={handleClick}/>
                <OperationButton digit="/" handleClick={handleClick}/>

                <DigitButton digit="7" handleClick={handleClick}/>
                <DigitButton digit="8" handleClick={handleClick}/>
                <DigitButton digit="9" handleClick={handleClick}/>
                <OperationButton digit="-" handleClick={handleClick}/>

                <DigitButton digit="4" handleClick={handleClick}/>
                <DigitButton digit="5" handleClick={handleClick}/>
                <DigitButton digit="6" handleClick={handleClick}/>
                <OperationButton digit="+" handleClick={handleClick}/>

                <DigitButton digit="1" handleClick={handleClick}/>
                <DigitButton digit="2" handleClick={handleClick}/>
                <DigitButton digit="3" handleClick={handleClick}/>
                <OperationButton digit="=" handleClick={handleClick}/>

                <DigitButton digit="0" handleClick={handleClick}/>
                <DigitButton digit="." handleClick={handleClick}/>
            </AllButtons>
        </Main>
    )
}