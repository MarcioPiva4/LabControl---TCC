'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm"
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import { Loader } from "@/components/Loader";
import MenuSubmit from "@/components/MenuSubmit";
import { useState } from "react";
import styled from "styled-components";

interface cepResult {
    data: {
        bairro: string;
        cep: string;
        complemento: string;
        ddd: string;
        gia: string;
        ibge: string;
        localidade: string;
        logradouro: string;
        siafi: string;
        uf: string;
        unidade: string;
    }
}

const FormCepWrapper = styled.div`
    form{
        position: relative;
    }

    button[type='submit']{
        position: absolute;
        width: 19%;
        height: 29.5px;
        bottom: 27.5%;
        border-radius: 0px 50px 50px 0px;
        right: 0;
    }
`;

export default function FornecedorForm2(){
    const [cep, setCep] = useState('');
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const [response, setResponse] = useState<null | cepResult>();
    
    async function handlerSubmitCep(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        setCep(data.cep as string); // Atualiza o estado do CEP
        try{
            if(data.cep.toString().length >= 8){
                const response = await fetch('/api/cep', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const responseJson = await response.json();
                if (response.ok) {
                    setResponse(responseJson);
                    setError({error: false, message: ''});
                } else {
                    setError({error: true, message: responseJson.message})
                }
            }
        } catch(error){
            setError({error: true, message: 'Erro ao fazer a consulta do cep, tente novamente.'})
        } finally {
            setSubmiting(null);
        }
    }

    async function handlerSubmitForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formEntries = Object.fromEntries(formData.entries());
        const storedData = JSON.parse(localStorage.getItem('fornecedorscreen1') as string);
        const data = {
          ...formEntries,
          ...storedData,
        };
        try {
          const response = await fetch("/api/fornecedor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const responseJson = await response.json();
          if (response.ok) {
            setSucess(true);
            setResponse(responseJson);
            localStorage.clear();
            setError({ error: false, message: "" });
          } else {
            setError({ error: true, message: responseJson.message });
          }
        } catch (error) {
          setError({
            error: true,
            message: "Erro ao enviar o formulário, tente novamente.",
          });
        } finally {
          setSubmiting(null);
        }
    }
    
    return(
        <>
        <FormCepWrapper>
            {error.error && <ErrorMessage text={error.message} error={error}></ErrorMessage>}
            {submiting ? <Loader></Loader> : null}
            <DefaultForm onSubmit={handlerSubmitCep}>
                <Input type="text" label="CEP" idInput="cep"  />
                <Button type="submit" is="isNotTransparent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.4375 12.9375C5.60417 14.1042 7.02083 14.6875 8.6875 14.6875C10.3542 14.6875 11.7708 14.1042 12.9375 12.9375C14.1042 11.7708 14.6875 10.3542 14.6875 8.6875C14.6875 7.02083 14.1042 5.60417 12.9375 4.4375C11.7708 3.27083 10.3542 2.6875 8.6875 2.6875C7.02083 2.6875 5.60417 3.27083 4.4375 4.4375C3.27083 5.60417 2.6875 7.02083 2.6875 8.6875C2.6875 10.3542 3.27083 11.7708 4.4375 12.9375ZM16.6875 14.6875L23.3125 21.3125L21.3125 23.3125L14.6875 16.6875V15.625L14.3125 15.25C12.7292 16.625 10.8542 17.3125 8.6875 17.3125C6.27083 17.3125 4.20833 16.4792 2.5 14.8125C0.833333 13.1458 0 11.1042 0 8.6875C0 6.27083 0.833333 4.22917 2.5 2.5625C4.20833 0.854167 6.27083 0 8.6875 0C11.1042 0 13.1458 0.854167 14.8125 2.5625C16.4792 4.22917 17.3125 6.27083 17.3125 8.6875C17.3125 9.5625 17.1042 10.5625 16.6875 11.6875C16.2708 12.7708 15.7917 13.6458 15.25 14.3125L15.625 14.6875H16.6875Z" fill="#FFF" />
                </svg>
                </Button>
            </DefaultForm>
        </FormCepWrapper>
        <DefaultForm onSubmit={handlerSubmitForm}>
            <Input type="hidden" idInput="cep" value={cep} />
            <Input type="text" label="Estado" idInput="estado" readOnly  value={response ? response.data?.uf: ''} />
            <Input type="text" label="Cidade" idInput="cidade" readOnly value={response ? response.data?.localidade: ''}/>
            <Input type="text" label="Bairro" idInput="bairro" readOnly value={response ? response.data?.bairro : ''}/>
            <Input type="text" label="Rua" idInput="rua" readOnly value={response ? response.data?.logradouro : ''}/>
            <Input type="text" label="N°" idInput="numero" readOnly={response ? false : true } />
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            {sucess && <MenuSubmit setSucess={setSucess} link href="/cadastro/fornecedor"></MenuSubmit>}
        </DefaultForm>
        </>
    )
}
