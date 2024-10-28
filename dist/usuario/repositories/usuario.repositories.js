"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const typeorm_1 = require("typeorm");
const connect_1 = require("../../database/connection/connect");
const usuariosEntity_1 = require("../../database/entity/usuariosEntity");
/**
 *Classe responsável por Integrar com a entidade UsuarioEntity
*/
class UsuarioRepository {
    constructor() {
        this.repository = connect_1.databaseConnection.getRepository(usuariosEntity_1.UsuarioEntity);
    }
    /**
     *Método para Adicionar Usuario.
      *
      * @param {UsuarioEntity} usuario - Recebe
      * @returns {Promise<UsuarioEntity>} - retorna usuario criada
      * @throws {Error} - Lança um erro em caso de falha
    */
    async create(usuario) {
        try {
            const execSQL = await this.repository.save(usuario);
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
     *Método para Editar Usuario.
    *
    * @param {Object} query - Recebe
    * @param {UsuarioEntity} pessoa - Recebe
    * @returns {Promise<UsuarioEntity>} - retorna a usuario editado
    * @throws {Error} - Lança um erro em caso de falha
    */
    async edit(query, usuario) {
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
                const mergeEdit = await this.repository.merge(queryReturn[0], usuario);
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
    * Método para Deletar Usuarios.
    *
    * @param { Partial<PessoaEntity>} [query] - Recebe um critério de busca
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
exports.UsuarioRepository = UsuarioRepository;
