"use client";

import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import DefaultForm from "../DefaultForm";
import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { Loader } from "../Loader";
import { signOut } from "next-auth/react";

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
  z-index: 100;
`;

const MenuWrapper = styled.div`
  position: fixed;
  background-color: #041833;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  max-width: 500px;
  max-height: 400px;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 10px;
    justify-content: center;
    align-items: center;
    h2 {
      color: #fff;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 29.05px;
      margin-bottom: 50px;
    }
    label{
        color: #fff;
    }

    button{
        width: 60%;
        margin: 10px auto;
    }
  }
`;

export default function ResetPassword({ id }: {id: string}) {
    const [error, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const [response, setResponse] = useState(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
        id: id,
        password: formData.get('password'),
        passwordRepeat: formData.get('passwordRepeat')
    };

    const response = await fetch('/api/administrador', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    if (response.ok) {
        setResponse(responseJson);
        setError({ error: false, message: '' });
        signOut();
    } else {
        setError({ error: true, message: responseJson.message });
    }
} 
  return (
    <ThemeProvider theme={theme}>
      <Overlay>
        <MenuWrapper>
          <div>
            <h2>Adicione uma nova senha para continuar</h2>
            <DefaultForm onSubmit={handleSubmit}>
              <label>
                <span>Senha:</span>
                <input type="password" name="password"></input>
              </label>
              <label>
                <span>Repita a Senha:</span>
                <input type="password" name="passwordRepeat"></input>
              </label>
              <Button type="submit" is="isNotTransparent">Enviar</Button>
              {error.error && <ErrorMessage text={error.message} error={error} />}
            </DefaultForm>
          </div>
        </MenuWrapper>
      </Overlay>
    </ThemeProvider>
  );
}
