import { LaboratorioReq, LaboratorioItems } from "@/types/laboratorio";

async function getDataLaboratorios() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const laboratorios = (await getDataLaboratorios()) as LaboratorioReq;

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
                Lista de Laboratórios
            </h1>
            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        minWidth: "800px", // Define um tamanho mínimo para a tabela
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
                            <th style={tableHeaderStyle}>Prédio</th>
                            <th style={tableHeaderStyle}>Andar</th>
                            <th style={tableHeaderStyle}>Bloco</th>
                            <th style={tableHeaderStyle}>Sala</th>
                            <th style={tableHeaderStyle}>Responsável</th>
                            <th style={tableHeaderStyle}>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laboratorios.data.map((laboratorio: LaboratorioItems, index) => (
                            <tr
                                key={laboratorio.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                                }}
                            >
                                <td style={tableCellStyle}>{laboratorio.id}</td>
                                <td style={tableCellStyle}>{laboratorio.nome}</td>
                                <td style={tableCellStyle}>{laboratorio.predio}</td>
                                <td style={tableCellStyle}>{laboratorio.andar}</td>
                                <td style={tableCellStyle}>{laboratorio.bloco}</td>
                                <td style={tableCellStyle}>{laboratorio.sala}</td>
                                <td style={tableCellStyle}>{laboratorio.responsavel}</td>
                                <td style={tableCellStyle}>{laboratorio.descricao}</td>
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
