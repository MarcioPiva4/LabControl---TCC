"use client";
import styled, { ThemeProvider } from "styled-components";
import { Icons } from "./Icons";
import { theme } from "@/styles/theme";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

export function Header( { session }: { session?: any }) {
  const pathName = usePathname();
  const [menu, setMenu] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>(pathName);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const iconMenu = useRef<HTMLLIElement>(null);
  const handleLinkClick = (path: string) => {
    setMenu(false);
    setActivePage(path);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target as Node) &&
      iconMenu.current &&
      !iconMenu.current.contains(event.target as Node)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <HeaderWrapper>
        <div>
          <nav>
            <ul>
              <Li $active={menu} onClick={() => setMenu(!menu)} ref={iconMenu}>
                <p>Cadastro</p>
                <Icons icon="cadastro" />
              </Li>
              <Li $active={activePage === "/manutencao"}>
                <Link
                  href={"/manutencao"}
                  onClick={() => handleLinkClick("/manutencao")}>
                  <p>Manutenção</p>
                  <Icons icon="manutencao" />
                </Link>
              </Li>
              <Li $active={activePage === "/"}>
                <Link href={"/"} onClick={() => handleLinkClick("/")}>
                  <p>Home</p>
                  <Icons icon="home" />
                </Link>
              </Li>
              <Li $active={activePage === "/baixa-de-aulas"}>
                <Link
                  href={"/baixa-de-aulas"}
                  onClick={() => handleLinkClick("/baixa-de-aulas")}>
                  <p>Baixa de aulas</p>
                  <Icons icon="baixaAulas" />
                </Link>
              </Li>
              <Li $active={activePage === "/relatorios"}>
                <Link
                  href={"/relatorios"}
                  onClick={() => handleLinkClick("/relatorios")}>
                  <p>Relatorios</p>
                  <Icons icon="relatorios" />
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
        nodeRef={subMenuRef}>
        <SubMenu ref={subMenuRef}>
          <ul>
            {session.user.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/administrador"}
                  onClick={() => handleLinkClick("/cadastro/administrador")}>
                  <span>Administrador</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/cadastro/agente-reagente"}
                onClick={() => handleLinkClick("/cadastro/agente-reagente")}>
                <span>Agentes/Reagentes</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/aula"}
                onClick={() => handleLinkClick("/cadastro/aula")}>
                <span>Aulas</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/equipamentos"}
                onClick={() => handleLinkClick("/cadastro/equipamentos")}>
                <span>Equipamentos</span>
              </Link>
            </li>
            {session.user.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/fornecedor"}
                  onClick={() => handleLinkClick("/cadastro/fornecedor")}>
                  <span>Fornecedor</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/cadastro/laboratorio"}
                onClick={() => handleLinkClick("/cadastro/laboratorio")}>
                <span>Laboratorio</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/cadastro/materias"}
                onClick={() => handleLinkClick("/cadastro/materias")}>
                <span>Matérias</span>
              </Link>
            </li>
            {session.user.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/professor"}
                  onClick={() => handleLinkClick("/cadastro/professor")}>
                  <span>Professor</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/cadastro/vidrarias"}
                onClick={() => handleLinkClick("/cadastro/vidrarias")}>
                <span>Vidrarias</span>
              </Link>
            </li>
          </ul>
        </SubMenu>
      </CSSTransition>
    </ThemeProvider>
  );
}
