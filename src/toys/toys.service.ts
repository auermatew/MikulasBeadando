import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Injectable()
export class ToysService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if (!toy) throw new NotFoundException('Toy not found');
    return toy;
  }

  async create(createToyDto: CreateToyDto) {
    return this.prisma.toy.create({ data: createToyDto });
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if (!toy) throw new NotFoundException('Toy not found');
    return this.prisma.toy.update({
      where: { id },
      data: updateToyDto,
    });
  }

  async remove(id: number) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if (!toy) throw new NotFoundException('Toy not found');
    return this.prisma.toy.delete({ where: { id } });
  }
}
