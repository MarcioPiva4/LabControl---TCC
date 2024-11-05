
import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Session } from "@/types/session";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const FornecedorForm1 = dynamic(() => import("@/components/Forms/Fornecedor/FornecedorForm1"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={4}></LoaderForm>
    }
);


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
