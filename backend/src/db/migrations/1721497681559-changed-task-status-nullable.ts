import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedTaskStatusNullable1721497681559 implements MigrationInterface {
    name = 'ChangedTaskStatusNullable1721497681559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET NOT NULL`);
    }

}
