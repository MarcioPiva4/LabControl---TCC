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
  

  export function convertUnits(fromUnit: string, toUnit: string, amount: number): number { 
    // Definindo as taxas de conversão baseadas nas unidades
    const conversionRates: { [key: string]: number } = {
      "G": 1,           // gramas
      "KG": 1000,       // quilogramas (1 KG = 1000 G)
      "T": 1_000_000,   // toneladas (1 T = 1.000.000 G)
      "ML": 1,          // mililitros
      "L": 1000,        // litros (1 L = 1000 ML)
      "UN": 1           // unidades (não há conversão definida, já está no valor base)
    };
  
    // Se as unidades de origem e destino forem as mesmas, retorna o valor original
    if (fromUnit === toUnit) {
      return amount;
    }
  
    // Verifica se as unidades têm uma taxa de conversão definida
    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
      throw new Error(`Conversão não definida entre as unidades ${fromUnit} e ${toUnit}`);
    }
  
    // Calcula o fator de conversão entre as unidades
    const factor = conversionRates[toUnit] / conversionRates[fromUnit];
  
    // Retorna a quantidade convertida
    return amount * factor;
  }
  
  