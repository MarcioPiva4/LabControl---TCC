import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Session } from "@/types/session";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const FornecedorForm2 = dynamic(() => import("@/components/Forms/Fornecedor/FornecedorForm2"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={6}></LoaderForm>
    }
);

export default async function FornecedorFinish(){
  const session = await getServerSession(authOptions) as Session;
  if (session?.user?.role === 'prof') {
      redirect('/')
  }
  return(
    <Section title="Informe a localização" bottom arrowBefore href="/cadastro/fornecedor">
      <FornecedorForm2></FornecedorForm2>
    </Section>
  )
}