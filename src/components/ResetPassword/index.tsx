"use client";

import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import DefaultForm from "../DefaultForm";
import { useEffect, useState } from "react";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { signOut } from "next-auth/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MenuWrapper = styled.div`
  background-color: #062044;
  width: 90%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  label {
    color: #fff;
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;

    span {
      margin-bottom: 5px;
      font-weight: 500;
    }

    position: relative;
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 100%;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      transition: border 0.3s;

      &:focus {
        border-color: #007bff;
      }
    }

    .eye-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  button {
    width: 60%;
    margin: 10px auto;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid;
  }
`;

export default function ResetPassword({ id, role }: { id: string; role: string }) {
  const [error, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: id,
      password: formData.get('password'),
      passwordRepeat: formData.get('passwordRepeat')
    };

    setSubmitting(true);
    const response = role == 'adm' ? await fetch('/api/administrador', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }) : await fetch('/api/professor', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    setSubmitting(false);

    if (response.ok) {
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
          <h2>Adicione uma nova senha para continuar</h2>
          <DefaultForm onSubmit={handleSubmit}>
            <label>
              <span>Senha:</span>
              <div className="input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                />
                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
                </div>
              </div>
            </label>
            <label>
              <span>Repita a Senha:</span>
              <div className="input-container">
                <input 
                  type={showPasswordRepeat ? "text" : "password"} 
                  name="passwordRepeat" 
                  required 
                />
                <div className="eye-icon" onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}>
                  {showPasswordRepeat ? <AiFillEye size={24} /> :  <AiFillEyeInvisible size={24} />}
                </div>
              </div>
            </label>
            {error.error && <ErrorMessage text={error.message} error={error} />}
            <Button type="submit" is="isNotTransparent">
              {submitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </DefaultForm>
        </MenuWrapper>
      </Overlay>
    </ThemeProvider>
  );
}
