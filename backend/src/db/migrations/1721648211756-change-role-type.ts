import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRoleType1721648211756 implements MigrationInterface {
	name = "ChangeRoleType1721648211756";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "employee" ADD "role_temp" character varying`);

		await queryRunner.query(`UPDATE "employee" SET "role_temp" = "role"::text`);

		await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);

		await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "role_temp" TO "role"`);

		await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "employee" ADD "role_temp" integer`);

		await queryRunner.query(`UPDATE "employee" SET "role_temp" = "role"::integer`);

		await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);

		await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "role_temp" TO "role"`);

		await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET NOT NULL`);
	}
}
