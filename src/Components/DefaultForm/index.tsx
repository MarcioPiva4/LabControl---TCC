"use client";
import styled from "styled-components";
import Layout from "../Section";

interface PropForm {
  children?: React.ReactNode;
  idForm?: string;
  method?: string;
  action?: string;
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function DefaultForm({
  children,
  idForm,
  method,
  action,
}: PropForm) {
  return (
    <Form method={method} action={action} name={idForm} id={idForm}>
      {children}
    </Form>
  );
}
