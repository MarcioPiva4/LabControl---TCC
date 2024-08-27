import ProfessorForm from "@/components/Forms/ProfessorForm";
import Section from "@/components/Section";
import { Session } from "@/types/session";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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