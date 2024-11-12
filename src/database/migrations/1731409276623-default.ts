import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731409276623 implements MigrationInterface {
    name = 'Default1731409276623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`usuario_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`usuario_nome\` varchar(255) NOT NULL, \`usuario_email\` varchar(255) NOT NULL, \`usuario_password\` varchar(255) NOT NULL, \`usuario_tipo\` enum ('RH', 'Colaborador', 'Administrador') NOT NULL DEFAULT 'Colaborador', \`usuario_jornada\` time(4) NOT NULL, \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao', \`usuario_turno\` enum ('diurno', 'noturno', 'vespertino', 'madrugada', 'jornada', 'meio periodo', 'revezamento', 'flexivel') NOT NULL DEFAULT 'diurno', \`usuario_status\` enum ('Ativo', 'Inativo') NOT NULL DEFAULT 'Inativo', \`usuario_ultimoAcesso\` date NULL, \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2798103bab9f13a926c1a164be\` (\`usuario_email\`), PRIMARY KEY (\`usuario_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RegistroPonto\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_tipo\` enum ('Entrada', 'Saida', 'Inicio_intervalo', 'Fim_intervalo') NOT NULL DEFAULT 'Entrada', \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RegistroPontoUsuarios\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_data\` date NOT NULL, \`registroPonto_chegada\` datetime NULL, \`registroPonto_inicio_intervalo\` datetime NULL, \`registroPonto_fim_intervalo\` datetime NULL, \`registroPonto_saida\` datetime NULL, \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` ADD CONSTRAINT \`FK_74a304f9ebb41e59d65ba90c47a\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` ADD CONSTRAINT \`FK_4071856378a3d2b867e58d6dba7\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` DROP FOREIGN KEY \`FK_4071856378a3d2b867e58d6dba7\``);
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` DROP FOREIGN KEY \`FK_74a304f9ebb41e59d65ba90c47a\``);
        await queryRunner.query(`DROP TABLE \`RegistroPontoUsuarios\``);
        await queryRunner.query(`DROP TABLE \`RegistroPonto\``);
        await queryRunner.query(`DROP INDEX \`IDX_2798103bab9f13a926c1a164be\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
