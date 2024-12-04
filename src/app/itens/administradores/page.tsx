import { administradorReq, administradorItems } from "@/types/administrador";

async function getDataAdministradores() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/administrador`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const administradores = (await getDataAdministradores()) as administradorReq;

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
                Lista de Administradores
            </h1>
            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        minWidth: "1000px", // Define um tamanho mínimo para a tabela
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
                            <th style={tableHeaderStyle}>Email</th>
                            <th style={tableHeaderStyle}>Telefone</th>
                            <th style={tableHeaderStyle}>Data de Contratação</th>
                            <th style={tableHeaderStyle}>CEP</th>
                            <th style={tableHeaderStyle}>Estado</th>
                            <th style={tableHeaderStyle}>Cidade</th>
                            <th style={tableHeaderStyle}>Rua</th>
                            <th style={tableHeaderStyle}>Número</th>
                            <th style={tableHeaderStyle}>Login Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.data.map((administrador: administradorItems, index) => (
                            <tr
                                key={administrador.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                                }}
                            >
                                <td style={tableCellStyle}>{administrador.id}</td>
                                <td style={tableCellStyle}>{administrador.nome}</td>
                                <td style={tableCellStyle}>{administrador.email}</td>
                                <td style={tableCellStyle}>{administrador.telefone}</td>
                                <td style={tableCellStyle}>
                                    {new Date(administrador.data_contratacao).toLocaleDateString()}
                                </td>
                                <td style={tableCellStyle}>{administrador.cep}</td>
                                <td style={tableCellStyle}>{administrador.estado}</td>
                                <td style={tableCellStyle}>{administrador.cidade}</td>
                                <td style={tableCellStyle}>{administrador.rua}</td>
                                <td style={tableCellStyle}>{administrador.numero}</td>
                                <td style={tableCellStyle}>{administrador.loginCount}</td>
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
