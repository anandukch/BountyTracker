import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskParticipantModifications1721567805504 implements MigrationInterface {
	name = "TaskParticipantModifications1721567805504";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "comment" ADD "review_status" character varying`);
		await queryRunner.query(`ALTER TABLE "comment" ADD "review_rewarded_bounty" integer`);
		await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_8c02c2c774eff4192dd44533db3"`);
		await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "created_by_id" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "task_participants" DROP CONSTRAINT "FK_7db35693166f9a96c3dd92e4381"`);
		await queryRunner.query(`ALTER TABLE "task_participants" DROP CONSTRAINT "FK_b896bac51dfbca777374da9ff8d"`);
		await queryRunner.query(`ALTER TABLE "task_participants" ALTER COLUMN "employee_id" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "task_participants" ALTER COLUMN "task_id" SET NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "task" ADD CONSTRAINT "FK_8c02c2c774eff4192dd44533db3" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "task_participants" ADD CONSTRAINT "FK_b896bac51dfbca777374da9ff8d" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "task_participants" ADD CONSTRAINT "FK_7db35693166f9a96c3dd92e4381" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "task_participants" DROP CONSTRAINT "FK_7db35693166f9a96c3dd92e4381"`);
		await queryRunner.query(`ALTER TABLE "task_participants" DROP CONSTRAINT "FK_b896bac51dfbca777374da9ff8d"`);
		await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_8c02c2c774eff4192dd44533db3"`);
		await queryRunner.query(`ALTER TABLE "task_participants" ALTER COLUMN "task_id" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "task_participants" ALTER COLUMN "employee_id" DROP NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "task_participants" ADD CONSTRAINT "FK_b896bac51dfbca777374da9ff8d" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "task_participants" ADD CONSTRAINT "FK_7db35693166f9a96c3dd92e4381" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "created_by_id" DROP NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "task" ADD CONSTRAINT "FK_8c02c2c774eff4192dd44533db3" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "review_rewarded_bounty"`);
		await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "review_status"`);
	}
}
