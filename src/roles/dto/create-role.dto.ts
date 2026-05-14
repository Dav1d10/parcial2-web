import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'role_name es requerido' })
  @IsString({ message: 'role_name es requerido' })
  role_name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
