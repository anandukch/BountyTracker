import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTierHistory1721811554834 implements MigrationInterface {
    name = 'AddTierHistory1721811554834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" ADD "platinum_count" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" DROP COLUMN "platinum_count"`);
    }

}
