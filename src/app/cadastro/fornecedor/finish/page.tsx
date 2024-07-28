/*import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Professor(){
  const router = useRouter();
  const [dataScreenAfter, setDataScreenAfter] = useState<any>({});
  //valores anteriores para teste e enviar para o banco
  const [dataScreenBefore, setDataScreenBefore] = useState<any>({});
    
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
          <DefaultForm>
            <Input type="text" label="CEP" idInput="cep" value={cep}   onChange={(e) => { formik.handleChange(e); setCep(e.target.value);  }}/>
            <Input type="text" label="Estado" idInput="estado" value={uf} onChange={(e) => { formik.handleChange; setUf(e.target.value) }}/>
            <Input type="text" label="Cidade" idInput="cidade" value={localidade} onChange={(e) => {formik.handleChange; setLocalidade(e.target.value)}}/>
            <Input type="text" label="Bairro" idInput="bairro" value={bairro} onChange={(e) => {formik.handleChange; setBairro(e.target.value)}}/>
            <Input type="text" label="Rua" idInput="rua" value={formik.values.rua} onChange={formik.handleChange}/>
            <Input type="text" label="N°" idInput="numero" value={formik.values.numero} onChange={formik.handleChange}/>
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
          </DefaultForm>
        </Section>
      );
}
*/

import FornecedorForm2 from "@/components/Forms/Fornecedor/FornecedorForm2";
import Section from "@/components/Section";

export default function FornecedorFinish(){
  return(
    <Section title="Informe a localização" bottom arrowBefore href="/cadastro/fornecedor">
      <FornecedorForm2></FornecedorForm2>
    </Section>
  )
}