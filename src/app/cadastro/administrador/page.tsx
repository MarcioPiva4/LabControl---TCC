import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Section from '@/components/Section';
import AdministradorForm from '@/components/Forms/AdministradorForm';
import { redirect } from 'next/navigation';

export default async function Administrador(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role === 'prof') {
        redirect('/')
    }

    return (
        <Section title="Cadastre um Administrador" bottom>
            <AdministradorForm />
        </Section>
    );
}
