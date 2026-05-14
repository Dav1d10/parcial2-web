import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments!: Appointment[];
}
