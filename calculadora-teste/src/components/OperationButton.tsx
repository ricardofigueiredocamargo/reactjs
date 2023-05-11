import { useInput } from '../Input'
import { Button } from '../assets/StyledComponents'
import { addClassName } from './addClassName'

export function OperationButton({ operation }) {
    let span = addClassName(operation, 'row')

    return (
        <Button className={span}>
            {operation}
        </Button>
    )
}
