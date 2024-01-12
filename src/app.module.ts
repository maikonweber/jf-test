import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/PrismaModule';
import { ProfessorModule } from './professor/professor.module';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [
    PrismaModule,
    ProfessorModule,
    AlunoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
