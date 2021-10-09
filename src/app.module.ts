import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST == null ? 'localhost' : process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: '5923014kate',
      database: 'postgres',
      entities: [Cat],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
