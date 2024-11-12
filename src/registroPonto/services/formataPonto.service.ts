import { format } from 'date-fns';

export class PontoformatService {
    /**
     * Método para formatar os dados
     *
     * @param data - Array de registros de ponto
     * @returns Registro formatado dos pontos ou erro
     */
    async format(data: any[]) {
        try {
            const formattedData = data.map(record => {
                const { jornada, turno, data_registro, entrada, inicio_intervalo, fim_intervalo, saida } = record;

                // Formatação de data e horários
                const formattedDate = data_registro ? format(new Date(data_registro), 'dd-MM-yyyy') : null;
                const formattedEntrada = entrada ? format(new Date(entrada), 'HH:mm:ss') : null;
                const formattedInicioIntervalo = inicio_intervalo ? format(new Date(inicio_intervalo), 'HH:mm:ss') : null;
                const formattedFimIntervalo = fim_intervalo ? format(new Date(fim_intervalo), 'HH:mm:ss') : null;
                const formattedSaida = saida ? format(new Date(saida), 'HH:mm:ss') : null;
                const formattedJornada = jornada? jornada.split('.')[0] : null; // Remover milissegundos
               

                // Cálculo do banco de horas
                let bancoHoras = null;
                if (entrada && saida) {
                    const entradaTime = new Date(entrada).getTime();
                    const saidaTime = new Date(saida).getTime();
                    
                    // Intervalo fixo de 1 hora
                    const intervaloFixo = 1 * 60 * 60 * 1000; // 1 hora em milissegundos
                    
                    // Calcular a jornada de trabalho descontando o intervalo fixo
                    const jornadaTotal = saidaTime - entradaTime - intervaloFixo; // Total de horas trabalhadas

                    // Divida a string para pegar hora, minuto e segundo
                    const [hora, minuto, segundo] = formattedJornada.split(':').map(Number);                   
                    
                    // Jornada padrão de 8 horas (em milissegundos)
                    const jornadaPadrao = hora * 60 * 60 * 1000; // 8 horas em milissegundos       


                    // Banco de horas é a diferença entre a jornada total e a jornada padrão
                    bancoHoras = (jornadaTotal - jornadaPadrao) / (1000 * 60 * 60); // Convertendo de milissegundos para horas
                }

                // Retorno do objeto formatado
                return {
                    data_registro: formattedDate,
                    jornada: formattedJornada,
                    entrada: formattedEntrada,
                    inicio_intervalo: formattedInicioIntervalo,
                    fim_intervalo: formattedFimIntervalo,
                    saida: formattedSaida,
                    banco_horas: bancoHoras !== null ? bancoHoras.toFixed(2) : null, // Limitar a duas casas decimais
                    turno: turno
                };
            });

            return formattedData;
        } catch (error) {
            throw {
                success: false,
                name: 'Erro ao formatar dados',
                message: error
            };
        }
    }
}
