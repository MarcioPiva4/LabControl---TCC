'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea/index";
import { useRef } from "react";

export default function Agente_Reagente() {
    const selectPesoMolecular = useRef<null | HTMLInputElement>(null);
    const selectConcentracao = useRef<null | HTMLInputElement>(null);
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <DefaultForm>
                <Input type="text" label="Nome do agente/reagente" idInput={'nome'}></Input>
                <Input type="text" label="Fórmula química" idInput={'formulaquimica'}></Input>
                <Input type="text" selectRef={selectPesoMolecular} label="Peso molecular" idInput={'pesomolecular'} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por moleculas (g/mol)",
                            abr: "g/mol",
                            active: false,
                            value: "g/mol"
                        },
                    ]} ></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)" idInput={'numerocas'}></Input>
                <Input type="text" label="Fornecedor" idInput={'fornecedor'}></Input>
                <Input type="text" label="Número de catálogo do fornecedor" idInput={'numerocatalogofornecedor'}></Input>
                <Input type="text" label="Data de compra"></Input>
                <Input type="text" selectRef={selectConcentracao} label="Concentração" idInput={'concentracao'} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por Litro (g/L)",
                            abr: "g/l",
                            active: false,
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
                            active: false,
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
                <Input type="text" label="Armazenamento recomendado" idInput={'armazenamentorecomendado'}></Input>
                <TextArea labelText="Descrição" id="descricao"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}