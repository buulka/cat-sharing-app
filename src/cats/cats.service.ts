import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';

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

  addPhoto() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Minio = require('minio');

    const minioClient = new Minio.Client({
      endPoint: '127.0.0.1',
      port: 9000,
      accessKey: 'kate',
      secretKey: '5923014kate',
      useSSL: false,
    });

    const fileName = ''; // custom field, fileName - cat's id + extension
    const filePath = '' + fileName; // custom field

    const metaData = {
      'Content-Type': 'image/jpg',
    };

    minioClient.fPutObject('cats', 'pic1.jpg', filePath, metaData);
  }
}
