import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { toDataURL } from 'qrcode';
import SimpleCrypto from 'simple-crypto-js';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class QrService {
  constructor(private readonly movieservice: MoviesService) {}
  private simpleCryptoInstance = new SimpleCrypto(process.env.CIPHER_SECRET);

  async generateMovieQR(hostUrl: string) {
    try {
      const randomMovie = await this.getRamdomMoviesID();
      let stringData: string = JSON.stringify(randomMovie);
      let encrypted: string = this.simpleCryptoInstance.encrypt(stringData);
      let dataUrl: string = await toDataURL(`${hostUrl}?data=${encrypted}`);
      return dataUrl;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error processing request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getRamdomMoviesID(): Promise<number[]> {
    let moviesLength = (await this.movieservice.findAll()).length;
    const randomID = this.uniqueRand(moviesLength, 1);
    return randomID;
  }

  public async getMovies(cypherText: string): Promise<
    (Movie & {
      images: {
        url: string;
      }[];
    })[]
  > {
    try {
      const plainData: string = JSON.stringify(
        this.simpleCryptoInstance.decrypt(cypherText),
      );
      var moviee = JSON.parse(plainData);
      let movieIDs: number[] = moviee as number[];
      return this.movieservice.findAllIn(movieIDs);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private uniqueRand(max: number, min: number): number[] {
    let arr: number[] = [];
    for (let i: number = 1; i < max; i++) {
      let x: number = Math.floor(Math.random() * max) + min;
      if (arr.includes(x) == true) {
        i = i - 1;
      } else {
        if (x > max == false) {
          arr.push(x);
        }
      }
    }
    return arr;
  }
}
