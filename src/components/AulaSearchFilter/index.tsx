import { SearchWrapper } from "@/styles/style";

interface AulaSearchFilter {
    search: string;
    searchResult: Array<object>;
    type: 'vidraria' | 'equipamento' | 'agente/reajente'
    word: 'a' | 'o'
}

export default function AulaSearchFilter({search, searchResult, type, word}: AulaSearchFilter) {
  return (
    <SearchWrapper>
      <h1>
        resultados para &quot;<b>{search}&quot;</b>
      </h1>
      {searchResult?.length > 0 ? (
        <p>
          {" "}
          {searchResult?.length === 1
            ? `1 ${type} encontrad${word}`
            : `${searchResult?.length} ${type}s encontrad${word}s`}
        </p>
      ) : (
        <p>
          Nenhuma {type} encontrad{word} para &quot;<b>{search}</b>&quot;. Tente
          novamente!
        </p>
      )}
    </SearchWrapper>
  );
}
