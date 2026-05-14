import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  phone!: string;
}
