import { getServerSession } from 'next-auth/next';
import Section from '@/components/Section';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Session } from '@/types/session';
import dynamic from 'next/dynamic';
import { LoaderForm } from "@/components/LoaderForm";

const AdministradorForm  = dynamic(() => import("@/components/Forms/AdministradorForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={9}></LoaderForm>
    }
);

export default async function Administrador() {
    const session = await getServerSession(authOptions) as Session;
    if (session?.user?.role === 'prof') {
        redirect('/')
    }

    return (
        <Section title="Cadastre um Administrador" bottom>
            <AdministradorForm />
        </Section>
    );
}
