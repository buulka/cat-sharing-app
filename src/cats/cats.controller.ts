import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.catsService.getById(id);
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

  @Put('/vacant/:id')
  makeStatusTrue(@Param('id') id: string) {
    this.catsService.makeStatusTrue(id);
  }

  @Put('/reserved/:id')
  makeStatusFalse(@Param('id') id: string) {
    this.catsService.makeStatusFalse(id);
  }

  @Post('/postphoto')
  postphoto() {
    return this.catsService.addPhoto();
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return 'Remove ' + id;
  // }
}
