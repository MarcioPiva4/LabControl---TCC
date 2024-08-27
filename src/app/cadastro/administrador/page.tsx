import { getServerSession } from 'next-auth/next';
import Section from '@/components/Section';
import AdministradorForm from '@/components/Forms/AdministradorForm';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Session } from '@/types/session';

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
