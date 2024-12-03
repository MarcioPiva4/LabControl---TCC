export function validateHourly(horarioInicio: string, horarioFinalizacao: string) {
    function horarioParaMinutos(horario: string) {
        const [horas, minutos] = horario.split(':').map(Number);
        return horas * 60 + minutos;
    }

    const inicioMinutos = horarioParaMinutos(horarioInicio);
    const finalizacaoMinutos = horarioParaMinutos(horarioFinalizacao);

    if (inicioMinutos > finalizacaoMinutos) {
        return { value: false, message: "O horário de início não pode ser maior que o horário de finalização." };
    }

    if (finalizacaoMinutos - inicioMinutos < 50) {
        return { value: false, message: "A aula deve ter no mínimo 50 minutos." };
    }

    return { value: true, message: "Horários válidos." };
}

