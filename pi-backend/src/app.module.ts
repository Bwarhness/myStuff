import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './controllers/images/image.controller';
import { ImageService } from './services/image.service';

@Module({
  imports: [],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
