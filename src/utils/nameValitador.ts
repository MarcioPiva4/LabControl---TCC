export function isValidName(name: string) {
    // Remove espaços extras no início e no fim e múltiplos espaços entre palavras
    const cleanedName = name.trim().replace(/\s+/g, ' ');
  
    // Verifica se o nome contém apenas letras e espaços e tem um comprimento razoável
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    return nameRegex.test(cleanedName);
  };