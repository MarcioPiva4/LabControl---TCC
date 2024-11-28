export function isValidateCEP(cep: string): boolean {
    cep = cep.replace(/[^\d]+/g, '');

    if (cep.length !== 8) {
        return false;
    }

    const regex = /^[0-9]{8}$/;
    return regex.test(cep);
}