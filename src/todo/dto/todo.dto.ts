import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TodoDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
