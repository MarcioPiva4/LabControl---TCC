export function cpfValitador(cpf: string){
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
  
    let sum;
    let remainder;
    sum = 0;
  
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}