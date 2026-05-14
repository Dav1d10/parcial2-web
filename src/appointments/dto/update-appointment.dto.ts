import { IsEnum } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class UpdateAppointmentDto {
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;
}
