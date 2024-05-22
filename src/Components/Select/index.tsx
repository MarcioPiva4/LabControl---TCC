interface PropSelect {
    options?: Array<string>;
    id: string;
    selectLabel: string;
}

export default function Select({options, id, selectLabel}: PropSelect){
    return(
        <>
          <label>{selectLabel}</label>
          <select id={id} name={id}>
          {options?.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        </>
    )
}