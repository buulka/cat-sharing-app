import { Injectable } from '@nestjs/common';
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
}
//
//   async remove(id: string): Promise<void> {
//     await this.catsRepository.delete(id);
//   }
// }
