import { Button } from '../assets/StyledComponents'
import { addClassName, IProps } from './addClassName'
import { ACTIONS } from '../Calculator'

export function OperationButton({ handleClick, digit }: IProps) {
    let span = addClassName(digit, 'row')

    let type = ACTIONS.ADD_OPERATOR

    switch (digit) {
        case 'C':
            type = ACTIONS.ERASE
            break
        case 'CC':
            type = ACTIONS.ERASE_ALL
            break
        case '=':
            type = ACTIONS.EVALUATE        
    }

    console.log(handleClick)

    return (
        <Button 
            className={span}
            onClick={() => handleClick(digit, type)}
        >
            {digit}
        </Button>
    )
}
