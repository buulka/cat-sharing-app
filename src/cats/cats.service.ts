import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';

function connectMinio() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Minio = require('minio');

  return new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: 'kate',
    secretKey: '5923014kate',
    useSSL: false,
  });
}

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async getAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async getById(id: string): Promise<Cat> {
    return await this.catsRepository.findOne(id);
  }

  async makeStatusFalse(id: string): Promise<void> {
    await this.catsRepository.update(id, { isVacant: false });
  }

  async makeStatusTrue(id: string): Promise<void> {
    await this.catsRepository.update(id, { isVacant: true });
  }

  async deleteCatItem(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async create(
    name: string,
    color: string,
    breed: string,
    age: number,
    price: number,
    isVacant: boolean,
  ): Promise<void> {
    const cat = new Cat(name, color, breed, age, price, isVacant);
    await this.catsRepository.save(cat);
  }

  async addPhoto(): Promise<void> {
    const minioClient = connectMinio();

    const fileName = ''; // custom field, fileName - cat's id + extension
    const filePath = '' + fileName; // custom field
    const objectName = ''; // custom field cat's id in db + .jpg
    const metaData = {
      'Content-Type': 'image/jpg',
    };

    await minioClient.fPutObject('cats', objectName, filePath, metaData);
  }

  async getCatsPhotoLink(id): Promise<any> {
    const minioClient = connectMinio();

    const a = await minioClient.presignedGetObject(
      'cats',
      'pic' + id + '.jpg',
      24 * 60 * 60,
    );

    return { url: a };
  }
}
