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
     * @returns Registro do ponto ou erro
     */
    async VerificaPonto(usuario_id, PontoTipo) {
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
                    ponto: 'Nao',
                    manssage: registraPonto
                };
            }
            else if (Array.isArray(registrosHoje) && registrosHoje.length > 0) {
                return {
                    success: true,
                    ponto: 'Sim',
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
}
exports.PontoService = PontoService;
