import { useOutletContext, useParams } from "react-router-dom"

interface IOutletProps {
    hello: string
}

export function Book() {
    const { id } = useParams()
    const obj: IOutletProps = useOutletContext()

    return (
        <>
            <h1>Book {id}</h1>
            {obj.hello}
        </> 
    )
}