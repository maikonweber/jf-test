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

  async watch_aula(aula_id: number, aluno_id: number) {
    try {
      await this.prismaService.$transaction(async (prisma) => {
        // Create View In Table
        const aula = await prisma.aula.findFirst({
          where: { id: aula_id }
        });

        const aula_view = await prisma.aula_aluno.findFirst({
          where: {
            aulaId: aula_id,
          }
        })

        await prisma.aula_aluno.update({
          where: { id: aula_view.id },
          data: {
            progresso: "Visualizado"
          }
        })



        const set_progresso = await prisma.curso_aluno.findFirstOrThrow({
          where: {
            cursoId: aula.cursoId,
            alunoId: aluno_id
          }
        });


        if (set_progresso.status === "NaoIniciado") {
          const update = await prisma.curso_aluno.update({
            where: {
              id: set_progresso.id
            },
            data: {
              status: "EmAndamento"
            }
          });
        }



        const aulas_do_curso = await prisma.aula_aluno.findMany({
          where: { cursoId: aula.cursoId }
        });

        this.logger.log(aulas_do_curso)

        const allClassesAttended = aulas_do_curso.every(
          (aula) => aula.progresso === "Visualizado"
        );

        this.logger.log(allClassesAttended, "All Classes ")

        if (allClassesAttended) {
          const update = await prisma.curso_aluno.update({
            where: {
              id: set_progresso.id
            },
            data: {
              status: "Finalizado"
            }
          });
        }
        return "Aula Assistida"
      });
    } catch (error) {
      console.error("Error in watch_aula function:", error);
      // Handle the error as needed, e.g., throw, log, or handle it gracefully
      throw new Error("Erro na operação de assistir aula");
    }
  }

  availableAulas(aluno_id: number) {
    return this.prismaService.aula_aluno.findMany({
      where: { alunoId: aluno_id },
      include: {
        curso: true
      }
    })
  }

}
