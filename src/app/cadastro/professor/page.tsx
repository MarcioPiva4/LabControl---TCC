'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import ProfessorForm from "@/components/Forms/ProfessorForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import { FormEvent } from "react";

export default function Professor(){
    async function handlerSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
    }

    return(
        <Section title="Cadastre um professor (a)">
            <ProfessorForm></ProfessorForm>
        </Section>
    )
}