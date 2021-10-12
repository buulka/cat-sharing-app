import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

import { DbConnectionModule } from './connections/connections.pg';
import { S3ConnectionModule } from './connections/connections.s3';

@Module({
  imports: [CatsModule, DbConnectionModule, S3ConnectionModule],
})
export class AppModule {}
