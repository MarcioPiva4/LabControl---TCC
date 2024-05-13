'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Professor(){
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            nome: "",
            cnpj: "",
            telefone: "",
            email: "",
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            localStorage.setItem("screenbefore", JSON.stringify(values))
            router.push('/cadastro/fornecedor/finish')
        }
    });
    return(
        <Section title="Cadastre um fornecedor" children>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome" idInput="nome" value={formik.values.nome} onChange={formik.handleChange}></Input>
                <Input type="text" label="CNPJ" idInput="cnpj" value={formik.values.cnpj} onChange={formik.handleChange}></Input>
                <Input type="text" label="Telefone" selectAside  idInput="telefone" value={formik.values.telefone} onChange={formik.handleChange}></Input>
                <Input type="text" label="E-mail" idInput="email" value={formik.values.email} onChange={formik.handleChange}></Input>
                <Button type="submit" is="isNotTransparent" children>Proximo</Button>
            </DefaultForm>
        </Section>
    )
}