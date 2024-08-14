export function isValidateDate(dateString: string): boolean {
    if (!dateString) {
        return false;
    }

    // Divide a string em partes (ano, mês, dia) e converte para números
    const [year, month, day] = dateString.split('-').map(Number);

    // Cria uma nova data com as partes fornecidas
    const date = new Date(year, month - 1, day);

    // Verifica se a data criada corresponde aos valores fornecidos
    const isValidDate = date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;

    if (!isValidDate) {
        return false;
    }

    // Obtém a data atual sem o tempo (somente ano, mês e dia)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verifica se a data fornecida é anterior à data atual
    return date >= today;
}