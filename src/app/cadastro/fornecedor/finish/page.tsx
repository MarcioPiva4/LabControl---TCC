import FornecedorForm2 from "@/components/Forms/Fornecedor/FornecedorForm2";
import Section from "@/components/Section";

export default function FornecedorFinish(){
  return(
    <Section title="Informe a localização" bottom arrowBefore href="/cadastro/fornecedor">
      <FornecedorForm2></FornecedorForm2>
    </Section>
  )
}