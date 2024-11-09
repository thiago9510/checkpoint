import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731107890897 implements MigrationInterface {
    name = 'Default1731107890897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_tipo\` enum ('RH', 'Colaborador', 'Administrador') NOT NULL DEFAULT 'Colaborador'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_inicio\` int(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_fim\` int(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_turno\` enum ('diurno', 'noturno', 'vespertino', 'madrugada', 'jornada', 'meio periodo', 'revezamento', 'flexivel') NOT NULL DEFAULT 'diurno'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_turno\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_tipo\``);
    }

}
