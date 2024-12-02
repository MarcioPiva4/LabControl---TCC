'use client'
import { useState } from "react";
import styled from "styled-components";
import { MateriaReq } from "@/types/materia";

interface TableRowProps {
    index: number; 
}

const Container = styled.div`
    font-family: 'Arial', sans-serif;
    padding: 20px;
    min-height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr<TableRowProps>`
    background-color: ${(props) => (props.index % 2 === 0 ? '#f8f9fa' : '#fff')};
`;

const TableHeader = styled.th`
    padding: 12px;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 2px solid #dee2e6;
    background-color: #343a40;
    color: #fff;
`;

const TableCell = styled.td`
    padding: 10px;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    color: #495057;
    text-align: left;
`;

const DeleteButton = ({ id, onDelete }: { id: number; onDelete: (id: number) => void }) => {
    return (
        <button
            onClick={() => onDelete(id)}
            style={{
                padding: "6px 12px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
            }}
        >
            Deletar
        </button>
    );
};

export default function ListMateria({ materiasData }: { materiasData: MateriaReq }) {
    const [materias, setMaterias] = useState(materiasData.data);

    const handleDelete = async (id: number) => {
        try {
            // Fazer a requisição DELETE para a API
            const response = await fetch(`/api/materias`, {
                method: "DELETE",
                body: JSON.stringify(id)
            });

            if (!response.ok) {
                throw new Error("Falha ao excluir a matéria");
            }
            console.log(response)

            // Atualizar o estado para remover a matéria deletada
            setMaterias(materias.filter((materia) => materia.id !== id));
        } catch (error) {
            console.error("Erro ao excluir a matéria:", error);
        }
    };

    return (
        <Container>
            <Title>Lista de Matérias</Title>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Emenda</TableHeader>
                        <TableHeader>Ação</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {materias.map((materia, index) => (
                        <TableRow key={materia.id} index={index}>
                            <TableCell>{materia.id}</TableCell>
                            <TableCell>{materia.nome}</TableCell>
                            <TableCell>{materia.emenda}</TableCell>
                            <TableCell>
                                <DeleteButton id={materia.id} onDelete={handleDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
