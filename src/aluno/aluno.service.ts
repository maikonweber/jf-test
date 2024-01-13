import { Injectable, Logger } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from 'prisma/PrismaService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Injectable()
export class AlunoService {
  private readonly logger = new Logger(AlunoService.name)
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createAlunoDto: CreateAlunoDto) {
    return this.prismaService.aluno.create({
      data: createAlunoDto
    })
  }

  findByUsername(username: string) {
    return this.prismaService.aluno.findFirst(
      {
        where: { username: username }
      }
    )
  }

  findAll() {
    return this.prismaService.aluno.findMany();
  }

  findOne(id: number) {
    return this.prismaService.aluno.findFirstOrThrow({
      where: { id: id }
    });
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return this.prismaService.aluno.update({
      where: { id: id },
      data: updateAlunoDto
    });
  }

  remove(id: number) {
    return this.prismaService.aluno.delete({
      where: { id: id }
    });
  }
}
