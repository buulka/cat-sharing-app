import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/all')
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
  getById(@Param('id') id: string) {
    return this.catsService.getById(id);
  }

  @Get('/photolink/:id')
  getCatsPhotoLink(@Param('id') id: string) {
    return this.catsService.getCatsPhotoLink(id);
  }

  @Post('admin/create')
  create(
    @Body()
    body: {
      name: string;
      color: string;
      breed: string;
      age: number;
      price: number;
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
    );
  }

  @Post('admin/postphoto')
  postphoto() {
    return this.catsService.addPhoto();
  }

  @Put('admin/vacant/:id')
  makeStatusTrue(@Param('id') id: string) {
    this.catsService.makeStatusTrue(id);
  }

  @Put('admin/reserved/:id')
  makeStatusFalse(@Param('id') id: string) {
    this.catsService.makeStatusFalse(id);
  }

  @Delete('admin/delete/:id')
  deleteItem(@Param('id') id: string) {
    this.catsService.deleteCatItem(id);
  }
}
