'use client';
import Input from "@/components/Input";
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import MenuSubmit from "@/components/MenuSubmit";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import TextArea from "@/components/TextArea";
import Select from "@/components/Select";

const VidrariasForm = ({data}: {data: unknown}) => {
    const [fornecedores, setFornecedores] = useState(data) as any;
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
        data.capacidade = data.capacidade.toString() + selectQuantidade.current?.value;

        // Captura dos fornecedores selecionados
        const selectedFornecedores = formData.getAll('id_fornecedor');
        data.id_fornecedor = selectedFornecedores;

        try {
            const response = await fetch('/api/vidrarias', {
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
                <Input type="text" label="Vidraria" idInput="vidraria"></Input>
                <Input type="text" label="Tipo de Vidraria" idInput="tipo"></Input>
                <Input type="text" selectRef={selectQuantidade} label="Capacidade" idInput="capacidade" selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: false,
                            value: "g"
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                            value: "Kg"
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                            value: "T"
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                            value: "ml"
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                            value: "L"
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                            value: "Un"
                        },
                    ]}></Input>
                <Input type="text" label="Material" idInput="material"></Input>
                <Input type="text" label="Quantidade" idInput="quantidade" ></Input>
                {fornecedores.data?.map((e: any) => (
                    <div key={e.id}>
                        <Input
                        key={e.id}
                        type="checkbox"
                        idInput="id_fornecedor"
                        value={e.id}
                        label={e.nome}
                        />
                    </div>
                ))}
                <Input type="text" label="Preço de Compra" idInput="preco_compra" ></Input>
                <Input type="text" label="Localização" idInput="localizacao"></Input>
                <TextArea labelText="Observações adicionais" id="observacoes"></TextArea>
                {submiting ? <Loader></Loader> : null}
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
                {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
            </DefaultForm>
        </>
    );
};

export default VidrariasForm;


