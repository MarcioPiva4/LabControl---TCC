'use client'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
`

const Title = styled.h2`
  color: #ff4d4d;
  font-size: 2rem;
  margin-bottom: 20px;
`

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
`

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const handleReload = () => {
    window.location.reload(); // Recarrega a página
  }

  const handleGoBack = () => {
    window.history.back(); // Volta para a página anterior
  }

  return (
    <Container>
      <Title>Something went wrong!</Title>
      <Button onClick={handleReload}>Reload Page</Button>
      <Button onClick={handleGoBack}>Go Back</Button>
    </Container>
  )
}
