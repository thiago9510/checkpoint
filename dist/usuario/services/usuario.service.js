"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const cryptoData_1 = require("../../utility/bcrypt/cryptoData");
const usuario_repositories_1 = require("../repositories/usuario.repositories");
class UsuarioService {
    constructor() {
        this.repoUsuario = new usuario_repositories_1.UsuarioRepository();
    }
    /**
    * Adiciona um novo usuario.
    * @param usuario - Dados do usuario a ser adicionado
    * @returns Resultado da operação
    */
    async addUsuario(usuario) {
        try {
            const passwordHash = await new cryptoData_1.CryptoData().create(usuario.usuario_password);
            const createUsuario = await this.repoUsuario.create({ ...usuario, usuario_password: passwordHash });
            if (!createUsuario || createUsuario instanceof Error) { //garatindo a tipagem para  o retorno de create usuario
                return {
                    success: false,
                    message: 'Erro ao adicionar registro!',
                    error: createUsuario
                };
            }
            delete createUsuario.usuario_password; //removendo a senha do retorno
            return {
                success: true,
                message: 'Usuario cadastrado com sucesso!',
                data: createUsuario
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
                message: 'Erro ao adicionar registro!',
                error: error
            };
        }
    }
    /**
    * Busca um usuario.
    * @param queryParameter - Parametro da consulta
    * @returns retorno da consulta
   */
    async searchUsuario(queryParameter) {
        const arrParameters = Object.keys(queryParameter);
        const parameter = arrParameters[0];
        const valorParameter = queryParameter[parameter];
        const searchUsuario = await this.repoUsuario.search({ [parameter]: valorParameter });
        if (searchUsuario instanceof Error) {
            return {
                success: false,
                message: 'Erro ao Consultar Usuario',
                error: searchUsuario
            };
        }
        else {
            return {
                success: true,
                message: 'Consulta realizada com sucesso!',
                data: searchUsuario
            };
        }
    }
    /**
    * Edita um usuario.
    * @param parm - Parametro da consulta
    * @returns retorno da consulta
    */
    async editUsuario(usuarioId, usuario) {
        try {
            //verifica password, se sim, criptografa se não, não
            const DadosEditUser = async () => {
                if (usuario.usuario_password) {
                    const passwordHash = await new cryptoData_1.CryptoData().create(usuario.usuario_password);
                    return { ...usuario, usuario_password: passwordHash };
                }
                else {
                    return usuario;
                }
            };
            const editUsuario = await this.repoUsuario.edit({ 'usuario_id': usuarioId }, await DadosEditUser());
            if (!editUsuario || editUsuario instanceof Error) {
                return {
                    success: false,
                    message: 'Erro ao Editar registro!',
                    error: editUsuario
                };
            }
            delete editUsuario.usuario_password; //removendo a senha do retorno do edit
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
* Deleta usuario.
* @param parm - Parametro da consulta
* @returns retorno da consulta
*/
    async deleteUsuario(usuarioId) {
        try {
            const repositoryMethods = await this.repoUsuario.delete({ usuario_id: usuarioId });
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
exports.UsuarioService = UsuarioService;
