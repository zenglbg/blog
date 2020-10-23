import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(file: any) {
    const { originalname, mimetype, size, buffer } = file;

    return file
  }
}
