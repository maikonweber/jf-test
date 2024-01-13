import { Injectable, Logger } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class AulaService {
  private readonly logger = new Logger(AulaService.name)
  constructor(private readonly prismaService: PrismaService) {

  }
  create(createAulaDto: CreateAulaDto) {
    return this.prismaService.aula.create({
      data: {
        content: createAulaDto.content,
        curso: {
          connect: { id: createAulaDto.curso_id }
        }
      }
    });
  }

  findAll() {
    return this.prismaService.aula.findMany();
  }

  findOne(id: number) {
    return this.prismaService.aula.findFirstOrThrow({
      where: { id: id }
    });
  }

  findAllByCursoId(cursoId: number) {
    return this.prismaService.aula.findMany({
      where: {
        cursoId: cursoId,
      },
    });
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return this.prismaService.aula.update({
      where: { id: id },
      data: updateAulaDto
    });
  }

  remove(id: number) {
    return this.prismaService.aula.delete({
      where: { id: id }
    });
  }
}
