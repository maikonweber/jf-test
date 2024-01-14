import { Injectable, Logger } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'prisma/PrismaService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Injectable()
export class CursoService {
  private readonly logger = new Logger(CursoService.name)
  constructor(private readonly prismaService: PrismaService) {

  }


  create(createCursoDto: CreateCursoDto) {
    return this.prismaService.curso.create({
      data: createCursoDto
    });
  }


  findAll() {
    return this.prismaService.curso.findMany();
  }

  async findAllAulasByCourseAulo (id: number) {
    
  }

  async findAllAlunosCourse(id: number) {

  }

  async findAllAulasCourse(id: number) {

  }

  findOne(id: number) {
    return this.prismaService.curso.findFirstOrThrow({
      where: { id: id }
    });
  }


  update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prismaService.curso.update({
      where: { id: id },
      data: updateCursoDto
    });
  }

  remove(id: number) {
    return this.prismaService.curso.delete({
      where: { id: id }
    });
  }
}
