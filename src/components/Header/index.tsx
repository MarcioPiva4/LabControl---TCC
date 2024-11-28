"use client";
import styled, { ThemeProvider } from "styled-components";
import { Icons } from "./Icons";
import { theme } from "@/styles/theme";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.secondary};
  height: 12vh;
  z-index: 10;
  @media screen and (min-width: 769px){
      display: none;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  max-width: 300px;

  .logo-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
      width: 150px;
      height: 100%;
      object-fit: contain;
    }
  }

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

export default function Header() {
  const { data: session, status } = useSession(); 
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
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
        <>
          <HeaderWrapper>
            <div>
              <nav>
                <ul>
                  <Li
                    $active={menu}
                    onClick={() => setMenu(!menu)}
                    ref={iconMenu}>
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
                  <Li $active={activePage === "/baixa-aulas"}>
                    <Link
                      href={"/baixa-aulas"}
                      onClick={() => handleLinkClick("/baixa-aulas")}>
                      <p>Baixa de aulas</p>
                      <Icons icon="baixaAulas" />
                    </Link>
                  </Li>
                  <Li>
                    <Link
                      href={"#"}
                      onClick={() => signOut({ callbackUrl: "/login" })}>
                      <p>Sair</p>
                      <Icons icon="sair" />
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
              <div className="logo-content">
                <Link href={"/"}>
                  <Image src={logo} alt="logo da labcontrol"></Image>
                </Link>
              </div>
              <ul>
                {session!.user?.role != "prof" && (
                  <li>
                    <Link
                      href={"/cadastro/administrador"}
                      onClick={() =>
                        handleLinkClick("/cadastro/administrador")
                      }>
                      <span>Administrador</span>
                    </Link>
                  </li>
                )}
                {session!.user!.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/agente-reagente"}
                    onClick={() =>
                      handleLinkClick("/cadastro/agente-reagente")
                    }>
                    <span>Agentes/Reagentes</span>
                  </Link>
                </li>
                )}
                <li>
                  <Link
                    href={"/cadastro/aula"}
                    onClick={() => handleLinkClick("/cadastro/aula")}>
                    <span>Aulas</span>
                  </Link>
                </li>
                {session!.user?.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/equipamentos"}
                    onClick={() => handleLinkClick("/cadastro/equipamentos")}>
                    <span>Equipamentos</span>
                  </Link>
                </li>
                )}
                {session!.user!.role != "prof" && (
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
                {session!.user!.role != "prof" && (
                  <li>
                    <Link
                      href={"/cadastro/professor"}
                      onClick={() => handleLinkClick("/cadastro/professor")}>
                      <span>Professor</span>
                    </Link>
                  </li>
                )}
                {session!.user!.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/vidrarias"}
                    onClick={() => handleLinkClick("/cadastro/vidrarias")}>
                    <span>Vidrarias</span>
                  </Link>
                </li>
                )}
              </ul>
            </SubMenu>
          </CSSTransition>
        </>

        <HeaderDesktop session={session}></HeaderDesktop>
    </ThemeProvider>
  );
}

const HeaderDesktopContent = styled.header`
    height: 100%;
    width: 213px;
    background-color: #041833;
    position: fixed;
    z-index: 1000;
    @media screen and (max-width: 769px){
      display: none;
    }
    .menu-links{
      height: 100%;
      padding: 50px 10px 0 10px;
      overflow: auto;
      >li{
        padding: 2px 0;
        &.active > a {
        background-color: #154580;
        color: #fff;
        }

        &.active > a svg {
          fill: #fff;
        }
        >a{
          color: #fff;
          text-decoration: none;
          padding: 10px 15px;
          width: 100%;
          display: flex;
          gap: 10px;
          align-items: center;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 600;
          transition: 0.2s all;
          &:hover{
            background-color: #154580;
          }
          svg{
            width: 20px;
            height: 20px;
          }
        }
        .submenu-links{
            padding: 0 15px;
            li{
              padding: 5px 0;
              a{
                font-size: 16px;
                font-weight: 400;
                line-height: 25px;
                color: #fff;
                text-decoration: none;
              }
            }
          }
      }
    }
`;

export function HeaderDesktop({ session }: { session?: Session | null }){
  const pathName = usePathname();
  const [cadastro, setCadastro] = useState<boolean>(false);

  const [homeOpen, setHomeOpen] = useState<boolean>(false || pathName === '/');
  const [manutencaoOpen, setManutencaoOpen] = useState<boolean>(false || pathName === '/manutencao');
  const [baixaAulaOpen, setBaixaAulaOpen ] = useState<boolean>(false || pathName === '/baixa-aulas');

  const submenuRef = useRef<HTMLUListElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      submenuRef.current &&
      !submenuRef.current.contains(event.target as Node)
    ) {
      setCadastro(false);
    }
  };

  useEffect(() => {
    if (cadastro) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [cadastro]);
  return(
    <HeaderDesktopContent>
      <ul className="menu-links">
        <li className={`${homeOpen ? "active" : ""}`}>
          <Link
            href={"/"}
            onClick={() => setCadastro(false)}
            >
            <Icons icon="home" />
            <span>Home</span>
          </Link>
        </li>
        <li className={`link-register ${cadastro ? "active" : ""}`}>
          <Link
            href={"#"}
            onClick={() => setCadastro(!cadastro)}
          >
            <Icons icon="cadastro" />
            <span>Cadastro</span>
          </Link>

          {cadastro &&
            <ul className="submenu-links" ref={submenuRef}>
              {session!.user!.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/administrador"}
                    onClick={() => setCadastro(false)}
                  >
                    <span>Administrador</span>
                  </Link>
                </li>
              )}

              {session!.user!.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/agente-reagente"}
                  onClick={() => setCadastro(false)}
                  >
                  <span>Agentes/Reagentes</span>
                </Link>
              </li>
              )} 
              <li>
                <Link
                  href={"/cadastro/aula"}
                  onClick={() => setCadastro(false)}
                >
                  <span>Aulas</span>
                </Link>
              </li>
              {session!.user!.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/equipamentos"}
                  onClick={() => setCadastro(false)}
                  >
                  <span>Equipamentos</span>
                </Link>
              </li>
              )}
              {session!.user!.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/fornecedor"}
                    onClick={() => setCadastro(false)}
                    >
                    <span>Fornecedor</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={"/cadastro/laboratorio"}
                  onClick={() => setCadastro(false)}
                  >
                  <span>Laboratorio</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/cadastro/materias"}
                  onClick={() => setCadastro(false)}
                  >
                  <span>Matérias</span>
                </Link>
              </li>
              {session!.user!.role != "prof" && (
                <li>
                  <Link
                    href={"/cadastro/professor"}
                    onClick={() => setCadastro(false)}
                    >
                    <span>Professor</span>
                  </Link>
                </li>
              )}
              {session!.user!.role != "prof" && (
              <li>
                <Link
                  href={"/cadastro/vidrarias"}
                  onClick={() => setCadastro(false)}
                  >
                  <span>Vidrarias</span>
                </Link>
              </li>
              )}
            </ul> 
          }
        </li>
        <li className={`${manutencaoOpen ? "active" : ""}`}>
          <Link
            href={"/manutencao"}
            onClick={() => setCadastro(false)}
            >
            <Icons icon="manutencao" />
            <span>Manutenção</span>
          </Link>
        </li>
        <li className={`${baixaAulaOpen ? "active" : ""}`}>
          <Link
            href={"/baixa-aulas"}
            onClick={() => setCadastro(false)}
            >
            <Icons icon="baixaAulas" />
            <span>Baixa de aula</span>
          </Link>
        </li>
        <li>
          <Link
            href={"#"}
            onClick={() => signOut({ callbackUrl: "/login" })}
            >
            <Icons icon="sair" />
            <span>Sair</span>
          </Link>
        </li>
      </ul>
    </HeaderDesktopContent>
  )
}
