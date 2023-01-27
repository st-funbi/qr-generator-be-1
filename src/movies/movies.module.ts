import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { QrService } from './services/qrservice/qr.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, QrService],
  imports: [PrismaModule],
})
export class MoviesModule {}
