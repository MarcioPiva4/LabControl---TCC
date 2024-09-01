'use client';
import Input from "@/components/Input";
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import MenuSubmit from "@/components/MenuSubmit";
import { useRef, useState } from "react";
import { Loader } from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import TextArea from "@/components/TextArea";
import styled from "styled-components";
import InputSelectCheckbox from "@/components/InputSelectCheckbox";

const InputCheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    div{
        margin-bottom: 0px;
    }
`;

const EquipamentosForm = ({data}: {data: unknown}) => {
    const [fornecedores, setFornecedores] = useState(data) as any;
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as any;
        const selectedFornecedores = formData.getAll('id_fornecedor');
        data.id_fornecedor = selectedFornecedores;

        try {
            const response = await fetch('/api/equipamento', {
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
                {error.error && <ErrorMessage text={error.message}></ErrorMessage>}
                <Input type="text" label="Equipamento" idInput="equipamento"></Input>
                <Input type="text" label="Tipo de Equipamento" idInput="tipo"></Input>
                <Input type="text" label="Número de Série" idInput="numero_serie"></Input>
                <Input type="text" label="Marca/Modelo" idInput="marca_modelo"></Input>
                <Input type="text" label="Quantidade" idInput="quantidade"></Input>
                {fornecedores && <InputSelectCheckbox id={'id_fornecedor'} values={fornecedores.data} title="Fornecedores"></InputSelectCheckbox>}
                <Input type="text" label="Preço de Compra" idInput="preco_compra"></Input>
                <Input type="text" label="Localização" idInput="localizacao"></Input>
                <TextArea labelText="Observações adicionais" id="observacoes" length></TextArea>
                {submiting ? <Loader></Loader> : null}
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
            </DefaultForm>
        </>
    );
};

export default EquipamentosForm;


