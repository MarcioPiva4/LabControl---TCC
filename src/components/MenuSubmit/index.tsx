"use client";
import { theme } from "@/styles/theme";
import { scrollTop } from "@/utils/scrollTop";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const MenuWrapper = styled.div`
    position: fixed;
    background-color: #FFFFFF;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    max-width: 500px;
    max-height: 400px;

    div{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 50px 10px;
        justify-content: center;
        align-items: center;
        h2{
            color: #041833;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            line-height: 29.05px;
            margin-bottom: 50px;
        }
        button{
            width: 90%;
            height: 50px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 17px;
            font-weight: 700;
            line-height: 21px;
            a{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                text-decoration: none;
                color: #000;
            }
        }
        button:nth-child(2){
            background: ${props => props.theme.color.gradient};
            color: #fff;
            margin-bottom: 25px;
        }
    }
`;

export default function MenuSubmit({ setSucess, href, link, message }: {setSucess?: any; href?: string; link?: boolean; message?: string}){
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
    return (
      <ThemeProvider theme={theme}>
        <Overlay>
          <MenuWrapper>
            <div>
              <h2>{message ? message : 'Cadastrar novamente?'}</h2>
              <button
                type="reset"
                onClick={() =>
                  link
                    ? router.push(href as string)
                    : setTimeout(() => setSucess(false), 100) && scrollTop()
                }>
                SIM
              </button>
              <button type="button">
                <Link href={"/"}>NÃO</Link>
              </button>
            </div>
          </MenuWrapper>
        </Overlay>
      </ThemeProvider>
    );
  }
           