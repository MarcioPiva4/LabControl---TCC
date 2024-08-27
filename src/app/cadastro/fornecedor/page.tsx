
import FornecedorForm1 from "@/components/Forms/Fornecedor/FornecedorForm1";
import Section from "@/components/Section";
import { Session } from "@/types/session";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Fornecedor(){
    const session = await getServerSession(authOptions) as Session;
    if (session?.user?.role === 'prof') {
        redirect('/')
    }
    return(
        <Section title="Cadastre um fornecedor">
            <FornecedorForm1></FornecedorForm1>
        </Section>
    );
}
