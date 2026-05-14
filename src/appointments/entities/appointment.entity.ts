import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

export enum AppointmentStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  DONE = 'done',
}

@Entity('appointments')
export class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    datetime!: Date;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    created_at!: Date;

    @Column()
    motive!: string;

    @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    status!: AppointmentStatus;

    @ManyToOne(() => User, user => user.appointments, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: User;

}
