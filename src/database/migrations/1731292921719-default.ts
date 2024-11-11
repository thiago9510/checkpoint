import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731292921719 implements MigrationInterface {
    name = 'Default1731292921719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`RegistroPonto\` (\`registroPonto_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`registroPonto_tipo\` enum ('Entrada', 'Saida', 'Inicio_intervalo', 'Fim_intervalo') NOT NULL DEFAULT 'Entrada', \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usuario_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`registroPonto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` ADD CONSTRAINT \`FK_74a304f9ebb41e59d65ba90c47a\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`RegistroPonto\` DROP FOREIGN KEY \`FK_74a304f9ebb41e59d65ba90c47a\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_fim\` \`usuario_intervalo_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_intervalo_inicio\` \`usuario_intervalo_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_fim\` \`usuario_jornada_fim\` time(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`usuario_jornada_inicio\` \`usuario_jornada_inicio\` time(4) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`RegistroPonto\``);
    }

}
