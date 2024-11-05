"use server";

import dynamic from 'next/dynamic';
import Section from "@/components/Section";
import { LoaderForm } from "@/components/LoaderForm";

const VidrariasForm = dynamic(() => import('@/components/Forms/VidrariasForm'), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={8} textArea></LoaderForm>
    }
);

export default async function Vidrarias() {
    const data = await getData(); 
    return (
        <Section title="Cadastre uma Vidraria" bottom>
            <VidrariasForm data={data} />
        </Section>
    );
}

async function getData() {
    const response = await fetch('http://localhost:3000/api/fornecedor', {
        cache: 'no-cache'
    });
    return await response.json();
}
