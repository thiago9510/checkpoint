"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PontoRepository = void 0;
const typeorm_1 = require("typeorm");
const connect_1 = require("../../database/connection/connect");
const RegistroPontoUsuarioEntity_1 = require("../../database/entity/RegistroPontoUsuarioEntity");
/**
 *Classe responsável por Integrar com a entidade RegistroPontoUsuarios
*/
class PontoRepository {
    constructor() {
        this.repository = connect_1.databaseConnection.getRepository(RegistroPontoUsuarioEntity_1.RegistroPontoUsuariosEntity);
    }
    /**
     *Método para Adicionar Ponto.
      *
      * @param {RegistroPontoUsuariosEntity} ponto - Recebe
      * @returns {Promise<RegistroPontoUsuariosEntity>} - retorna ponto criado
      * @throws {Error} - Lança um erro em caso de falha
    */
    async create(ponto) {
        try {
            // Criando o objeto RegistroPontoUsuariosEntity, associando `usuario` usando uma instância parcial
            const pontoComUsuario = this.repository.create({
                ...ponto,
                usuario: { usuario_id: ponto.usuario_id }, // Passando a instância parcial
            });
            // Salvando no repositório
            const execSQL = await this.repository.save(pontoComUsuario);
            return execSQL;
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                throw {
                    name: error.name,
                    code: error.code,
                    message: error.message
                };
            }
            else {
                throw {
                    name: 'Erro ao salvar Registro!',
                    message: error
                };
            }
        }
    }
    /**
   * Método para Consultar Registros de uma Entidade
   * @param {U} [el={}] - Pode receber um Objeto de consulta ou vazio (Partial<T>)
   * @returns {Promise<[]>} - retorna Objeto(s) da Consulta ou erro.
   */
    async search(el) {
        try {
            const isEmpty = (obj) => Object.keys(obj).length === 0;
            const [[key, value]] = Object.entries(el);
            const response = isEmpty(el) ? this.repository.find() : this.repository.find({
                where: {
                    [key]: (0, typeorm_1.Like)(`%${value}%`)
                }
            });
            return await response;
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                throw {
                    name: error.name,
                    message: error.message
                };
            }
            else {
                throw {
                    name: 'Erro ao consultar Registro!',
                    message: error
                };
            }
        }
    }
    /**
     *Método para Editar Ponto
    *
    * @param {Object} query - Recebe
    * @param {RegistroPontoUsuariosEntity} pessoa - Recebe
    * @returns {Promise<RegistroPontoUsuariosEntity>} - retorna um ponto editado
    * @throws {Error} - Lança um erro em caso de falha
    */
    async edit(query, ponto) {
        try {
            const queryReturn = await this.repository.find({
                where: query
            });
            if (queryReturn.length != 1) {
                throw {
                    name: 'Invalid Parameter',
                    message: 'Invalid ID or not found'
                };
            }
            else {
                const mergeEdit = await this.repository.merge(queryReturn[0], ponto);
                const saveEdit = await this.repository.save(mergeEdit);
                return saveEdit;
            }
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                throw {
                    name: error.name,
                    code: error.code,
                    message: error.message
                };
            }
            else {
                throw {
                    name: 'Erro ao salvar Registro!',
                    message: error
                };
            }
        }
    }
    /**
    * Método para Deletar Ponto.
    *
    * @param { Partial<RegistroPontoUsuariosEntity>} [query] - Recebe um critério de busca
    * @returns {Promise<DeleteResult | Error>} - retorna um DeleteResult ou erro.
    */
    async delete(query) {
        try {
            const response = await this.repository.delete(query);
            return response;
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                throw {
                    name: error.name,
                    code: error.code,
                    message: error.message
                };
            }
            else {
                throw {
                    name: 'Erro ao consultar Registro!',
                    message: error
                };
            }
        }
    }
}
exports.PontoRepository = PontoRepository;
