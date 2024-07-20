import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewTableTaskParticipants1721416140758 implements MigrationInterface {
    name = "AddedNewTableTaskParticipants1721416140758";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "task_participants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "contribution" integer NOT NULL, "task_id" integer, "employee_id" integer, CONSTRAINT "PK_d61f5eb0c87db27473002ff58d7" PRIMARY KEY ("id"))`
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
        await queryRunner.query(`DROP TABLE "task_participants"`);
    }
}
