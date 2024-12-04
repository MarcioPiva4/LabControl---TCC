import { AulaReq, AulaItems } from "@/types/aula";

async function getDataAulas() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const aulas = (await getDataAulas()) as AulaReq;

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
                    color: "#ffff",
                    marginBottom: "20px",
                }}
            >
                Lista de Aulas
            </h1>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
                        <th style={tableHeaderStyle}>Tópico</th>
                        <th style={tableHeaderStyle}>Horário</th>
                        <th style={tableHeaderStyle}>Data</th>
                        <th style={tableHeaderStyle}>Status</th>
                        <th style={tableHeaderStyle}>Observações</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.data.map((aula: AulaItems, index) => (
                        <tr
                            key={aula.id}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                            }}
                        >
                            <td style={tableCellStyle}>{aula.id}</td>
                            <td style={tableCellStyle}>{aula.topico_aula}</td>
                            <td style={tableCellStyle}>
                                {aula.horario_inicio} - {aula.horario_finalizacao}
                            </td>
                            <td style={tableCellStyle}>{aula.data}</td>
                            <td style={tableCellStyle}>{aula.status}</td>
                            <td style={tableCellStyle}>{aula.observacoes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
