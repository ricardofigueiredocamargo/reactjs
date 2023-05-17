import styled from 'styled-components'

export const Main = styled.main`
  height: auto;
  width: auto;
`

export const Output = styled.section`
  position: relative;
  background-color: #252D4A;
  color: #fff;
  width: 100%;
  height: 50px;

  font-size: 1.5rem;
  line-height: 50px;
  padding: 0px 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Result = styled.span`
  display: block;
  position: absolute;

`

export const AllButtons = styled.section`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, 75px);
  grid-template-rows: repeat(5, 45px);
`

export const Button = styled.button`
  color: #fff;
  background: none;
  background-color: #181C2A;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #313855;
  }
`


