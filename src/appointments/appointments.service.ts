import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from '../users/entities/user.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepo.create(createAppointmentDto);
    await this.appointmentRepo.save(appointment);
    return { message: 'cita creada correctamente' };
  }

  async findAll() {
    try {
      const data = await this.appointmentRepo.find({ relations: ['user'] });
      return { message: 'citas devueltas correctamente', data };
    } catch {
      throw new InternalServerErrorException('Error al listar las citas');
    }
  }

  async findByUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('No se encontró el usuario');

    try {
      const data = await this.appointmentRepo.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
      return { message: 'Sus citas fueron devueltas correctamente', data };
    } catch {
      throw new InternalServerErrorException('Error al listar sus citas');
    }
  }

  async updateStatus(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepo.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Cita no encontrada');

    appointment.status = updateAppointmentDto.status;
    await this.appointmentRepo.save(appointment);
    return { message: 'El estado de la cita fue actualizado' };
  }

  async deleteByUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('No se encontró el usuario');

    await this.appointmentRepo.delete({ user: { id: userId } });
    return { message: 'La cita fue eliminada' };
  }
}
