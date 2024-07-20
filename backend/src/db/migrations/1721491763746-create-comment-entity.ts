import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentEntity1721491763746 implements MigrationInterface {
    name = 'CreateCommentEntity1721491763746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "comment_type" character varying NOT NULL, "content" character varying NOT NULL, "file_url" character varying NOT NULL, "task_id" integer, "task_participant_id" integer, "mention_comment_id" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_5ced20aa0e2f023d8afb4f2b0e0" FOREIGN KEY ("task_participant_id") REFERENCES "task_participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_06c3b713cd058e0824657560d3d" FOREIGN KEY ("mention_comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_06c3b713cd058e0824657560d3d"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_5ced20aa0e2f023d8afb4f2b0e0"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
