import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FornecedorForm1 from "@/components/Forms/Fornecedor/FornecedorForm1";
import Section from "@/components/Section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Fornecedor(){
    const session = await getServerSession(authOptions);
    if (session?.user?.role === 'prof') {
        redirect('/')
    }
    return(
        <Section title="Cadastre um fornecedor">
            <FornecedorForm1></FornecedorForm1>
        </Section>
    );
}
