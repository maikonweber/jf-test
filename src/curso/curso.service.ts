import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
    try {
      return this.prismaService.curso.create({
        data: createCursoDto
      })
    } catch (error) {
      this.logger.error(`Erro ao criar curso: ${error.message}`)
      throw new InternalServerErrorException("Erro interno ao criar curso")
    };
  }


  findAll() {
    try {
      return this.prismaService.curso.findMany();
    } catch (error) {
      this.logger.error(`Erro ao Buscar curso: ${error.message}`)
      throw new InternalServerErrorException("Erro interno ao buscar curso")
    }
  }

  async findAllAulasByCourseAulo(id: number) {
    try {
      return this.prismaService.curso_aluno.findMany({
        where: { alunoId: id, ativo: true },
        include: {
          curso: {
            include: {
              curso_aluno: true,
              aulasAluno: true
            },
          },
        }
      })
    } catch (error) {
      this.logger.error(`Erro ao buscar todos aulas e cursos do aluno: ${error.message}`)
      throw new InternalServerErrorException("Erro interno na busca pelas aulas do aluno")
    }
  }


  async giveAccess(aluno_id: number, curso_id: number) {
    try {
      await this.prismaService.$transaction(async (prisma) => {
        // Create curso_aluno entry
        await prisma.curso_aluno.create({
          data: {
            alunoId: aluno_id,
            cursoId: curso_id,
            ativo: true,
            status: "NaoIniciado"
          }
        });

        // Create aula_aluno entries for each aula in the curso
        const aulas_in_course = await prisma.aula.findMany({
          where: { cursoId: curso_id }
        });

        await Promise.all(
          aulas_in_course.map(async (el) => {
            await prisma.aula_aluno.create({
              data: {
                cursoId: curso_id,
                alunoId: aluno_id,
                aulaId: el.id,
                progresso: "NaoIniciado"
              }
            });
          })
        );
      });

      return;
    } catch (error) {
      this.logger.error(`Erro ao conceder acesso: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao conceder acesso');
    }
  }


  async updateStatus(cursoId: number, alunoId: number, novoStatus: boolean) {
    try {
      const id = await this.prismaService.curso_aluno.findFirstOrThrow({
        where: {
          cursoId,
          alunoId
        }
      });

      const update = await this.prismaService.curso_aluno.update({
        where: {
          id: id.id
        },
        data: {
          ativo: novoStatus
        }
      });

      return update;
    } catch (error) {
      this.logger.error(`Erro ao atualizar status: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao atualizar status');
    }
  }

  async approveAluno(aluno_id: number, course_id: number) {
    try {
      const curso_aluno = await this.prismaService.curso_aluno.findFirstOrThrow({
        where: {
          cursoId: course_id,
          alunoId: aluno_id
        }
      });

      if (curso_aluno.status === "Finalizado") {
        return this.prismaService.curso_aluno.update({
          where: { id: curso_aluno.id },
          data: {
            status: 'Aprovado'
          }
        });
      };


      throw new BadRequestException('Não é possível aprovar o aluno no momento');

    } catch (error) {
      this.logger.error(`Erro ao aprovar aluno: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao aprovar aluno');
    }
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
    try {
      return await this.prismaService.aula.findMany({
        where: {
          cursoId: id
        }
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar aulas do curso: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao buscar aulas do curso');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.curso.findFirstOrThrow({
        where: { id: id }
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar curso por ID: ${error.message}`);
      throw new NotFoundException('Curso não encontrado');
    }
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    try {
      return await this.prismaService.curso.update({
        where: { id: id },
        data: updateCursoDto
      });
    } catch (error) {
      this.logger.error(`Erro ao atualizar curso: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao atualizar curso');
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.curso.delete({
        where: { id: id }
      });
    } catch (error) {
      this.logger.error(`Erro ao excluir curso: ${error.message}`);
      throw new InternalServerErrorException('Erro interno ao excluir curso');
    }
  }

}
