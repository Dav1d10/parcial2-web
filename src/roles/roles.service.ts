import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // Verifico si el rol ya existe
    const exisiting = await this.roleRepo.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    if (exisiting) {
      throw new ConflictException('role_name ya existe');
    }

    // Si existing no se cumple, creo el rol y lo guardo
    const role = this.roleRepo.create(createRoleDto);
    const saved = await this.roleRepo.save(role);

    return {
      message: 'Rol creado con éxito',
      roleId: saved.id,
    };
  }

  async findAll() {
    try {
      return await this.roleRepo.find({
        select: ['id', 'role_name', 'description'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
