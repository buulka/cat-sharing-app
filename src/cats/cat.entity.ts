import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: string;

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

  @Column({ default: null })
  imgName: string;

  constructor(
    name: string,
    color: string,
    breed: string,
    age: number,
    price: number,
    isVacant: boolean,
    imgName: string,
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.breed = breed;
    this.age = age;
    this.price = price;
    this.imgName = imgName;
    this.isVacant = isVacant;
  }
}
