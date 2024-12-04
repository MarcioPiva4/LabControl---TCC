import { VidrariaReq, VidrariaItems } from "@/types/vidraria";

async function getDataVidrarias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const vidrarias = (await getDataVidrarias()) as VidrariaReq;

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
                Lista de Vidrarias
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
                            <th style={tableHeaderStyle}>Vidraria</th>
                            <th style={tableHeaderStyle}>Tipo</th>
                            <th style={tableHeaderStyle}>Capacidade</th>
                            <th style={tableHeaderStyle}>Material</th>
                            <th style={tableHeaderStyle}>Quantidade</th>
                            <th style={tableHeaderStyle}>Quantidade Float</th>
                            <th style={tableHeaderStyle}>Preço de Compra</th>
                            <th style={tableHeaderStyle}>Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vidrarias.data.map((vidraria: VidrariaItems, index) => (
                            <tr
                                key={vidraria.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                                }}
                            >
                                <td style={tableCellStyle}>{vidraria.id}</td>
                                <td style={tableCellStyle}>{vidraria.vidraria}</td>
                                <td style={tableCellStyle}>{vidraria.tipo}</td>
                                <td style={tableCellStyle}>{vidraria.capacidade}</td>
                                <td style={tableCellStyle}>{vidraria.material}</td>
                                <td style={tableCellStyle}>{vidraria.quantidade}</td>
                                <td style={tableCellStyle}>{vidraria.quantidade_float}</td>
                                <td style={tableCellStyle}>{vidraria.preco_compra}</td>
                                <td style={tableCellStyle}>{vidraria.observacoes}</td>
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
