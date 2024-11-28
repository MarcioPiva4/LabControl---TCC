'use client'

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: linear-gradient(180deg, rgba(21,69,128,1) 0%, rgba(4,24,51,1) 100%);
  font-family: Arial, sans-serif;
  width: 95%;
  margin: 0 auto;
`

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`

const Subtitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: center;
`

const ContainerButtons = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:first-child{
    background-color: #84EEC1;
    color: #041833;
  }

  &:last-child{
    background-color: #041833;
    color: #84EEC1;
    border: 1px solid #84EEC1;
  }
`

const GlobalError = ({ error, reset }: { error: Error, reset: () => void }) => {
  const handleReload = () => {
    window.location.reload()
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <Container>
      <Title>Algo ocorreu errado.</Title>
      <Subtitle>Contate um administrador e informe o erro</Subtitle>
      <ContainerButtons>
        <Button onClick={handleReload}>Tente Novamente</Button>
        <Button onClick={handleGoBack}>Voltar</Button>
      </ContainerButtons>
    </Container>
  )
}

export default GlobalError
