'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm"
import Input from "@/components/Input";
import { useState } from "react";

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

export default function FornecedorForm2(){
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const [response, setResponse] = useState<null | cepResult>();
    async function handlerSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
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
                    setSucess(true);
                    setResponse(responseJson);
                    setError({error: false, message: ''});
                } else {
                    setError({error: true, message: responseJson.message})
                }
            }
        } catch(error){
            setError({error: true, message: 'Erro ao fazer a requisição, tente novamente.'})
        } finally {
            setSubmiting(null);
        }
    }
    return(
        <DefaultForm onSubmit={handlerSubmit}>
            <Input type="text" label="CEP" idInput="cep"  />
            <Input type="text" label="Estado" idInput="estado" disabled  value={response ? response.data.uf: ''} />
            <Input type="text" label="Cidade" idInput="cidade" disabled  value={response ? response.data.localidade: ''}/>
            <Input type="text" label="Bairro" idInput="bairro" disabled value={response ? response.data.bairro : ''}/>
            <Input type="text" label="Rua" idInput="rua" disabled value={response ? response.data.logradouro : ''}/>
            <Input type="text" label="N°" idInput="numero" disabled={response ? false : true } />
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
        </DefaultForm>
    )
}