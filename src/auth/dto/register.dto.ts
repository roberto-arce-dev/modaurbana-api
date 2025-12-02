import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../enums/roles.enum';

/**
 * DTO para registro de usuarios
 * Crea User + Profile correspondiente según el rol
 */
export class RegisterDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Email del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña (mínimo 6 caracteres)',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: Role.CLIENTE,
    description: 'Rol del usuario (solo CLIENTE permitido)',
    enum: [Role.CLIENTE],
    default: Role.CLIENTE,
  })
  @IsOptional()
  @IsEnum([Role.CLIENTE])
  role?: Role;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({
    example: '+51 987654321',
    description: 'Teléfono de contacto',
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({
    example: 'Av. Principal 123',
    description: 'Dirección',
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({
    example: 'Valor de ejemplo',
    description: 'tallas (opcional)',
  })
  @IsOptional()
  @IsString()
  tallas?: string;

  @ApiPropertyOptional({
    example: 'Valor de ejemplo',
    description: 'preferencias (opcional)',
  })
  @IsOptional()
  @IsArray()
  preferencias?: string[];

}
