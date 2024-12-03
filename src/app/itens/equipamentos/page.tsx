import { EquipamentoReq, EquipamentoItems } from "@/types/equipamento";

async function getDataEquipamentos() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const equipamentos = (await getDataEquipamentos()) as EquipamentoReq;

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
                Lista de Equipamentos
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
                            <th style={tableHeaderStyle}>Equipamento</th>
                            <th style={tableHeaderStyle}>Tipo</th>
                            <th style={tableHeaderStyle}>Número de Série</th>
                            <th style={tableHeaderStyle}>Marca/Modelo</th>
                            <th style={tableHeaderStyle}>Quantidade</th>
                            <th style={tableHeaderStyle}>Quantidade Float</th>
                            <th style={tableHeaderStyle}>Preço de Compra</th>
                            <th style={tableHeaderStyle}>Localização</th>
                            <th style={tableHeaderStyle}>Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipamentos.data.map((equipamento: EquipamentoItems, index) => (
                            <tr
                                key={equipamento.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                                }}
                            >
                                <td style={tableCellStyle}>{equipamento.id}</td>
                                <td style={tableCellStyle}>{equipamento.equipamento}</td>
                                <td style={tableCellStyle}>{equipamento.tipo}</td>
                                <td style={tableCellStyle}>{equipamento.numero_serie}</td>
                                <td style={tableCellStyle}>{equipamento.marca_modelo}</td>
                                <td style={tableCellStyle}>{equipamento.quantidade}</td>
                                <td style={tableCellStyle}>{equipamento.quantidade_float}</td>
                                <td style={tableCellStyle}>{equipamento.preco_compra}</td>
                                <td style={tableCellStyle}>{equipamento.localizacao}</td>
                                <td style={tableCellStyle}>{equipamento.observacoes}</td>
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
