import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731125386185 implements MigrationInterface {
    name = 'Default1731125386185'

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
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
