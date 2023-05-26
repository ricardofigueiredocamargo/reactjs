import styled from "styled-components";

export const Control = styled.section`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
    background-color: #fff;
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.150);
`

export const Inserir = styled.div`
    padding: 10px;
`
export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`
export const Input = styled.input`
    padding: 15px 10px;
    width: 100%;
    height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
`
export const Botoes = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`

export const Button = styled.button`
    background: none;
    margin: 5px 0px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        background-color: #f1f1f1;
        transform: translateY(-3px);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.100);
    }
`