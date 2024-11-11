"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1731125658593 = void 0;
class Default1731125658593 {
    constructor() {
        this.name = 'Default1731125658593';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
    }
}
exports.Default1731125658593 = Default1731125658593;
