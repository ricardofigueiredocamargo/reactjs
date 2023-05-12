import { Button } from '../assets/StyledComponents'
import { addClassName } from './addClassName'
import { ACTIONS } from '../Calculator'

export function OperationButton({ handleClick, operation }) {
    let span = addClassName(operation, 'row')

    let type = ACTIONS.ADD_OPERATOR

    switch (operation) {
        case 'C':
            type = ACTIONS.ERASE
            break
        case 'CC':
            type = ACTIONS.ERASE_ALL
            break
        case '=':
            type = ACTIONS.EVALUATE        
    }

    return (
        <Button 
            className={span}
            onClick={() => handleClick(operation, type)}
        >
            {operation}
        </Button>
    )
}
