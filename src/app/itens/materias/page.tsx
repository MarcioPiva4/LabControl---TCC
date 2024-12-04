import { MateriaReq } from "@/types/materia";

async function getDataMaterias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materia`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default async function Page() {
    const materias = (await getDataMaterias()) as MateriaReq;

    return (
        <div
            style={{
                fontFamily: "'Arial', sans-serif",
                padding: "20px",
                minHeight: "100vh",
                paddingBottom: "50px"
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
                Lista de Matérias
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
                                Emenda
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.data.map((materia, index) => (
                            <tr
                                key={materia.id}
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
                                    {materia.id}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        borderBottom: "1px solid #dee2e6",
                                        fontSize: "14px",
                                        color: "#495057",
                                    }}
                                >
                                    {materia.nome}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        borderBottom: "1px solid #dee2e6",
                                        fontSize: "14px",
                                        color: "#495057",
                                    }}
                                >
                                    {materia.emenda}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}