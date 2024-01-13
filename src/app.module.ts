import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/PrismaModule';
import { ProfessorModule } from './professor/professor.module';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { AulaModule } from './aula/aula.module';
import { SeedServiceService } from './seed-service/seed-service.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PrismaModule,
    ProfessorModule,
    AlunoModule,
    CursoModule,
    AulaModule,
    AuthModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [],
  providers: [SeedServiceService],
})
export class AppModule {}
