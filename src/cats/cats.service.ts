import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Connection, Repository } from 'typeorm';


@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  getAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  getById(id: string): Promise<Cat> {
    return this.catsRepository.findOne(id);
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

    const file =
      'C:/Users/Ekaterina Ivanova/cat-sharing-app/src/cats/files/pic1.jpg';

    const metaData = {
      'Content-Type': 'image/jpg',

    };

    minioClient.fPutObject(
      'cats',
      'pic1',
      file,
      metaData,

      function (err, etag) {
        if (err) {
          return console.log(err);
        }
        console.log('Success', etag);
      },
    );
  }
}

