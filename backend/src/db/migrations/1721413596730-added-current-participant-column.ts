import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCurrentParticipantColumn1721413596730 implements MigrationInterface {
    name = 'AddedCurrentParticipantColumn1721413596730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "current_participants" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "current_participants"`);
    }

}
