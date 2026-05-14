import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('appointments')
  @Roles('doctor')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get('appointments')
  @Roles('admin')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('users/:id/appointments')
  @Roles('paciente', 'doctor')
  findByUser(@Param('id') id: string) {
    return this.appointmentsService.findByUser(id);
  }

  @Patch('appointments/:id')
  @Roles('doctor')
  updateStatus(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateStatus(id, updateAppointmentDto);
  }

  @Delete('users/:id/appointments')
  @Roles('paciente')
  deleteByUser(@Param('id') id: string) {
    return this.appointmentsService.deleteByUser(id);
  }
}
