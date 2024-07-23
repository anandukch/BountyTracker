import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSpecialContribution1721712251499 implements MigrationInterface {
    name = 'AddSpecialContribution1721712251499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_participants" ADD "special_contribution" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_participants" DROP COLUMN "special_contribution"`);
    }

}
