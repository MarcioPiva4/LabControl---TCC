interface PropInput {
  label?: string;
  idInput: string;
  type: "text" | "number" | "search" | "select";
  options?: Array<{value: string}>;
}

//FALTANDO O ESTILO (STYLED COMPONENT)
export default function Input({ label, idInput, type, options }: PropInput) {
  return (
    <>
      {label && <label>{label}</label>}
      {type != "select" ? (
        <input id={idInput} name={idInput} type={type}></input>
      ) : (
        <select id={idInput} name={idInput}>
          {options?.map((e) => <option key={e.value}>{e.value}</option>)}
        </select>
      )}
    </>
  );
}
