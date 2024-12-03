import { AgenteReajenteReq, AgenteReajenteItems } from "@/types/agente_reajente";

async function getDataAgentesReajentes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const agentesReajentes = (await getDataAgentesReajentes()) as AgenteReajenteReq;

    return (
        <div
            style={{
                fontFamily: "'Arial', sans-serif",
                padding: "20px",
                minHeight: "100vh",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "24px",
                    color: "#fff",
                    marginBottom: "20px",
                }}
            >
                Lista de Agentes Reagentes
            </h1>
            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        minWidth: "1200px", // Define um tamanho mínimo para a tabela
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#343a40",
                                color: "#fff",
                            }}
                        >
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Nome</th>
                            <th style={tableHeaderStyle}>Fórmula</th>
                            <th style={tableHeaderStyle}>Peso Molecular</th>
                            <th style={tableHeaderStyle}>Material</th>
                            <th style={tableHeaderStyle}>CAS</th>
                            <th style={tableHeaderStyle}>Data de Compra</th>
                            <th style={tableHeaderStyle}>Data de Validade</th>
                            <th style={tableHeaderStyle}>Concentração</th>
                            <th style={tableHeaderStyle}>Quantidade</th>
                            <th style={tableHeaderStyle}>Quantidade Float</th>
                            <th style={tableHeaderStyle}>Medida Quantidade</th>
                            <th style={tableHeaderStyle}>Armazenamento Recomendado</th>
                            <th style={tableHeaderStyle}>Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agentesReajentes.data.map((agente: AgenteReajenteItems, index) => (
                            <tr
                                key={agente.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                                }}
                            >
                                <td style={tableCellStyle}>{agente.id}</td>
                                <td style={tableCellStyle}>{agente.nome}</td>
                                <td style={tableCellStyle}>{agente.formula}</td>
                                <td style={tableCellStyle}>{agente.peso_molecular}</td>
                                <td style={tableCellStyle}>{agente.material}</td>
                                <td style={tableCellStyle}>{agente.cas}</td>
                                <td style={tableCellStyle}>{new Date(agente.data_compra).toLocaleDateString()}</td>
                                <td style={tableCellStyle}>{new Date(agente.data_validade).toLocaleDateString()}</td>
                                <td style={tableCellStyle}>{agente.concentracao}</td>
                                <td style={tableCellStyle}>{agente.quantidade}</td>
                                <td style={tableCellStyle}>{agente.quantidade_float}</td>
                                <td style={tableCellStyle}>{agente.medida_quantidade}</td>
                                <td style={tableCellStyle}>{agente.armazenamento_recomendado}</td>
                                <td style={tableCellStyle}>{agente.observacoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    padding: "12px",
    textAlign: "left" as const,
    fontWeight: "bold",
    fontSize: "14px",
    borderBottom: "2px solid #dee2e6",
};

const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
    fontSize: "14px",
    color: "#495057",
};
