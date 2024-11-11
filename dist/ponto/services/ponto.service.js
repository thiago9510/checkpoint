"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PontoService = void 0;
const ponto_repositories_1 = require("../repositories/ponto.repositories");
class PontoService {
    constructor() {
        this.repoPonto = new ponto_repositories_1.PontoRepository();
    }
    /**
    * Adiciona um novo Ponto.
    * @param usuario - Dados do Ponto a ser adicionado
    * @returns Resultado da operação
    */
    async addPonto(usuario) {
        try {
            // Chamada do método create com `usuario_id` diretamente
            const createPonto = await this.repoPonto.create({
                ...usuario,
                usuario_id: usuario.usuario_id
            });
            if (!createPonto || createPonto instanceof Error) {
                return {
                    success: false,
                    message: 'Erro ao adicionar registro!',
                    error: createPonto
                };
            }
            return {
                success: true,
                message: 'Ponto cadastrado com sucesso!',
                data: createPonto
            };
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: error.code,
                    message: 'Os dados informados já estão em uso',
                };
            }
            return {
                success: false,
                message: 'Erro ao adicionar registro!',
                error: error
            };
        }
    }
    /**
    * Busca um Ponto.
    * @param queryParameter - Parametro da consulta
    * @returns retorno da consulta
   */
    async searchPonto(queryParameter) {
        const arrParameters = Object.keys(queryParameter);
        const parameter = arrParameters[0];
        const valorParameter = queryParameter[parameter];
        const searchPonto = await this.repoPonto.search({ [parameter]: valorParameter });
        if (searchPonto instanceof Error) {
            return {
                success: false,
                message: 'Erro ao Consultar Registro',
                error: searchPonto
            };
        }
        else {
            return {
                success: true,
                message: 'Consulta realizada com sucesso!',
                data: searchPonto
            };
        }
    }
    /**
    * Edita um registro.
    * @param parm - Parametro da consulta
    * @returns retorno da consulta
    */
    async editPonto(pontoId, ponto) {
        try {
            const editUsuario = await this.repoPonto.edit({ 'registroPonto_id': pontoId }, ponto);
            if (!editUsuario || editUsuario instanceof Error) {
                return {
                    success: false,
                    message: 'Erro ao Editar registro!',
                    error: editUsuario
                };
            }
            return {
                success: true,
                message: 'Registro alterado com sucesso!',
                data: editUsuario
            };
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: error.code,
                    message: 'os dados informados já estão em uso',
                };
            }
            return {
                success: false,
                message: 'Erro ao Editar registro!',
                error: error
            };
        }
    }
    /**
* Deleta registro.
* @param parm - Parametro da consulta
* @returns retorno da consulta
*/
    async deletePonto(pontoId) {
        try {
            const repositoryMethods = await this.repoPonto.delete({ registroPonto_id: pontoId });
            if (repositoryMethods instanceof Error) {
                return {
                    success: false,
                    status: 400,
                    message: 'Erro ao deletar registro',
                    error: repositoryMethods
                };
            }
            if (!repositoryMethods.affected || repositoryMethods.affected === 0) {
                return {
                    success: true,
                    status: 200,
                    message: 'Nenhum Registro deletado',
                };
            }
            return {
                success: true,
                status: 200,
                message: 'Registro deletado'
            };
        }
        catch (error) {
            if (error.name == 'QueryFailedError') {
                if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                    return {
                        success: false,
                        status: 409,
                        message: 'A pessoa não pode ser deletada pois existem registros vinculados!',
                        error: error.code
                    };
                    //adicionar outros erros que queira tratar
                }
                else {
                    return {
                        success: false,
                        status: 400,
                        message: 'Erro ao Deletar registro',
                        error: error.code
                    };
                }
            }
            else {
                return {
                    success: false,
                    status: 400,
                    message: 'Erro desconhecido ocorreu.',
                    error: error
                };
            }
        }
    }
}
exports.PontoService = PontoService;
