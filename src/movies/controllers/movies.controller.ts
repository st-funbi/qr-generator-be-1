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
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
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
  async getRandomQr(@Query('hostUrl') hostUrl: string) {
    try {
      return {
        message: 'qr feteched',
        data: await this.qrservice.generateMovieQR(hostUrl),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/get-movies')
  async getMovies(@Body() getMovies: GetMovieDTO) {
    try {
      const data = await this.qrservice.getMovies(getMovies.cipherText);
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
