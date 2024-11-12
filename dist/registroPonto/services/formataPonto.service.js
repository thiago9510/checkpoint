"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PontoformatService = void 0;
const date_fns_1 = require("date-fns");
class PontoformatService {
    /**
     * Método para formatar os dados
     *
     * @param data - Array de registros de ponto
     * @returns Registro formatado dos pontos ou erro
     */
    async format(data) {
        try {
            const formattedData = data.map(record => {
                const { jornada, turno, data_registro, entrada, inicio_intervalo, fim_intervalo, saida } = record;
                // Formatação de data e horários
                const formattedDate = data_registro ? (0, date_fns_1.format)(new Date(data_registro), 'dd-MM-yyyy') : null;
                const formattedEntrada = entrada ? (0, date_fns_1.format)(new Date(entrada), 'HH:mm:ss') : null;
                const formattedInicioIntervalo = inicio_intervalo ? (0, date_fns_1.format)(new Date(inicio_intervalo), 'HH:mm:ss') : null;
                const formattedFimIntervalo = fim_intervalo ? (0, date_fns_1.format)(new Date(fim_intervalo), 'HH:mm:ss') : null;
                const formattedSaida = saida ? (0, date_fns_1.format)(new Date(saida), 'HH:mm:ss') : null;
                const formattedJornada = jornada ? jornada.split('.')[0] : null; // Remover milissegundos
                // Cálculo do banco de horas
                let bancoHoras = null;
                if (entrada && saida) {
                    const entradaTime = new Date(entrada).getTime();
                    const saidaTime = new Date(saida).getTime();
                    // Intervalo fixo de 1 hora
                    const intervaloFixo = 1 * 60 * 60 * 1000; // 1 hora em milissegundos
                    // Calcular a jornada de trabalho descontando o intervalo fixo
                    const jornadaTotal = saidaTime - entradaTime - intervaloFixo; // Total de horas trabalhadas
                    // Divida a string para pegar hora, minuto e segundo da jornada
                    const [hora, minuto, segundo] = formattedJornada.split(':').map(Number);
                    // Jornada padrão em milissegundos
                    const jornadaPadrao = (hora * 60 * 60 + minuto * 60 + segundo) * 1000;
                    // Calcular o banco de horas como a diferença em minutos
                    bancoHoras = (jornadaTotal - jornadaPadrao) / (1000 * 60); // Convertendo de milissegundos para minutos
                }
                // Retorno do objeto formatado
                return {
                    data_registro: formattedDate,
                    jornada: formattedJornada,
                    entrada: formattedEntrada,
                    inicio_intervalo: formattedInicioIntervalo,
                    fim_intervalo: formattedFimIntervalo,
                    saida: formattedSaida,
                    banco_horas: bancoHoras !== null ? (bancoHoras / 60).toFixed(2) : null, // Convertendo para horas com duas casas decimais
                    turno: turno
                };
            });
            return formattedData;
        }
        catch (error) {
            throw {
                success: false,
                name: 'Erro ao formatar dados',
                message: error
            };
        }
    }
}
exports.PontoformatService = PontoformatService;
