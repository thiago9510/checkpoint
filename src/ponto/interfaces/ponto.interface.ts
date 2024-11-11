import { UsuarioEntity } from "../../database/entity/usuariosEntity"

export interface PontoInterface {
    registroPonto_id?: number
    registroPonto_data?: string
    registroPonto_chegada?: Date
    registroPonto_inicio_intervalo?: Date
    registroPonto_fim_intervalo?: Date    
    registroPonto_saida?: Date
    usuario_id?: UsuarioEntity['usuario_id']
}

export interface PontoResultInterface{
    success: boolean,
    message?: string,   // Mensagem opcional para informações adicionais
    data?: any,  // Dados da pessoa criada, caso tenha sucesso
    error?: string | Error  // Mensagem de erro opcional
    code?: any
}

export type SingleUserProperty<T> = { // tipo que serve para receber apenas uma propriedade do tipo definido
    [K in keyof T]: Pick<T, K>
}[keyof T]
