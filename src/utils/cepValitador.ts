export function isValidateCEP(cep: string): boolean {
    // Remove any non-numeric characters
    cep = cep.replace(/[^\d]+/g, '');

    // Check if the length is exactly 8 digits
    if (cep.length !== 8) {
        return false;
    }

    // Check if all characters are digits
    const regex = /^[0-9]{8}$/;
    return regex.test(cep);
}