import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

  @ApiProperty({
    default: 10,
    description: 'How many rows do you need?'
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you to skipt?'
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
