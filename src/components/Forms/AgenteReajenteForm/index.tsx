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

const AgenteReajenteForm = ({data}: {data: unknown}) => {
    const [fornecedores, setFornecedores] = useState(data) as any;
    const selectPesoMolecular = useRef<null | HTMLInputElement>(null);
    const selectConcentracao = useRef<null | HTMLInputElement>(null);
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as any;
        data.quantidade = data.quantidade?.toString() + selectQuantidade.current?.value;
        data.peso_molecular = data.peso_molecular?.toString() + selectPesoMolecular.current?.value;
        data.concentracao = data.concentracao?.toString() + selectConcentracao.current?.value;
        
        // Captura dos fornecedores selecionados
        const selectedFornecedores = formData.getAll('id_fornecedor');
        data.id_fornecedor = selectedFornecedores;

        try {
            const response = await fetch('/api/agente-reajente', {
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
                <Input type="text" label="Nome do agente/reagente" idInput={'nome'}></Input>
                <Input type="text" label="Fórmula química" idInput={'formula'}></Input>
                <Input type="text" label="Material" idInput={'material'}></Input>
                <Input type="text" selectRef={selectPesoMolecular} label="Peso molecular" idInput={'peso_molecular'} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por moleculas (g/mol)",
                            abr: "g/mol",
                            active: true,
                            value: "g/mol"
                        },
                    ]} ></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)" idInput={'cas'}></Input>
                {fornecedores && <InputSelectCheckbox id={'id_fornecedor'} values={fornecedores.data} title="Fornecedores"></InputSelectCheckbox>}
                <Input type="text" label="Data de compra" idInput={'data_compra'}></Input>
                <Input type="text" label="Data de validade" idInput={'data_validade'}></Input>
                <Input type="text" selectRef={selectConcentracao} label="Concentração" idInput={'concentracao'} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por Litro (g/L)",
                            abr: "g/l",
                            active: true,
                            value: "g/l"
                        },
                        {
                            id: 2,
                            nome: "Gramas por mililitro (g/mL)",
                            abr: "g/mL",
                            active: false,
                            value: "g/ml",
                        },
                    ]}></Input>
                <Input type="text" selectRef={selectQuantidade} label="Quantidade" idInput={'quantidade'} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: true,
                            value: "g",
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                            value: "Kg",
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                            value: "T",
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                            value: "ml",
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                            value: "L",
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                            value: "Un",
                        },
                    ]}></Input>
                <Input type="text" label="Armazenamento recomendado" idInput={'armazenamento_recomendado'}></Input>
                <TextArea labelText="Descrição" id="observacoes" length></TextArea>
                {submiting ? <Loader></Loader> : null}
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
            </DefaultForm>
        </>
    );
};

export default AgenteReajenteForm;


