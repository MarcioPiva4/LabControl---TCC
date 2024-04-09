"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  width: 90%;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const Figure = styled.figure`
  width: 250px;
  height: 250px;
`;

const Paragraph = styled.p`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

const Button = styled(Link)`
  border: none;
  outline: none;
  width: 75%;
  height: 50px;
  background-color: #84eec1;
  color: #041833;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.78px;
  transition: 0.3s all;
  border: 1px solid #84eec1;
  &:hover {
    background-color: transparent;
    color: #84eec1;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export default function NotFound() {
  const pathname = usePathname();
  return (
    <Section>
      <Container>
        <Figure>
          <StyledImage
            src="/404.svg"
            width={100}
            height={100}
            alt="Ícone não encontrado"
          />
        </Figure>
        <Paragraph>
          Não foi possivel encontrar &#34;{pathname.replace("/", "")}&quot;
        </Paragraph>
        <Button href={"/"}>Voltar</Button>
      </Container>
    </Section>
  );
}
