import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStartDateInTaskTable1721490272733 implements MigrationInterface {
    name = 'AddedStartDateInTaskTable1721490272733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "start_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "start_date"`);
    }

}
