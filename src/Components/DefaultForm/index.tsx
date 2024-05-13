'use client'
// Importe o React
import React from "react";
// Importe o Formik corretamente
import { useFormik } from "formik";
import styled from "styled-components";
import Layout from "../Section";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

// Defina a interface PropForm
interface PropForm {
  children?: React.ReactNode;
  idForm?: string;
  method?: string;
  action?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
  handleSubmit,
}: PropForm) {
  return (
    <Form
      method={method}
      action={action}
      name={idForm}
      id={idForm}
      onSubmit={handleSubmit}
    >
      {/* Renderize os filhos dentro do formulário */}
      {children}
    </Form>
  );
}