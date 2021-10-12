import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    S3Module.forRoot({
      config: {
        accessKeyId: 'minioadmin',
        secretAccessKey: 'minioadmin',
        endpoint:
          process.env.MINIO_HOST == null
            ? '127.0.0.1:9001'
            : process.env.MINIO_HOST,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
  ],
})
export class S3ConnectionModule {}
