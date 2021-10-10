import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cats' })
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

  @Column('float')
  price: number;

  @Column({ default: true, nullable: true })
  isVacant?: boolean;

  @Column({ default: null, nullable: true })
  imgName?: string;
}
