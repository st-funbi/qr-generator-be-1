import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Body,
  UsePipes,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { GetMovieDTO } from '../dto/getMovieDTO';
import { QrService } from '../services/qrservice/qr.service';

export class ReponseDTO {
  message: null | string;
  data: any;
}
@Controller('movies')
export class MoviesController {
  constructor(private readonly qrservice: QrService) {}
  @Get('/qr-random')
  async getRandomQr() {
    try {
      return {
        message: 'qr feteched',
        data: await this.qrservice.generateMovieQR(),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/get-movies')
  async getMovies(@Body() movieDTO: GetMovieDTO) {
    try {
      const data = await this.qrservice.getMovies(movieDTO.cipherText);
      return {
        message: 'movies',
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
