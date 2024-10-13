'use client';
import Input from "@/components/Input";
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import MenuSubmit from "@/components/MenuSubmit";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import TextArea from "@/components/TextArea";

const LaboratorioForm = () => {
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/laboratorio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (response.ok) {
                setSucess(true);
                setError({error: false, message: ''});
            } else {
                setError({error: true, message: responseJson.message})
            }
        } catch (error) {
            setError({error: true, message: 'Erro ao fazer a requisição, tente novamente.'})
        } finally {
            setSubmiting(null);
        }
    };
    return (
        <>
            <DefaultForm onSubmit={handleSubmit}>
                {error.error && <ErrorMessage text={error.message} error={error}></ErrorMessage>}
                <Input type="text" label="Nome do Laboratório" idInput="nome"></Input>
                <Input type="text" label="Prédio" idInput="predio"></Input>
                <Input type="text" label="Andar" idInput="andar"></Input>
                <Input type="text" label="Bloco" idInput="bloco"></Input>
                <Input type="text" label="Sala"  idInput="sala"></Input>
                <Input type="text" label="Responsável" idInput="responsavel"></Input>
                <TextArea labelText="Descrição" id="descricao" length></TextArea>
                {submiting ? <Loader></Loader> : null}
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
            </DefaultForm>
        </>
    );
};

export default LaboratorioForm;
