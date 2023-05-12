import { Button } from '../assets/StyledComponents'
import { addClassName } from './addClassName'
import { ACTIONS } from '../Calculator'

export function DigitButton({ handleClick, digit }) {
    let span = addClassName(digit, 'column')

    return (
        <Button 
            className={span} 
            onClick={() => handleClick(digit, ACTIONS.ADD_NUMBER)}
        >
            {digit}
        </Button>
    )
}
