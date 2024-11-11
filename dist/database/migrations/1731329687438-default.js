"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1731329687438 = void 0;
class Default1731329687438 {
    constructor() {
        this.name = 'Default1731329687438';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`RegistroPontoUsuarios\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_data\` date NOT NULL, \`registroPonto_chegada\` datetime NULL, \`registroPonto_inicio_intervalo\` datetime NULL, \`registroPonto_fim_intervalo\` datetime NULL, \`registroPonto_saida\` datetime NULL, \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RegistroPonto\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_tipo\` enum ('Entrada', 'Saida', 'Inicio_intervalo', 'Fim_intervalo') NOT NULL DEFAULT 'Entrada', \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_tipo\` enum ('RH', 'Colaborador', 'Administrador') NOT NULL DEFAULT 'Colaborador'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_turno\` enum ('diurno', 'noturno', 'vespertino', 'madrugada', 'jornada', 'meio periodo', 'revezamento', 'flexivel') NOT NULL DEFAULT 'diurno'`);
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` ADD CONSTRAINT \`FK_4071856378a3d2b867e58d6dba7\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` ADD CONSTRAINT \`FK_74a304f9ebb41e59d65ba90c47a\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` DROP FOREIGN KEY \`FK_74a304f9ebb41e59d65ba90c47a\``);
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` DROP FOREIGN KEY \`FK_4071856378a3d2b867e58d6dba7\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_turno\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_intervalo_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_intervalo_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_tipo\``);
        await queryRunner.query(`DROP TABLE \`RegistroPonto\``);
        await queryRunner.query(`DROP TABLE \`RegistroPontoUsuarios\``);
    }
}
exports.Default1731329687438 = Default1731329687438;
