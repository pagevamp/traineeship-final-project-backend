import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RideRequest } from '@/ride-request/ride-request.entity';
import { TripStatus, VehicleType } from '@/types/trips';

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', name: 'driver_id' })
  readonly driverId: string;

  @Column({ type: 'enum', enum: TripStatus })
  readonly status: TripStatus;

  @Column({
    type: 'enum',
    enum: VehicleType,
    nullable: true,
    name: 'vehicle_type',
  })
  readonly vehicleType?: VehicleType | null;

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
    nullable: true,
    default: null,
  })
  readonly deletedAt?: Date | null;

  @ManyToOne(() => RideRequest, (ride) => ride.trips, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id', referencedColumnName: 'id' })
  readonly ride: RideRequest;
}
