import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.toysService.findOne(+id);
  }

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateToyDto: UpdateToyDto) {
    return this.toysService.update(+id, updateToyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.toysService.remove(+id);
  }
}
