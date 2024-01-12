import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/PrismaModule';
import { ProfessorModule } from './professor/professor.module';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { AulaModule } from './aula/aula.module';

@Module({
  imports: [
    PrismaModule,
    ProfessorModule,
    AlunoModule,
    CursoModule,
    AulaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
