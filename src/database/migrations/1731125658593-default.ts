import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731125658593 implements MigrationInterface {
    name = 'Default1731125658593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
    }

}
