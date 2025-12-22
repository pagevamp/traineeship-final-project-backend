import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', name: 'driver_id' })
  readonly driverId: string;

  @Column({ type: 'varchar', name: 'request_id' })
  readonly requestId: string;

  @Column({ type: 'varchar', length: 255 })
  readonly status: string;

  @Column({ type: 'varchar', length: 255, name: 'contact_number' })
  readonly contactNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'vehicle_type',
  })
  readonly vehicleType: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  readonly updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  readonly deletedAt: Date | null;
}
