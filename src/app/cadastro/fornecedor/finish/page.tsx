'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Professor(){
  const router = useRouter();
  const [dataScreenBefore, setDataScreenBefore] = useState(localStorage.getItem("screenbefore"));
    useEffect(() => {
      if(!dataScreenBefore){
        router.push('/cadastro/fornecedor');
      }
    }, [dataScreenBefore, router])
  const formik = useFormik({
        initialValues: {
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
          },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    return (
        <Section title="Informe a localização" bottom>
          <DefaultForm handleSubmit={formik.handleSubmit}>
            <Input type="text" label="CEP" idInput="cep" value={formik.values.cep} onChange={formik.handleChange}/>
            <Input type="text" label="Estado" idInput="estado" value={formik.values.estado} onChange={formik.handleChange}/>
            <Input type="text" label="Cidade" idInput="cidade" value={formik.values.cidade} onChange={formik.handleChange}/>
            <Input type="text" label="Bairro" idInput="bairro" value={formik.values.bairro} onChange={formik.handleChange}/>
            <Input type="text" label="Rua" idInput="rua" value={formik.values.rua} onChange={formik.handleChange}/>
            <Input type="text" label="N°" idInput="numero" value={formik.values.numero} onChange={formik.handleChange}/>
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
          </DefaultForm>
        </Section>
      );
}

// export async function getServerSideProps(context: any) {
//   const screenBefore = context.req.cookies.screenbefore;
//   console.log(screenBefore);

//   if (!screenBefore) {
//     return {
//       redirect: {
//         destination: '/outra-rota',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // Você também pode passar dados para o componente aqui
//   };
// }