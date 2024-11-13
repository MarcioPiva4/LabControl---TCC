'use client'
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Log {
    id: number;
    nome: string;
    typeHttp: string;
    ip: string;
    message: string;
}

export default function Page() {
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('/api/log');

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.status === 'success') {
                setLogs(parsedData.data);
            }
        };

        eventSource.onerror = () => {
            console.error("Erro ao conectar com o servidor SSE");
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <Container>
            <Title>LOGS LABCONTROL</Title>
            <LogList>
                {logs.map((item: Log) => (
                    <LogItem key={item.id}>
                        <LogField><strong>Nome:</strong> {item.nome}</LogField>
                        <LogField><strong>IP:</strong> {item.ip}</LogField>
                        <LogField><strong>Tipo HTTP:</strong> {item.typeHttp}</LogField>
                        <LogField><strong>Mensagem:</strong> {item.message}</LogField>
                    </LogItem>
                ))}
            </LogList>
        </Container>
    );
};

const Container = styled.div`
    background-color: #1e1e1e;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #00ff00;
    border-bottom: 2px solid #00ff00;
    padding-bottom: 10px;
`;

const LogList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    height: calc(100% - 60px);
    overflow-y: scroll;
    padding-right: 8px;
`;

const LogItem = styled.li`
    background-color: #333;
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
`;

const LogField = styled.div`
    margin-bottom: 10px;
    font-size: 1rem;
    word-wrap: break-word;
    color: #c0c0c0;

    strong {
        color: #00ff00;
    }
`;
