import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Session } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Professor",
    description: "Cadastro de professores",
};

const ProfessorForm = dynamic(() => import("@/components/Forms/ProfessorForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={4}></LoaderForm>
    }
);

export default async function Professor(){
    const session = await getServerSession(authOptions) as Session;
    if (session?.user?.role === 'prof') {
        redirect('/')
    }

    return(
        <Section title="Cadastre um professor (a)">
            <ProfessorForm></ProfessorForm>
        </Section>
    )
}