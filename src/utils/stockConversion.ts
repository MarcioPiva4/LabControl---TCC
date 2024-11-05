function convertToBaseUnit(quantidade: number, unidade: string): number {
    switch (unidade) {
      case "G":
        return quantidade;
      case "KG":
        return quantidade * 1000;
      case "T":
        return quantidade * 1_000_000;
      case "ML":
        return quantidade;
      case "L":
        return quantidade * 1000;
      case "UN":
        return quantidade;
      default:
        throw new Error("Unidade desconhecida");
    }
  }
  
  export function checkAndSubtractStock(
    estoque: number,
    quantidadeSolicitada: number,
    unidadeEstoque: string,
    unidadeSolicitada: string
  ): boolean {
    const estoqueConvertido = convertToBaseUnit(estoque, unidadeEstoque);
    const quantidadeSolicitadaConvertida = convertToBaseUnit(
      quantidadeSolicitada,
      unidadeSolicitada
    );
  
    if (estoqueConvertido >= quantidadeSolicitadaConvertida) {
      return true;
    } else {
      throw new Error("Estoque insuficiente para a medida solicitada, agente/reajente.");
    }
  }
  