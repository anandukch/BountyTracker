import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillToTask1721621824148 implements MigrationInterface {
    name = 'AddSkillToTask1721621824148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "skills" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "skills"`);
    }

}
