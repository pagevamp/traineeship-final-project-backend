import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1765967976599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "user_id" varchar PRIMARY KEY,
        "username" varchar UNIQUE,
        "first_name" varchar,  
        "last_name" varchar, 
        "primary_location" varchar(255),
        "contact_number" varchar(255),
      );
      CREATE INDEX "IDX_users_username" ON "users" ("username");
      CREATE INDEX "IDX_users_primary_location" ON "users" ("primary_location");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_username";
      DROP INDEX IF EXISTS "IDX_users_primary_location";
      DROP TABLE "users";`);
  }
}
