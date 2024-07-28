export function isValidPhoneNumber(phoneNumber: string) {
    // Remove todos os caracteres não numéricos
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    // Verifica se o número tem 10 ou 11 dígitos
    if (cleaned.length === 10 || cleaned.length === 11) {
      // Regex para validar número de telefone no formato brasileiro
      const phoneRegex = /^(\d{2})(\d{4,5})(\d{4})$/;
      return phoneRegex.test(cleaned);
    }
  
    return false;
  };