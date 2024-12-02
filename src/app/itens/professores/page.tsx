import { ProfessorReq } from "@/types/professor";

async function getDataProfessores() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professor`, {
        cache: "no-store", 
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const professores = (await getDataProfessores()) as ProfessorReq;

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
                Lista de Professores
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
                            CPF
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
                    </tr>
                </thead>
                <tbody>
                    {professores.data.map((professor, index) => (
                        <tr
                            key={professor.id}
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
                                {professor.id}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {professor.nome}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {professor.cpf}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {professor.email}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #dee2e6",
                                    fontSize: "14px",
                                    color: "#495057",
                                }}
                            >
                                {professor.telefone}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
