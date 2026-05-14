import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'role_name es requerido' })
  role_name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
