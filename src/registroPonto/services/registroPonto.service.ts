import { PontoRepository } from "../../ponto/repositories/ponto.repositories";
import { RegistroPontoUsuariosEntity } from "../../database/entity/RegistroPontoUsuarioEntity";
import { UsuarioEntity } from "../../database/entity/usuariosEntity";
import { databaseConnection } from "../../database/connection/connect";
import { Between, Like, Repository } from "typeorm";
import { RegistroPontoEntity } from "../../database/entity/RegistroPontoEntity";

export class PontoService {
    private pontoRepository: PontoRepository;

    constructor() {
        this.pontoRepository = new PontoRepository();
    }

    /**
     * Método para Bater o Ponto
     * Verifica se o usuário já bateu o ponto para esse tipo hoje
     *
     * @param usuario_id - ID do usuário que está batendo o ponto
     * @param PontoTipo - Tipo do Ponto
     * @returns Registro do ponto ou erro
     */
    async registraPonto(usuario_id: number, PontoTipo: 'Entrada' | 'Saida' | 'Inicio_intervalo' | 'Fim_intervalo') { //Promise<RegistroPontoUsuariosEntity | Error>
        try {
            const repository: Repository<RegistroPontoEntity> = databaseConnection.getRepository(RegistroPontoEntity);

            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Define o início do dia (00:00:00)
            const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Define o fim do dia (23:59:59)

            const registrosHoje = await repository.find({
                where: {
                    usuario: { usuario_id }, // Passando o usuario_id no relacionamento
                    registroPonto_tipo: PontoTipo,
                    created_At: Between(startOfDay, endOfDay), // Filtro pela data de hoje
                }
            });
            // Verificando se registrosHoje é um array e se contém algum registro
            if (Array.isArray(registrosHoje) && registrosHoje.length === 0) {
                const registraPonto = await repository.insert({
                    registroPonto_tipo: PontoTipo,
                    usuario: { usuario_id },

                })
                return {
                    success: true,
                    name: 'Ponto Registrado com Sucesso!',
                    message: registraPonto
                }

            } else if (Array.isArray(registrosHoje) && registrosHoje.length > 0) {
                return {
                    success: false,
                    name: 'Ponto Já cadastrado',
                    message: registrosHoje
                }
            } else {
                throw {
                    success: false,
                    name: 'Erro ao processar registros',
                    message: registrosHoje,
                };
            }
        } catch (error) {
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

    async consultaraPonto (){

    }
}
