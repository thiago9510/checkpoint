import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuariosEntity";

@Entity('RegistroPontoUsuarios')
export class RegistroPontoUsuariosEntity {
    @PrimaryGeneratedColumn({type:'bigint', unsigned: true})
    registroPonto_id?: number

    @Column({type: 'date', nullable: false })
    registroPonto_data?: string

    @Column({type: 'datetime', nullable: true })
    registroPonto_chegada?: Date

    @Column({type: 'datetime', nullable: true })
    registroPonto_inicio_intervalo?: Date

    @Column({type: 'datetime', nullable: true })
    registroPonto_fim_intervalo?: Date

    @Column({type: 'datetime', nullable: true })
    registroPonto_saida?: Date

    //Relacionamento com a tabela UsuarioEntity
    //OBS nessa relação é necessário fazer o find do usuario e passar a entidade 
    @ManyToOne(() =>  UsuarioEntity, usuario => usuario.usuario_id, {nullable: false})
    @JoinColumn ({name: "usuario_id"})
    usuario?: UsuarioEntity
}