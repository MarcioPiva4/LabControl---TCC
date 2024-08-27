import { useState } from "react";

interface Fornecedor {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
}

type Fornecedores = Fornecedor[];

interface PropsInputSelectCheckbox {
    id: string;
    values: Fornecedores;
}

export default function InputSelectCheckbox({id, values}: PropsInputSelectCheckbox){
    const [list, setList] = useState(values.map(e => ({
        ...e,
        isSelected: false
      })));

    function disableItem(id: number){
        const updatedList = list.map((e) => e.id == id ? { ...e, isSelected: true } : { ...e });
        setList(updatedList);
    }
    return(
        <div>
            { list.map((e) => e.isSelected ? <label key={e.id}>{e.nome}<input type="checkbox" id={e.id.toString()} checked></input></label> : null) }
            <ul>
                <p>{list.map((e) => e.isSelected ? e.nome : null)}</p>
                {values.map(e => <li key={e.id} id={e.id.toString()} onClick={() => disableItem(e.id)}>{e.nome}</li>)}
            </ul>
        </div>
    )
}