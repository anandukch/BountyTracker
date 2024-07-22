import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRoleType1721648211756 implements MigrationInterface {
    name = 'ChangeRoleType1721648211756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" integer NOT NULL`);
    }

}
