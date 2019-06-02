import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ImageService } from 'src/services/image.service';

@Controller('images')
export class ImageController {
    constructor(public imageService: ImageService){

    }
    @Get()
    findAll() {
      let accountId;
      return this.imageService.getAllImages(accountId);
    }
    @Get(':id')
    findOne() {
      let accountId;
      return this.imageService.getAllImages(accountId);
    }
}
