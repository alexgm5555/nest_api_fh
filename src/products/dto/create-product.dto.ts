import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {


  @ApiProperty({
    description: 'Product Title (unique)',
    nullable: false,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString()
  @IsOptional() // se puede con un¿a expresion regular
  slug?: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString({ each: true }) //para que cada uno de los arreglos tenga que cumplir la condición destring
  @IsArray()
  sizes: string[];

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString({ each: true }) //para que cada uno de los arreglos tenga que cumplir la condición destring
  @IsArray()
  tags: string[];

  @ApiProperty()// para que aparezca el campo en swaegger
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
