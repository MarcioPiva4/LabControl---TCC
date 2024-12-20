'use client'
import React from "react";
import styled from "styled-components";

interface PropForm {
  children?: React.ReactNode;
  idForm?: string;
  method?: string;
  action?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
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
  onSubmit,
  onReset,
}: PropForm) {
  return (
    <Form
      method={method}
      action={action}
      name={idForm}
      id={idForm}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {children}
    </Form>
  );
}
