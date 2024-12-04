import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Injectable()
export class KidsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.kid.findMany();
  }

  async findOne(id: number) {
    const kid = await this.prisma.kid.findUnique({ where: { id } });
    if (!kid) throw new NotFoundException('Kid not found');
    return kid;
  }

  async create(createKidDto: CreateKidDto) {
    return this.prisma.kid.create({ data: createKidDto });
  }

  async update(id: number, updateKidDto: UpdateKidDto) {
    const kid = await this.prisma.kid.findUnique({ where: { id } });
    if (!kid) throw new NotFoundException('Kid not found');

    const updated = await this.prisma.kid.update({
      where: { id },
      data: updateKidDto,
    });

    // If the kid is bad, remove the toy assignment
    if (updateKidDto.isGood === false) {
      await this.prisma.toy.updateMany({
        where: { kidId: id },
        data: { kidId: null },
      });
    }

    return updated;
  }

  async assignToy(kidId: number, toyId: number) {
    const kid = await this.findOne(kidId);
    if (!kid.isGood) {
      throw new ConflictException('Bad kids cannot request toys');
    }
    const existingToy = await this.prisma.toy.findFirst({
      where: { kidId },
    });
  
    if (existingToy) {
      throw new ConflictException('This kid already has a toy assigned');
    }

    const toy = await this.prisma.toy.findUnique({ where: { id: toyId } });
    if (!toy) {
      throw new NotFoundException('Toy not found');
    }

    return this.prisma.toy.update({
      where: { id: toyId },
      data: { kidId },
    });
  }

  async removeToyFromKid(kidId: number, toyId: number) {
    const toy = await this.prisma.toy.findFirst({ where: { id: toyId, kidId } });
    if (!toy) {
      throw new NotFoundException('Toy not found for the specified kid');
    }
  
    return this.prisma.toy.update({
      where: { id: toyId },
      data: { kidId: null },
    });
  }
  
  

async remove(id: number) {
  
  const kid = await this.prisma.kid.findUnique({ where: { id } });
  if (!kid) throw new NotFoundException('Kid not found');

  
  await this.prisma.toy.updateMany({
    where: { kidId: id },
    data: { kidId: null },
  });

  
  return this.prisma.kid.delete({
    where: { id },
  });
}
}
