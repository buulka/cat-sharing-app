import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
import Minio from 'minio';

@Injectable()
export class CatsService {
  private readonly minioClient: Minio.Client;

  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Minio = require('minio');
    this.minioClient = new Minio.Client({
      endPoint:
        process.env.MINIO_HOST == null ? '127.0.0.1' : process.env.MINIO_HOST,
      port: 9000,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
      useSSL: false,
    });
    this.minioClient.bucketExists('cats').then((exists) => {
      if (!exists) this.minioClient.makeBucket('cats', 'us-east-1');
    });
  }

  async getAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async getById(id: number): Promise<Cat> {
    return await this.catsRepository.findOne(id);
  }

  async getReserved(): Promise<Cat[]> {
    return await this.catsRepository.find({ isVacant: false });
  }

  async getVacant(): Promise<Cat[]> {
    return await this.catsRepository.find({ isVacant: true });
  }

  async makeReserved(id: number): Promise<void> {
    await this.catsRepository.update(id, { isVacant: false });
  }

  async makeVacant(id: number): Promise<void> {
    await this.catsRepository.update(id, { isVacant: true });
  }

  async deleteCatItem(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async create(
    name: string,
    color: string,
    breed: string,
    age: number,
    price: number,
    isVacant: boolean,
    imgName: string,
  ): Promise<void> {
    const cat = new Cat(name, color, breed, age, price, isVacant, imgName);
    await this.catsRepository.save(cat);
  }

  async addPhoto(id: number, buffer: Buffer): Promise<void> {
    const metaData = {
      'Content-Type': 'image/jpg',
    };

    const imgName = id + '.jpg';

    await this.minioClient.putObject('cats', imgName, buffer, metaData);
    console.log('Image added');
    await this.catsRepository.update(id, { imgName: imgName });
  }

  async getPhotoById(id: number, res: Response) {
    this.minioClient.getObject('cats', id + '.jpg', (error, result) =>
      result.pipe(res),
    );
  }
}
