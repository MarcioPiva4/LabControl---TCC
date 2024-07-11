'use client'
// Importe o React
import React from "react";
import styled from "styled-components";
import Layout from "../Section";
import Input from "@/components/Input";
import Button from "@/components/Button";

// Defina a interface PropForm
interface PropForm {
  children?: React.ReactNode;
  idForm?: string;
  method?: string;
  action?: string;
}

// Estilize o formulário
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Componente DefaultForm
export default function DefaultForm({
  children,
  idForm,
  method,
  action,
}: PropForm) {
  return (
    <Form
      method={method}
      action={action}
      name={idForm}
      id={idForm}
    >
      {/* Renderize os filhos dentro do formulário */}
      {children}
    </Form>
  );
}