import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";

export default function Agente_Reagente() {
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <DefaultForm>
                <Input type="text" label="Nome do agente/reagente"></Input>
                <Input type="text" label="Fórmula química"></Input>
                <Input type="text" label="Peso molecular" selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por moleculas (g/mol)",
                            abr: "g/mol",
                            active: false,
                        },
                    ]} ></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)"></Input>
                <Input type="text" label="Fornecedor"></Input>
                <Input type="text" label="Número de catálogo do fornecedor"></Input>
                <Input type="text" label="Data de compra"></Input>
                <Input type="text" label="Concentração" selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por Litro (g/L)",
                            abr: "g/l",
                            active: false,
                        },
                        {
                            id: 2,
                            nome: "Gramas por mililitro (g/mL)",
                            abr: "g/mL",
                            active: false,
                        },
                    ]}></Input>
                <Input type="text" label="Quantidade" selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: false,
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                        },
                    ]}></Input>
                <Input type="text" label="Armazenamento recomendado"></Input>
                <TextArea labelText="Descrição"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}