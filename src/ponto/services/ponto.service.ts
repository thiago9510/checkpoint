import { DeleteResult, QueryFailedError } from "typeorm"
import { CryptoData } from "../../utility/bcrypt/cryptoData" 
import { PontoResultInterface, PontoInterface } from "../interfaces/ponto.interface"
import { RegistroPontoUsuariosEntity } from "../../database/entity/RegistroPontoUsuarioEntity" 
import { PontoRepository } from "../repositories/ponto.repositories"

export class PontoService {
    private repoPonto: PontoRepository

    constructor() {
        this.repoPonto = new PontoRepository()
    }

    /**
    * Adiciona um novo Ponto.
    * @param usuario - Dados do Ponto a ser adicionado
    * @returns Resultado da operação
    */
    async addPonto(usuario: PontoInterface & { usuario_id: number }): Promise<PontoResultInterface> {
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
        } catch (error) {
            if ((error as any).code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: (error as any).code,
                    message: 'Os dados informados já estão em uso',
                };
            }
            return {
                success: false,
                message: 'Erro ao adicionar registro!',
                error: error as any
            };
        }
    }


    /**
    * Busca um Ponto.
    * @param queryParameter - Parametro da consulta
    * @returns retorno da consulta
   */
    async searchPonto(queryParameter: { [key: string]: string }): Promise<PontoResultInterface> {
        const arrParameters = Object.keys(queryParameter)
        const parameter = arrParameters[0]
        const valorParameter = queryParameter[parameter]

        const searchPonto = await this.repoPonto.search({ [parameter]: valorParameter })
        if (searchPonto instanceof Error) {
            return {
                success: false,
                message: 'Erro ao Consultar Registro',
                error: searchPonto
            }
        } else {
            return {
                success: true,
                message: 'Consulta realizada com sucesso!',
                data: searchPonto
            }
        }
    }

    /**
    * Edita um registro.
    * @param parm - Parametro da consulta
    * @returns retorno da consulta
    */
    async editPonto(pontoId: number, ponto: PontoInterface): Promise<PontoResultInterface> {
        try {            
         
            const editUsuario = await this.repoPonto.edit({ 'registroPonto_id': pontoId }, ponto)

            if (!editUsuario || editUsuario instanceof Error) {
                return {
                    success: false,
                    message: 'Erro ao Editar registro!',
                    error: editUsuario
                }
            }        
            return {
                success: true,
                message: 'Registro alterado com sucesso!',
                data: editUsuario
            }
        } catch (error) {
            if ((error as any).code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: (error as any).code,
                    message: 'os dados informados já estão em uso',
                }
            }
            return {
                success: false,
                message: 'Erro ao Editar registro!',
                error: error as any
            }
        }
    }

    /**
* Deleta registro.
* @param parm - Parametro da consulta
* @returns retorno da consulta
*/
    async deletePonto(pontoId: number) {
        try {
            const repositoryMethods: DeleteResult | Error = await this.repoPonto.delete({ registroPonto_id: pontoId })

            if (repositoryMethods instanceof Error) {
                return {
                    success: false,
                    status: 400,
                    message: 'Erro ao deletar registro',
                    error: repositoryMethods
                }
            }

            if (!repositoryMethods.affected || repositoryMethods.affected === 0) {
                return {
                    success: true,
                    status: 200,
                    message: 'Nenhum Registro deletado',
                }
            }
            return {
                success: true,
                status: 200,
                message: 'Registro deletado'
            }

        } catch (error: unknown) {
            if((error as any).name == 'QueryFailedError'){               
                if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
                    return {
                        success: false,
                        status: 409,
                        message: 'A pessoa não pode ser deletada pois existem registros vinculados!',
                        error: (error as any).code
                    }
                    //adicionar outros erros que queira tratar
                } else {
                    return {
                        success: false,
                        status: 400,
                        message: 'Erro ao Deletar registro',
                        error: (error as any).code
                    }
                }                
            } else{
                return {
                    success: false,
                    status: 400,
                    message: 'Erro desconhecido ocorreu.',
                    error: error
                }
            }
        }
    }
}

