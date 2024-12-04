import { FornecedorReq } from "@/types/fornecedor";

async function getDataFornecedores() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedor`, {
        cache: "no-store", 
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const fornecedores = (await getDataFornecedores()) as FornecedorReq;

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
                Lista de Fornecedores
            </h1>
            <div style={{ overflowX: "auto" }}>
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
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            ID
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            Nome
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            CNPJ
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            E-mail
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            Telefone
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            Cidade
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "14px",
                                borderBottom: "2px solid #dee2e6",
                            }}
                        >
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.data.map((fornecedor, index) => (
                        <tr
                            key={fornecedor.id}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                            }}
                        >
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.id}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.nome}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.cnpj}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.email}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.telefone}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.cidade}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {fornecedor.estado}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
