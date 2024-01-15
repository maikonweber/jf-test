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

  async findAllAulasByCourseAulo(id: number) {
    return this.prismaService.curso_aluno.findMany({
      where: { alunoId: id },
      include: {
        curso: {
          include: {
            curso_aluno: true,
          },
        },
      }
    })
  }

  async giveAccess(aluno_id: number, curso_id: number) {
    return this.prismaService.curso_aluno.create({
      data: {
        alunoId: aluno_id,
        cursoId: curso_id,
        ativo: true,
        status: "NaoIniciado"
      }
    })
  }

  async updateStatus(cursoId: number, alunoId: number, novoStatus: boolean) {
    const id = await this.prismaService.curso_aluno.findFirstOrThrow({
      where: {
        cursoId,
        alunoId
      }
    })

    const update = await this.prismaService.curso_aluno.update({
      where: {
        id: id.id
      },
      data: {
        ativo: novoStatus
      }
    })

    return update
  }

  async removeAcess(cursoId: number, alunoId: number, novoStatus: boolean) {
    const id = await this.prismaService.curso_aluno.findFirstOrThrow({
      where: {
        cursoId,
        alunoId
      }
    })

    const update = await this.prismaService.curso_aluno.delete({
      where: {
        id: id.id
      },
    })

    return update
  }

  async approveAluno(aluno_id: number, course_id: number) {
    const aulas = await this.prismaService.aula_aluno.findMany({
      where: {
        cursoId: course_id,
        alunoId: aluno_id
      }
    })

    const allAulasVisualizadas = aulas.every((aula) => aula.progresso === 3);

    if (!allAulasVisualizadas) {
      const curso_aluno = await this.prismaService.curso_aluno.findFirst({
        where: {
          cursoId: course_id,
          alunoId: aluno_id
        }
      })

      return this.prismaService.curso_aluno.update({
        where: { id: curso_aluno.id },
        data: {
          status: 'Aprovado'
        }
      })

    }

    return 
  }

  async findAllAlunosCourse(id: number) {
    const alunosDoCurso = await this.prismaService.curso_aluno.findMany({
      where: {
        cursoId: id,
        ativo: true
      },
      include: {
        aluno: true,
      },
    });

    return alunosDoCurso
  }

  async findAllAulasCourse(id: number) {
    return this.prismaService.aula.findMany({
      where: {
        cursoId: id
      }
    })
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
