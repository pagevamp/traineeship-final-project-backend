import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'ride_requests' })
export class RideRequest {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', name: 'passenger_id' })
  readonly passengerId: string;

  @Column({ type: 'varchar', length: 255 })
  readonly destination: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  readonly landmark?: string | null;

  @Column({ type: 'varchar', length: 255, name: 'pickup_location' })
  readonly pickupLocation: string;

  @Column({ type: 'varchar', length: 3000, nullable: true })
  readonly notes?: string | null;

  @Column({ type: 'tstzrange', name: 'departure_time' })
  readonly departureTime: string;

  @Column({ name: 'accepted_at', type: 'timestamptz' })
  readonly acceptedAt?: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  readonly updatedAt?: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  readonly deletedAt?: Date | null;
}
