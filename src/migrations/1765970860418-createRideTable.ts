import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRideTable1765970860418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "ride_requests" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "passenger_id" varchar NOT NULL,
            "destination" varchar (255) NOT NULL,
            "landmark" varchar (255),
            "pickup_location" varchar (255) NOT NULL,
            "notes" varchar (3000),
            "departure_time" TSTZRANGE NOT NULL,
            "accepted_at" timestamp with time zone DEFAULT NULL,
            "created_at" timestamp with time zone DEFAULT now(),
            "deleted_at" timestamp with time zone DEFAULT NULL,
            "updated_at" timestamp with time zone DEFAULT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    
      DROP TABLE "ride_requests";`);
  }
}
