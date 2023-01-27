import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    try {
      const movies = await this.prismaService.movie.findMany();
      return movies;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllIn(movidIDs: number[]): Promise<
    (Movie & {
      images: {
        url: string;
      }[];
    })[]
  > {
    try {
      const movies = await this.prismaService.movie.findMany({
        where: { id: { in: movidIDs } },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });
      return movies;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<
    Movie & {
      images: {
        url: string;
      }[];
    }
  > {
    try {
      return this.prismaService.movie.findFirstOrThrow({
        where: { id: id },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
