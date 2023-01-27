import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMovieDTO {
  @ApiProperty()
  @IsNotEmpty()
  cipherText: string;
}
