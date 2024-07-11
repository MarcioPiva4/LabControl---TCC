'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea/index";
import { useRef } from "react";

export default function Equipamentos(){
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
    return(
        <Section title="Cadastre uma Vidraria" bottom>
            <DefaultForm>
                <Input type="text" label="Vidraria" idInput="vidrarias"></Input>
                <Input type="text" label="Tipo de Vidraria" idInput="tipovidraria"></Input>
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
                <Input type="text" label="Quantos fornecedores?" idInput="qtsfornecedores"></Input>
                <Input type="text" label="Fornecedor" idInput="fornecedor" ></Input>
                <Input type="text" label="Preço de Compra" idInput="precocompra" ></Input>
                <Input type="text" label="Localização" idInput="localizacao"></Input>
                <TextArea labelText="Observações adicionais" id="observacoes"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}