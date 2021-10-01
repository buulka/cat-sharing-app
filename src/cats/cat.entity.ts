import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cat' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  price: number;

  @Column({ default: true })
  isVacant: boolean;

  constructor(
    name: string,
    age: number,
    price: number,
    isVacant: boolean,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.price = price;
    this.isVacant = isVacant;
  }
}
