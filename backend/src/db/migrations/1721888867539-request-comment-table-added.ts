import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestCommentTableAdded1721888867539 implements MigrationInterface {
    name = 'RequestCommentTableAdded1721888867539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "redeem_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying NOT NULL, "status" character varying NOT NULL, "redeem_amount" integer NOT NULL, "employee_id" integer, CONSTRAINT "PK_cfc413a4a56777d07b29de675fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "redeem_request" ADD CONSTRAINT "FK_be8423a336e90a61f9089b3e40c" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "redeem_request" DROP CONSTRAINT "FK_be8423a336e90a61f9089b3e40c"`);
        await queryRunner.query(`DROP TABLE "redeem_request"`);
    }

}
