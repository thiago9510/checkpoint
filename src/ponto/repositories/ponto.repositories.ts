import { DeleteResult, QueryFailedError, Repository, Like } from "typeorm";
import { databaseConnection } from "../../database/connection/connect";
import { RegistroPontoUsuariosEntity } from "../../database/entity/RegistroPontoUsuarioEntity"; 
import { PontoInterface, SingleUserProperty } from "../interfaces/ponto.interface"; 
import { UsuarioEntity } from "../../database/entity/usuariosEntity";

/**
 *Classe responsável por Integrar com a entidade RegistroPontoUsuarios
*/
export class PontoRepository {
    private repository: Repository<RegistroPontoUsuariosEntity>

    constructor() {
        this.repository = databaseConnection.getRepository(RegistroPontoUsuariosEntity)
    }

    /**
     *Método para Adicionar Ponto.
      *       
      * @param {RegistroPontoUsuariosEntity} ponto - Recebe
      * @returns {Promise<RegistroPontoUsuariosEntity>} - retorna ponto criado
      * @throws {Error} - Lança um erro em caso de falha
    */
     async create(ponto: Partial<RegistroPontoUsuariosEntity> & { usuario_id: number }): Promise<RegistroPontoUsuariosEntity | Error> {
        try {
            // Criando o objeto RegistroPontoUsuariosEntity, associando `usuario` usando uma instância parcial
            const pontoComUsuario = this.repository.create({
                ...ponto,
                usuario: { usuario_id: ponto.usuario_id } as UsuarioEntity,  // Passando a instância parcial
            });
    
            // Salvando no repositório
            const execSQL = await this.repository.save(pontoComUsuario);
            return execSQL;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw {
                    name: error.name,
                    code: (error as any).code,
                    message: error.message
                };
            } else {
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
    async search(el: {} | any): Promise<RegistroPontoUsuariosEntity[] | Error> {
        try {
            const isEmpty = (obj: object) => Object.keys(obj).length === 0
            const [[key, value]] = Object.entries(el)
            const response = isEmpty(el) ? this.repository.find() : this.repository.find({
                where: {
                    [key]: Like(`%${value}%`)
                }
            })            
            return await response
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw {
                    name: error.name,
                    message: error.message
                }
            } else {
                throw {
                    name: 'Erro ao consultar Registro!',
                    message: error
                }
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
    async edit(query: SingleUserProperty<RegistroPontoUsuariosEntity>, ponto: RegistroPontoUsuariosEntity): Promise<RegistroPontoUsuariosEntity | Error> {
        try {
            const queryReturn: RegistroPontoUsuariosEntity[] = await this.repository.find(
                {
                    where: query
                }
            )

            if (queryReturn.length != 1) {
                throw {
                    name: 'Invalid Parameter',
                    message: 'Invalid ID or not found'
                }
            } else {
                const mergeEdit = await this.repository.merge(queryReturn[0], ponto)
                const saveEdit = await this.repository.save(mergeEdit)
                return saveEdit
            }
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw {
                    name: error.name,
                    code: (error as any).code,
                    message: error.message
                }
            } else {
                throw {
                    name: 'Erro ao salvar Registro!',
                    message: error
                }
            }
        }
    }

    /**
    * Método para Deletar Ponto.
    *       
    * @param { Partial<RegistroPontoUsuariosEntity>} [query] - Recebe um critério de busca
    * @returns {Promise<DeleteResult | Error>} - retorna um DeleteResult ou erro.
    */
    async delete(query: Partial<RegistroPontoUsuariosEntity>): Promise<DeleteResult | Error> {
        try {
            const response = await this.repository.delete(query)
            return response
        } catch (error) {
            if (error instanceof QueryFailedError) {                
                throw {
                    name: error.name,
                    code: (error as any).code,
                    message: error.message
                }
            } else {
                throw {
                    name: 'Erro ao consultar Registro!',
                    message: error
                }
            }
        }
    }
}
