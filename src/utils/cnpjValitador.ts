export function isValidateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove non-numeric characters

    if (cnpj.length !== 14) {
        return false;
    }

    // Invalid known CNPJs
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += +numbers.charAt(size - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(0)) {
        return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += +numbers.charAt(size - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === +digits.charAt(1);
}
