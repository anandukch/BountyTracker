import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorCommentAndTaskParticipantEntity1721574071535 implements MigrationInterface {
    name = 'RefactorCommentAndTaskParticipantEntity1721574071535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_5ced20aa0e2f023d8afb4f2b0e0"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "task_participant_id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "file_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_5313b4370f205700cb1515e4801" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_5313b4370f205700cb1515e4801"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "file_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "task_participant_id" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_5ced20aa0e2f023d8afb4f2b0e0" FOREIGN KEY ("task_participant_id") REFERENCES "task_participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
