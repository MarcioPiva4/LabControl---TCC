interface PropSelect {
    options?: Array<{
        value: string;
    }>;
    id: string;
}

export default function Select({options, id}: PropSelect){
    return(
        <select id={id} name={id}>
        {options?.map((e) => (
          <option key={e.value}>{e.value}</option>
        ))}
      </select>
    )
}