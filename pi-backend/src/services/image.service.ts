import { Injectable } from '@nestjs/common';
import { Image } from 'src/interfaces/image.interface';

@Injectable()
export class ImageService {
    db: any;
    
    constructor(){}

    getAllImages(accountId): Image[] {
        return this.db.getImagesFromDatabase(accountId)
    }
    getSingleImage(imageId,accountId){
        return this.db.getImageFromDatabase(imageId)
    }
    postImage(image:Image) : boolean {
        return this.db.saveImage(image);
    }
    deleteImage(imageId) : boolean {
        return this.db.deleteImage(imageId);
    }
}