import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('kids')
export class KidsController {
  constructor(private readonly KidsService: KidsService) {}

  @Get()
  findAll() {
    return this.KidsService.findAll();
  }

  @Post()
  create(@Body() createKidDto: CreateKidDto) {
    return this.KidsService.create(createKidDto);
  }

  @Put(':kidId/toys/:toyId')
  assignToy(@Param('kidId') kidId: number, @Param('toyId') toyId: number) {
    return this.KidsService.assignToy(+kidId, +toyId);
  }

  @Delete(':kidId/toys/:toyId')
  removeToyFromKid(@Param('kidId') kidId: number, @Param('toyId') toyId: number) {
    return this.KidsService.removeToyFromKid(+kidId, +toyId);
  }
  

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateKidDto: UpdateKidDto) {
    return this.KidsService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
  return this.KidsService.remove(+id);
}

}
