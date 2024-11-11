import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({type:'bigint', unsigned: true})
    usuario_id?: number

    @Column({type: 'varchar', length: 255, nullable: false})
    usuario_nome?: string

    @Column({type: 'varchar', length: 255, nullable: false, unique: true})
    usuario_email?: string    

    @Column({type: 'varchar', length: 255, nullable: false})
    usuario_password?: string

    @Column({type: 'enum', enum: ['RH', 'Colaborador', 'Administrador'], default: 'Colaborador'})
    usuario_tipo?: string

    @Column({type: 'time', width: 4, nullable: false })
    usuario_jornada_inicio?: string
    
    @Column({type: 'time', width: 4, nullable: false })
    usuario_jornada_fim?: string

    @Column({type: 'time', width: 4, nullable: false })
    usuario_intervalo_inicio?: string

    @Column({type: 'time', width: 4, nullable: false })
    usuario_intervalo_fim?: string

    @Column({ type: 'enum', enum: ['sim', 'nao'], default: 'nao' })
    usuario_hora_besta?: string;

    @Column({type: 'enum', enum: ['diurno', 'noturno', 'vespertino', 'madrugada', 'jornada', 'meio periodo', 'revezamento', 'flexivel'], default: 'diurno'})
    usuario_turno?: string

    @Column ({type: 'enum',  enum: ['Ativo', 'Inativo'], default: 'Inativo'})
    usuario_status?: 'Ativo' | 'Inativo'

    @Column({type: 'date', nullable: true, default: null})
    usuario_ultimoAcesso?: Date    
    
    @UpdateDateColumn({name: 'updated_At'})
    updated_At?: Date
    
    @CreateDateColumn({name: 'created_At'})
    created_At?: Date    
}