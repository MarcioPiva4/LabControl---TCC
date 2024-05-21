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
  const [dataScreenAfter, setDataScreenAfter] = useState<any>({});
  //valores anteriores para teste e enviar para o banco
  const [dataScreenBefore, setDataScreenBefore] = useState<any>({});
  const formik = useFormik({
        initialValues: {
            cep: dataScreenAfter.cep || "",
            estado: dataScreenAfter.estado || "",
            cidade: dataScreenAfter.cidade || "",
            bairro: dataScreenAfter.bairro || "",
            rua: dataScreenAfter.rua || "",
            numero: dataScreenAfter.numero || "",
          },
          enableReinitialize: true,
        onSubmit: (values) => {
          localStorage.setItem("screenafter", JSON.stringify(values))
          alert(JSON.stringify(values, null, 2));
        },
      });
    
      useEffect(() => {
        const data = localStorage.getItem("screenafter");
        if(data){
          setDataScreenAfter(JSON.parse(data))
        }
      }, []);

      useEffect(() => {
        setDataScreenBefore(localStorage.getItem("screenbefore"));
        if(!dataScreenBefore){
          router.push('/cadastro/fornecedor');
        }
      }, [dataScreenBefore, router])

      const [cep, setCep] = useState<string>('');
      const [localidade, setLocalidade] = useState<string>('');
      const [uf, setUf] = useState<string>('');
      const [bairro, setBairro] = useState<string>('');
      useEffect(() => {
        if (cep) {
          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setLocalidade(data.localidade)
              setUf(data.uf)
              setBairro(data.bairro)
              console.log(data);
            })
            .catch((error) => {
              console.error('Error fetching the data:', error);
            });
        }
      }, [cep]);
    return (
        <Section title="Informe a localização" bottom arrowBefore>
          <DefaultForm handleSubmit={formik.handleSubmit}>
            <Input type="text" label="CEP" idInput="cep" value={formik.values.cep || cep}   onChange={(e) => { formik.handleChange(e); setCep(e.target.value);  }}/>
            <Input type="text" label="Estado" idInput="estado" value={formik.values.estado || uf} onChange={(e) => { formik.handleChange; setUf(e.target.value) }}/>
            <Input type="text" label="Cidade" idInput="cidade" value={formik.values.cidade || localidade} onChange={(e) => {formik.handleChange; setLocalidade(e.target.value)}}/>
            <Input type="text" label="Bairro" idInput="bairro" value={formik.values.bairro || bairro} onChange={(e) => {formik.handleChange; setBairro(e.target.value)}}/>
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