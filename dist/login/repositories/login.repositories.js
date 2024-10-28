"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRepository = void 0;
const typeorm_1 = require("typeorm");
const connect_1 = require("../../database/connection/connect");
const usuariosEntity_1 = require("../../database/entity/usuariosEntity");
/**
 *Classe responsável por Integrar com a entidade UsuarioEntity
*/
class LoginRepository {
    constructor() {
        this.repository = connect_1.databaseConnection.getRepository(usuariosEntity_1.UsuarioEntity);
    }
    /**
   * Método consultar Login
   * @param {U} [el={}] - Pode receber um Objeto de consulta ou vazio (Partial<T>)
   * @returns {Promise<[]>} - retorna Objeto(s) da Consulta ou erro.
   */
    async email(el) {
        try {
            const query = await this.repository.findOne({
                where: { usuario_email: el.usuario_email }
            });
            if (!query) {
                throw new Error("Usuário não encontrado");
            }
            return query;
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
}
exports.LoginRepository = LoginRepository;
