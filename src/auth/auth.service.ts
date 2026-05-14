import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verifico si el email esta duplicado
    const existing = await this.userRepo.findOne({
      where: { email: registerDto.email },
    });
    if (existing) {
      throw new ConflictException('Email ya registrado');
    }
    // Si no esta duplicado, hasheo password y creo y guardo usuario
    const hashed = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepo.create({
      email: registerDto.email,
      password: hashed,
      name: registerDto.name,
      phone: registerDto.phone,
    });

    const saved = await this.userRepo.save(user);

    return {
      message: 'Usuario registrado con éxito',
      userId: saved.id,
    };
  }

  async login(loginDto: LoginDto) {
    //Verifico que las credenciales sean correctas
    const user = await this.userRepo.findOne({
      where: { email: loginDto.email },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.is_active) {
      throw new HttpException('Usuario desactivado', 423);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role_name),
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
