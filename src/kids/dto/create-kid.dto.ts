import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateKidDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  isGood: boolean;
}
