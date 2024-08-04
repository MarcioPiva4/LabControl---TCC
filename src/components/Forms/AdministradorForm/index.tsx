'use client';
import Input from "@/components/Input";
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import MenuSubmit from "@/components/MenuSubmit";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import styled from "styled-components";

const FormCepWrapper = styled.div`
    form {
        position: relative;
    }

    button[type='submit'] {
        position: absolute;
        width: 19%;
        height: 29.5px;
        bottom: 27.5%;
        border-radius: 0px 50px 50px 0px;
        right: 0;
    }
`;

interface CepResult {
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
    };
}

const AdministradorForm = () => {
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const [cep, setCep] = useState('');
    const [response, setResponse] = useState<null | CepResult>(null);

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cepValue = e.target.value;
        setCep(cepValue);

        if (cepValue.length >= 8) {
            setSubmiting(true);
            try {
                const response = await fetch('/api/cep', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cep: cepValue }),
                });

                const responseJson = await response.json();
                if (response.ok) {
                    setResponse(responseJson);
                    setError({ error: false, message: '' });
                } else {
                    setError({ error: true, message: responseJson.message });
                }
            } catch (error) {
                setError({ error: true, message: 'Erro ao fazer a consulta do cep, tente novamente.' });
            } finally {
                setSubmiting(null);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/administrador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseJson = await response.json();
            if (response.ok) {
                setSucess(true);
                setError({ error: false, message: '' });
            } else {
                setError({ error: true, message: responseJson.message });
            }
        } catch (error) {
            setError({ error: true, message: 'Erro ao fazer a requisição, tente novamente.' });
        } finally {
            setSubmiting(null);
        }
    };

    return (
        <>
            <DefaultForm onSubmit={handleSubmit}>
                {error.error && <ErrorMessage text={error.message} />}
                <Input type="text" label="Nome" idInput="nome" />
                <Input type="text" label="Telefone" idInput="telefone" />
                <Input type="email" label="E-mail" idInput="email" />
                <Input type="date" label="Data de Contratação" idInput="data_contratacao" />
                <FormCepWrapper>
                    <Input
                        type="text"
                        label="CEP"
                        idInput="cep"
                        value={cep}
                        onChange={handleCepChange}
                    />
                    {submiting && <Loader />}
                </FormCepWrapper>
                <Input type="text" label="Estado" idInput="estado" readOnly value={response ? response.data?.uf : ''} />
                <Input type="text" label="Cidade" idInput="cidade" readOnly value={response ? response.data?.localidade : ''} />
                <Input type="text" label="Rua" idInput="rua" readOnly value={response ? response.data?.logradouro : ''} />
                <Input type="text" label="N°" idInput="numero" readOnly={response ? false : true} />
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess} />}
            </DefaultForm>
        </>
    );
};

export default AdministradorForm;
