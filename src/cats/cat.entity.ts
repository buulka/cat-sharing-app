import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cat' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  price: number;

  @Column({ default: true })
  isVacant: boolean;

  constructor(
    name: string,
    color: string,
    breed: string,
    age: number,
    price: number,
    isVacant: boolean,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.breed = breed;
    this.age = age;
    this.price = price;
    this.isVacant = isVacant;
  }
}
