import ListMateria from "@/components/ListTables/materias";
import { MateriaReq } from "@/types/materia";

export default async function Page() {
    const materias = (await getDataMaterias()) as MateriaReq;
    return (
        <ListMateria materiasData={materias}></ListMateria>
    );
}

async function getDataMaterias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materia`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}