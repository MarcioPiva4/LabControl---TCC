import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FornecedorForm2 from "@/components/Forms/Fornecedor/FornecedorForm2";
import Section from "@/components/Section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function FornecedorFinish(){
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'prof') {
      redirect('/')
  }
  return(
    <Section title="Informe a localização" bottom arrowBefore href="/cadastro/fornecedor">
      <FornecedorForm2></FornecedorForm2>
    </Section>
  )
}