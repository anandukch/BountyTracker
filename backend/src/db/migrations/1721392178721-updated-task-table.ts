import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTaskTable1721392178721 implements MigrationInterface {
    name = 'UpdatedTaskTable1721392178721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "max_participants" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "total_bounty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dead_line" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dead_line"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "total_bounty"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "max_participants"`);
    }

}
