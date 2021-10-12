import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from '../cats/cat.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST == null ? 'localhost' : process.env.DB_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Cat],
      synchronize: true,
    }),
  ],
})
export class DbConnectionModule {}
