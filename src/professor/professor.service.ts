import { Injectable, Logger } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class ProfessorService {
  private readonly logger = new Logger(ProfessorService.name)
  constructor(private readonly prismaService: PrismaService) {

  }
  create(createProfessorDto: CreateProfessorDto) {
    return this.prismaService.professor.create({
      data: {
        nome: createProfessorDto.name,
        username: createProfessorDto.username
      }
    });
  }

  findAll() {
    return this.prismaService.professor.findMany();
  }

  findOne(id: number) {
    return this.prismaService.professor.findFirstOrThrow({
      where: { id: id }
    });
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return this.prismaService.professor.update({
      where: { id: id },
      data: updateProfessorDto
    });
  }

  remove(id: number) {
    return this.prismaService.professor.delete({
      where: { id: id }
    });
  }
}
