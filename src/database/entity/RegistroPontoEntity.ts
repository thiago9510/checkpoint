import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuarioEntity } from "./usuariosEntity";

@Entity('RegistroPonto')
export class RegistroPontoEntity {
    @PrimaryGeneratedColumn({type:'bigint', unsigned: true})
    registroPonto_id?: number

    @Column({type: 'enum', enum: ['Entrada', 'Saida', 'Inicio_intervalo', 'Fim_intervalo'], default: 'Entrada', nullable: false })
    registroPonto_tipo?: 'Entrada' | 'Saida' | 'Inicio_intervalo' | 'Fim_intervalo'

    //Relacionamento com a tabela UsuarioEntity
    //OBS nessa relação é necessário fazer o find do usuario e passar a entidade
    // usar destructuring and reassignment para passar o iusuario_id
    @ManyToOne(() =>  UsuarioEntity, usuario => usuario.usuario_id, {nullable: false})
    @JoinColumn ({name: "usuario_id"})
    usuario?: UsuarioEntity

    @UpdateDateColumn({name: 'updated_At'})
    updated_At?: Date
    
    @CreateDateColumn({name: 'created_At'})
    created_At?: Date 
}