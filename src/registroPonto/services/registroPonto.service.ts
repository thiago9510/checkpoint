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
     * @returns Registro do ponto ou erro
     */
    async VerificaPonto(usuario_id: number, PontoTipo: 'Entrada' | 'Saida' | 'Inicio_intervalo' | 'Fim_intervalo') { //Promise<RegistroPontoUsuariosEntity | Error>
        try {
            const repository: Repository<RegistroPontoEntity> = databaseConnection.getRepository(RegistroPontoEntity);

            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Define o início do dia (00:00:00)
            const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Define o fim do dia (23:59:59)
    
            const registrosHoje = await repository.find({
                where: {                    
                    usuario: { usuario_id }, // Passando o usuario_id no relacionamento
                    registroPonto_tipo: PontoTipo, // Filtro pelo tipo de ponto
                    created_At: Between(startOfDay, endOfDay), // Filtro pela data de hoje
                }
            });   

            return await registrosHoje
            // Verificando se registrosHoje é um array e se contém algum registro
            if (Array.isArray(registrosHoje) && registrosHoje.length === 0) {
                // Se não houver registro de ponto hoje, marca a entrada
                return 'não abeteu ponto desse tipo';
            } else if (Array.isArray(registrosHoje) && registrosHoje.length > 0) {
                // Se já houver registro de ponto, marca a saída
                return 'Já bateu ponto hoje'
            } else {
                throw {
                    name: 'Erro ao processar registros',
                    message: 'Erro ao obter registros de ponto',
                };
            }
        } catch (error) {
            throw {
                name: 'Erro ao bater o ponto!',
                message: error
            };
        }
    }
}
