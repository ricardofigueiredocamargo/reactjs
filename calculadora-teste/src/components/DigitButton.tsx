import { Button } from '../assets/StyledComponents'
import { addClassName, IProps } from './addClassName'
import { ACTIONS } from '../Calculator'

export function DigitButton({ handleClick, digit }: IProps) {
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
