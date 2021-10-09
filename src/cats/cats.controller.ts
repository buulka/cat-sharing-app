import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.getAll();
  }

  @Get('/reserved')
  getReservedCats() {
    return this.catsService.getReserved();
  }

  @Get('/vacant')
  getVacantCats() {
    return this.catsService.getVacant();
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res() res: Response) {
    const cat = await this.catsService.getById(id);
    if (cat == null) res.status(HttpStatus.NOT_FOUND).send('Я твой база шатал');
    else res.status(HttpStatus.OK).json(cat).send();
  }

  @Get('/:id/photo')
  getPhotoById(@Param('id') id: number, @Res() res: Response) {
    return this.catsService.getPhotoById(id, res);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      color: string;
      breed: string;
      age: number;
      price: number;
      imgName: string;
      isVacant: boolean;
    },
  ) {
    return this.catsService.create(
      body.name,
      body.color,
      body.breed,
      body.age,
      body.price,
      body.isVacant,
      body.imgName,
    );
  }

  @Post('/:id/photo')
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    this.catsService.addPhoto(id, file.buffer);
  }

  @Put('/:id/vacant')
  makeVacant(@Param('id') id: number) {
    this.catsService.makeVacant(id);
  }

  @Put('/:id/reserved')
  makeReserved(@Param('id') id: number) {
    this.catsService.makeReserved(id);
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: number) {
    this.catsService.deleteCatItem(id);
  }
}
