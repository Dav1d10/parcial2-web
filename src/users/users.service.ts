import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    @InjectRepository(Role)
    private readonly userRepo: Repository<User>,
    private readonly roleRepo: Repository<Role>,
  ) {}

  async assignRoles(id: string, assignRolesDto: AssignRolesDto) {
    // Busco el usuario
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Busco los roles en la db y verifico que existen
    const roles = await this.roleRepo.find({
      where: assignRolesDto.roles.map((role_name) => ({ role_name })),
    });

    if (roles.length !== assignRolesDto.roles.length) {
      throw new BadRequestException('roles inválidos');
    }

    user.roles = roles;
    await this.userRepo.save(user);

    return { message: 'Roles asignados' };
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...result } = user;
    return result;
  }

  async findAll() {
    try {
      const users = await this.userRepo.find({
        relations: ['roles'],
      });

      return users.map(({ password, ...user }) => user);
    } catch (error) {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }

  /*
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
