import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfessorForm from "@/components/Forms/ProfessorForm";
import Section from "@/components/Section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default async function Professor(){
    const session = await getServerSession(authOptions);
    if (session?.user?.role === 'prof') {
        redirect('/')
    }

    return(
        <Section title="Cadastre um professor (a)">
            <ProfessorForm></ProfessorForm>
        </Section>
    )
}