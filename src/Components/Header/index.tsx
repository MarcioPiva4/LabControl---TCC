"use client";
import styled, { ThemeProvider } from "styled-components";
import { Icons } from "./Icons";
import { theme } from "@/styles/theme";
import Link from "next/link";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { usePathname } from "next/navigation";

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.secondary};
  height: 12vh;
  z-index: 10;

  & > div {
    height: 100%;
  }

  & > div > nav {
    height: 100%;
  }

  & > div > nav > ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
  }
`;
const Li = styled.li.attrs<{ $active?: boolean }>((props) => ({
  $active: props.$active || false,
}))`
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
  & > a {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 8px;
    color: ${(props) => props.theme.color.white};
    text-decoration: none;
  }
  p {
    transition: 0.3s all;
    color: ${(props) =>
      props.$active ? props.theme.color.primary : props.theme.color.white};
    @media screen and (max-width: 355px) {
      font-size: ${(props) => props.theme.font.minSize};
    }
    font-size: ${(props) => props.theme.font.text.size};
    font-weight: ${(props) => props.theme.font.text.weight};
    text-align: center;
    white-space: nowrap;
  }
  svg > path {
    fill: ${(props) =>
      props.$active ? props.theme.color.primary : props.theme.color.white};
  }
  &:hover p {
    color: ${(props) => props.theme.color.primary};
  }
  &:hover svg path {
    fill: ${(props) => props.theme.color.primary};
  }
`;
const SubMenu = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 60vw;
  height: 91vh;
  background-color: ${(props) => props.theme.color.secondary};
  z-index: 1;
  overflow: hidden;

  @keyframes subMenuOpen {
    from {
      left: -60vw;
    }
    to {
      left: 0;
    }
  }

  @keyframes subMenuClose {
    from {
      left: 0;
    }
    to {
      left: -60vw;
    }
  }

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    animation: subMenuOpen 0.5s;
  }
  &.fade-exit-active {
    animation: subMenuClose 0.6s;
  }

  & > ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 25px 15px;
    justify-content: flex-end;
  }

  & > ul > li > a {
    color: ${(props) => props.theme.color.white};
    text-decoration: none;
  }

  & > ul > li > a > span {
    font-size: ${(props) => props.theme.font.headerSubMenuLinks.size};
    font-weight: ${(props) => props.theme.font.headerSubMenuLinks.weight};
    line-height: ${(props) => props.theme.font.headerSubMenuLinks.height};
    transition: 0.3s all;
  }

  & > ul > li > a:hover > span {
    color: ${(props) => props.theme.color.primary};
    position: relative;
  }

  & > ul > li > a > span:before {
    width: 0;
    background-color: ${(props) => props.theme.color.primary};
    height: 2px;
    position: absolute;
    content: "";
    bottom: -2px;
  }

  & > ul > li > a:hover > span::before {
    background-color: ${(props) => props.theme.color.primary};
    width: 100%;
    animation: animationHoverLink 0.3s;
  }

  @keyframes animationHoverLink {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

export function Header() {
  const pathName = usePathname();
  const [menu, setMenu] = useState<boolean>(false);
  const [home, setHome] = useState<boolean>(pathName == "/")
  const [manutencao, setManutencao] = useState<boolean>(pathName == "/manutencao");
  const [baixaAulas, setBaixaAulas] = useState<boolean>(pathName == "/baixa-de-aulas");
  const [relatorios, setRelatorios] = useState<boolean>(pathName == "/relatorios");

  const subMenuRef = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={theme}>
      <HeaderWrapper>
        <div>
          <nav>
            <ul>
              <Li $active={menu} onClick={() => setMenu(!menu)}>
                <p>Cadastro</p>
                <Icons icon="cadastro"></Icons>
              </Li>
              <Li $active={manutencao}>
                <Link href={"#"} onClick={() => setMenu(false)}>
                  <p>Manutenção</p>
                  <Icons icon="manutencao"></Icons>
                </Link>
              </Li>
              <Li $active={home}>
                <Link href={"/"} onClick={() => setMenu(false)}>
                  <p>Home</p>
                  <Icons icon="home"></Icons>
                </Link>
              </Li>
              <Li $active={baixaAulas}>
                <Link href={"#"} onClick={() => setMenu(false)}>
                  <p>Baixa de aulas</p>
                  <Icons icon="baixaAulas"></Icons>
                </Link>
              </Li>
              <Li $active={relatorios}>
                <Link href={"#"} onClick={() => setMenu(false)}>
                  <p>Relatorios</p>
                  <Icons icon="relatorios"></Icons>
                </Link>
              </Li>
            </ul>
          </nav>
        </div>
      </HeaderWrapper>
      <CSSTransition
        classNames="fade"
        timeout={500}
        in={menu}
        unmountOnExit
        nodeRef={subMenuRef}
      >
        <SubMenu ref={subMenuRef}>
          <ul>
            <li>
              <Link
                href={"/cadastro/administrador"}
                onClick={() => setMenu(!menu)}
              >
                <span>Administrador</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/agente-reagente"}
                onClick={() => setMenu(!menu)}
              >
                <span>Agentes/Reagentes</span>
              </Link>
            </li>
            <li>
              <Link href={"/cadastro/aula"} onClick={() => setMenu(!menu)}>
                <span>Aulas</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/equipamentos"}
                onClick={() => setMenu(!menu)}
              >
                <span>Equipamentos</span>
              </Link>
            </li>
            <li>
              <Link href={"/cadastro/fornecedor"} onClick={() => setMenu(!menu)}>
                <span>Fornecedor</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/laboratorio"}
                onClick={() => setMenu(!menu)}
              >
                <span>Laboratorio</span>
              </Link>
            </li>
            <li>
              <Link href={"/cadastro/materias"} onClick={() => setMenu(!menu)}>
                <span>Matérias</span>
              </Link>
            </li>
            <li>
              <Link href={"/cadastro/professor"} onClick={() => setMenu(!menu)}>
                <span>Professor</span>
              </Link>
            </li>
            <li>
              <Link href={"/cadastro/vidrarias"} onClick={() => setMenu(!menu)}>
                <span>Vidrarias</span>
              </Link>
            </li>
          </ul>
        </SubMenu>
      </CSSTransition>
    </ThemeProvider>
  );
}
