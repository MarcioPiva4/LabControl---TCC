export function isValidateDate(dateString: string): boolean {
    // Divide a string em partes (ano, mês, dia) e converte para números
    const [year, month, day] = dateString.split('-').map(Number);

    // Cria uma nova data com as partes fornecidas no formato UTC
    const date = new Date(Date.UTC(year, month - 1, day));

    // Verifica se a data criada corresponde aos valores fornecidos
    const isValidDate = date.getUTCFullYear() === year && (date.getUTCMonth() + 1) === month && date.getUTCDate() === day;
    if (!isValidDate) {
        return false;
    }

    // Obtém a data atual sem o tempo (somente ano, mês e dia), também em UTC
    const today = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

    // Verifica se a data fornecida é válida e se é anterior ou igual à data de hoje
    return date >= today;
}
