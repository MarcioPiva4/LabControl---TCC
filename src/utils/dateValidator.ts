export function isValidateDate(dateString: string): boolean {
    if (!dateString) {
        return false;
    }

    // Divide a string em partes
    const [year, month, day] = dateString.split('-').map(Number);

    // Cria uma nova data com as partes fornecidas
    const date = new Date(year, month - 1, day);

    // Verifica se a data criada corresponde aos valores fornecidos
    return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}
