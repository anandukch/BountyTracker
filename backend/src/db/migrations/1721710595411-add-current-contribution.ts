import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentContribution1721710595411 implements MigrationInterface {
    name = 'AddCurrentContribution1721710595411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "current_contribution" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "current_contribution"`);
    }

}
