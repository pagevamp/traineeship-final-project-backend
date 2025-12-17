import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Index('IDX_users_username', ['username'])
@Index('IDX_users_primary_location', ['primaryLocation'])
@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar', name: 'user_id' })
  readonly userId: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  readonly username: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  readonly firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  readonly lastName: string;

  @Column({ type: 'varchar', length: 255, name: 'primary_location' })
  readonly primaryLocation: string;

  @Column({ type: 'varchar', length: 255, name: 'contact_number' })
  readonly contactNumber: string;
}
