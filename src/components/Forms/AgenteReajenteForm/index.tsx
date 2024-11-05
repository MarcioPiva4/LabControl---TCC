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
import { SelectVariant } from "@/components/FakeSelect";

const InputCheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    div {
        margin-bottom: 0px;
    }
`;

const AgenteReajenteForm = ({ data }: { data: unknown }) => {
    const [fornecedores, setFornecedores] = useState(data) as any;
    const [selectedUnits, setSelectedUnits] = useState({
        peso_molecular: "UN",
        concentracao: "g/l",
        quantidade: "g",
    });
    const selectPesoMolecular = useRef<null | HTMLInputElement>(null);
    const selectConcentracao = useRef<null | HTMLInputElement>(null);
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
    
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as any;

        data.medida_quantidade = selectQuantidade.current?.value;
        data.peso_molecular = data.peso_molecular + selectPesoMolecular.current?.value;
        data.concentracao = data.concentracao + selectConcentracao.current?.value;
        const selectedFornecedores = formData.getAll('id_fornecedor');
        data.id_fornecedor = selectedFornecedores;

        try {
            const response = await fetch('/api/agente-reajente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    const [abr, setAbr] = useState([
        { id: 1, nome: "Gramas (g)", abr: "G", active: false, value: "G" },
        { id: 2, nome: "Quilogramas (Kg)", abr: "Kg", active: false, value: "KG" },
        { id: 3, nome: "Toneladas (T)", abr: "T", active: false, value: "T" },
        { id: 4, nome: "Mililitros (ml)", abr: "Ml", active: false, value: "ML" },
        { id: 5, nome: "Litros (L)", abr: "L", active: false, value: "L" },
        { id: 6, nome: "Unidade (Un)", abr: "Un", active: true, value: "UN" },
    ]);

    const [onResetTriggered, setOnResetTriggered] = useState(false);
    const handleReset = () => {
        setOnResetTriggered(true);
        setTimeout(() => setOnResetTriggered(false), 1000);
    }
    return (
        <>
            <DefaultForm onSubmit={handleSubmit} onReset={handleReset}>
                {error.error && <ErrorMessage text={error.message} error={error}></ErrorMessage>}
                <Input type="text" label="Nome do agente/reagente" idInput={'nome'}></Input>
                <Input type="text" label="Fórmula química" idInput={'formula'}></Input>
                <Input type="text" label="Material" idInput={'material'}></Input>

                <Input
                    type="text"
                    selectRef={selectPesoMolecular}
                    label="Peso molecular"
                    idInput={'peso_molecular'}
                >
                    <SelectVariant
                        selectRef={selectPesoMolecular}
                        options={abr}
                        onChange={(selectedValue) =>
                            setSelectedUnits((prev) => ({ ...prev, peso_molecular: selectedValue }))
                        }
                    />
                </Input>

                <Input type="text" label="Número CAS (Chemical Abstracts Service)" idInput={'cas'}></Input>
                {fornecedores && <InputSelectCheckbox reset={onResetTriggered} id={'id_fornecedor'} values={fornecedores.data} title="Fornecedores"></InputSelectCheckbox>}
                
                <Input type="text" label="Data de compra" idInput={'data_compra'}></Input>
                <Input type="text" label="Data de validade" idInput={'data_validade'}></Input>

                <Input
                    type="text"
                    selectRef={selectConcentracao}
                    label="Concentração"
                    idInput={'concentracao'}
                >
                    <SelectVariant
                        selectRef={selectConcentracao}
                        options={abr}
                        onChange={(selectedValue) =>
                            setSelectedUnits((prev) => ({ ...prev, concentracao: selectedValue }))
                        }
                    />
                </Input>

                <Input
                    type="text"
                    label="Quantidade"
                    idInput={'quantidade'}
                >
                    <SelectVariant
                        selectRef={selectQuantidade}
                        options={abr}
                        onChange={(selectedValue) =>
                            setSelectedUnits((prev) => ({ ...prev, quantidade: selectedValue }))
                        }
                    />
                </Input>

                <Input type="text" label="Armazenamento recomendado" idInput={'armazenamento_recomendado'}></Input>
                <TextArea labelText="Descrição" id="observacoes" length reset={onResetTriggered}></TextArea>

                {submiting ? <Loader></Loader> : null}
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
            </DefaultForm>
        </>
    );
};

export default AgenteReajenteForm;
