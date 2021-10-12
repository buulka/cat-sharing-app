import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class CatsService {
  // private readonly minioClient: Minio.Client;

  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectS3() private readonly s3: S3,
  ) {
    async function makeBucket() {
      await s3.headBucket({ Bucket: 'cats' }, function (err) {
        if (err) s3.createBucket({ Bucket: 'cats' }).send();
        else console.log('bucket exists');
      });
    }

    makeBucket();
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
    const cat = new Cat();
    cat.name = name;
    cat.color = color;
    cat.breed = breed;
    cat.age = age;
    cat.price = price;
    cat.isVacant = isVacant;
    cat.imgName = imgName;

    await this.catsRepository.save(cat);
  }

  async addPhoto(id: number, buffer: Buffer): Promise<void> {
    const imgName = id + '.jpg';
    const params = {
      Body: buffer,
      Bucket: 'cats',
      Key: imgName,
    };
    await this.s3.putObject(params).send();
    console.log('Image added');
    await this.catsRepository.update(id, { imgName: imgName });
  }

  async getPhotoById(id: number, res: Response) {
    const params = {
      Bucket: 'cats',
      Key: id + '.jpg',
      // Range: 'bytes=0-9',
    };

    this.s3.getObject(params).createReadStream().pipe(res);
    // const a = await this.s3.getObject(params).promise();
  }
}
