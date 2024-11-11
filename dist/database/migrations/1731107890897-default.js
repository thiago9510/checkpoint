"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1731107890897 = void 0;
class Default1731107890897 {
    constructor() {
        this.name = 'Default1731107890897';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_tipo\` enum ('RH', 'Colaborador', 'Administrador') NOT NULL DEFAULT 'Colaborador'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_inicio\` int(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_jornada_fim\` int(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_hora_besta\` enum ('sim', 'nao') NOT NULL DEFAULT 'nao'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`usuario_turno\` enum ('diurno', 'noturno', 'vespertino', 'madrugada', 'jornada', 'meio periodo', 'revezamento', 'flexivel') NOT NULL DEFAULT 'diurno'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_turno\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_hora_besta\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_fim\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_jornada_inicio\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`usuario_tipo\``);
    }
}
exports.Default1731107890897 = Default1731107890897;
