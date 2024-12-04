import { Material } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateToyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['wood', 'metal', 'plastic', 'other'])
  material: Material;

  @IsNumber()
  @Min(0)
  weight: number;
}
