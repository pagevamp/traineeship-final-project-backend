import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTripsTable1765971424543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "trips" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "request_id" uuid NOT NULL,
            "driver_id" varchar NOT NULL,
            "status" varchar (255) DEFAULT 'Not Started',
            "vehicle_type" varchar (255) DEFAULT 'Two Wheeler',
            "created_at" timestamp with time zone DEFAULT now(),
            "deleted_at" timestamp with time zone DEFAULT NULL,
            "updated_at" timestamp with time zone DEFAULT NULL,
            
            CONSTRAINT "fk_ride_requests_trips"
            FOREIGN KEY ("request_id")
            REFERENCES "ride_requests" ("id") ON DELETE CASCADE   
            );
            
            CREATE INDEX "IDX_trips_status" ON "trips" ("status");
            CREATE INDEX "IDX_trips_vehicle_type" ON "trips" ("vehicle_type");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` \
            DROP INDEX IF EXISTS "IDX_trips_status";
            DROP INDEX IF EXISTS "IDX_trips_vehicle_type";
            DROP TABLE "trips";`);
  }
}
