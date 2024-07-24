import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStartDate1721826922417 implements MigrationInterface {
    name = 'RemoveStartDate1721826922417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "start_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "start_date" TIMESTAMP NOT NULL`);
    }

}
