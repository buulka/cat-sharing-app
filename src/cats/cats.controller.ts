import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return 'Remove ' + id;
  // }

  // @Put(':id')
  // update(@Body() updateCatDto: UpdateCatDto, @Param('id') id: string) {
  //   return 'Update ' + id;
  // }
}
