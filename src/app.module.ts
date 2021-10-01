import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5923014kate',
      database: 'postgres',
      entities: [Cat],
      migrations: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
