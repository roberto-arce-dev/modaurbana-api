import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    example: 'Nombre del Producto',
    description: 'Nombre del Producto',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({
    example: 'Descripción del Producto',
    description: 'Descripción opcional',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'M',
    description: 'Talla del producto',
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  })
  @IsOptional()
  @IsEnum(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
  talla?: string;

  @ApiPropertyOptional({
    example: 'Algodón',
    description: 'Material principal',
  })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({
    example: 'Casual',
    description: 'Estilo del producto',
  })
  @IsOptional()
  @IsString()
  estilo?: string;

  @ApiPropertyOptional({
    example: 'Azul',
    description: 'Color principal',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    example: 49.99,
    description: 'Precio del producto',
  })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  precio: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Unidades disponibles',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  stock?: number;

  @ApiProperty({
    example: '65b8b3f4c1a2f4d6e8a7c9b1',
    description: 'ID de la categoría asociada',
  })
  @IsMongoId()
  @IsNotEmpty()
  categoria: string;

  @ApiPropertyOptional({
    example: 'https://example.com/imagen.jpg',
    description: 'URL de la imagen',
  })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/thumbnail.jpg',
    description: 'URL del thumbnail',
  })
  @IsOptional()
  @IsString()
  imagenThumbnail?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el producto está en tendencia',
  })
  @IsOptional()
  @IsBoolean()
  tendencia?: boolean;
}
