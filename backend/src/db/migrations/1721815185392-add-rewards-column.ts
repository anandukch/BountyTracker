import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRewardsColumn1721815185392 implements MigrationInterface {
    name = 'AddRewardsColumn1721815185392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" ADD "rewards" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" DROP COLUMN "rewards"`);
    }

}
