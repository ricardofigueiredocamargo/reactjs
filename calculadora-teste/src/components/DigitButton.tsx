import { useInput } from '../Input'
import { Button } from '../assets/StyledComponents'
import { addClassName } from './addClassName'

export function DigitButton({ dispatch, digit }) {
    let span = addClassName(digit, 'column')

    return (
        <Button 
            className={span} 
            onClick={() => dispatch({ type: 'bla', payload: { digit } })}
        >
            {digit}
        </Button>
    )
}
