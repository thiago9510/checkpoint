"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1731125386185 = void 0;
class Default1731125386185 {
    constructor() {
        this.name = 'Default1731125386185';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`RegistroPontoUsuarios\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_data\` date NOT NULL, \`registroPonto_chegada\` datetime NULL, \`registroPonto_inicio_intervalo\` datetime NULL, \`registroPonto_fim_intervalo\` datetime NULL, \`registroPonto_saida\` datetime NULL, \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` ADD CONSTRAINT \`FK_4071856378a3d2b867e58d6dba7\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`RegistroPontoUsuarios\` DROP FOREIGN KEY \`FK_4071856378a3d2b867e58d6dba7\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_fim\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_inicio\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_intervalo_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_intervalo_inicio\``);
        await queryRunner.query(`DROP TABLE \`RegistroPontoUsuarios\``);
    }
}
exports.Default1731125386185 = Default1731125386185;
