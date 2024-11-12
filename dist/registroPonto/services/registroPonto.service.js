"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PontoService = void 0;
const ponto_repositories_1 = require("../../ponto/repositories/ponto.repositories");
const connect_1 = require("../../database/connection/connect");
const typeorm_1 = require("typeorm");
const RegistroPontoEntity_1 = require("../../database/entity/RegistroPontoEntity");
class PontoService {
    constructor() {
        this.pontoRepository = new ponto_repositories_1.PontoRepository();
    }
    /**
     * Método para Bater o Ponto
     * Verifica se o usuário já bateu o ponto para esse tipo hoje
     *
     * @param usuario_id - ID do usuário que está batendo o ponto
     * @param PontoTipo - Tipo do Ponto
     * @returns Registro do ponto ou erro
     */
    async registraPonto(usuario_id, PontoTipo) {
        try {
            const repository = connect_1.databaseConnection.getRepository(RegistroPontoEntity_1.RegistroPontoEntity);
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Define o início do dia (00:00:00)
            const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Define o fim do dia (23:59:59)
            const registrosHoje = await repository.find({
                where: {
                    usuario: { usuario_id }, // Passando o usuario_id no relacionamento
                    registroPonto_tipo: PontoTipo,
                    created_At: (0, typeorm_1.Between)(startOfDay, endOfDay), // Filtro pela data de hoje
                }
            });
            // Verificando se registrosHoje é um array e se contém algum registro
            if (Array.isArray(registrosHoje) && registrosHoje.length === 0) {
                const registraPonto = await repository.insert({
                    registroPonto_tipo: PontoTipo,
                    usuario: { usuario_id },
                });
                return {
                    success: true,
                    name: 'Ponto Registrado com Sucesso!',
                    message: registraPonto
                };
            }
            else if (Array.isArray(registrosHoje) && registrosHoje.length > 0) {
                return {
                    success: false,
                    name: 'Ponto Já cadastrado',
                    message: registrosHoje
                };
            }
            else {
                throw {
                    success: false,
                    name: 'Erro ao processar registros',
                    message: registrosHoje,
                };
            }
        }
        catch (error) {
            throw {
                success: false,
                name: 'Erro ao verificar Ponto',
                message: error
            };
        }
    }
    /**
 * Método para Bater o Ponto
 * Verifica se o usuário já bateu o ponto para esse tipo hoje
 *
 * @param usuario_id - ID do usuário que está batendo o ponto
 * @param PontoTipo - Tipo do Ponto
 * @returns Registro do ponto ou erro
 */
    async consultaraPonto(usuario_id) {
        try {
            const repository = connect_1.databaseConnection.getRepository(RegistroPontoEntity_1.RegistroPontoEntity);
            const searchPonto = await repository.query(`
                SELECT 
                    RegistroPonto.usuario_id,
                    usuarios.usuario_jornada AS jornada,
                    usuarios.usuario_turno AS turno,
                    DATE(RegistroPonto.created_At) AS data_registro,
                    MAX(CASE WHEN RegistroPonto.registroPonto_tipo = 'Entrada' THEN RegistroPonto.created_At END) AS entrada,
                    MAX(CASE WHEN RegistroPonto.registroPonto_tipo = 'Inicio_intervalo' THEN RegistroPonto.created_At END) AS inicio_intervalo,
                    MAX(CASE WHEN RegistroPonto.registroPonto_tipo = 'Fim_intervalo' THEN RegistroPonto.created_At END) AS fim_intervalo,
                    MAX(CASE WHEN RegistroPonto.registroPonto_tipo = 'Saida' THEN RegistroPonto.created_At END) AS saida
                FROM 
                    RegistroPonto
                INNER JOIN usuarios ON RegistroPonto.usuario_id = usuarios.usuario_id
                WHERE 
                    RegistroPonto.usuario_id = ?
                GROUP BY 
                    RegistroPonto.usuario_id, DATE(RegistroPonto.created_At)
                ORDER BY 
                    DATE(RegistroPonto.created_At);
            `, [usuario_id]);
            if (!searchPonto) {
                return {
                    success: false,
                    message: searchPonto
                };
            }
            else {
                return {
                    success: true,
                    message: searchPonto
                };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error
            };
        }
    }
}
exports.PontoService = PontoService;
