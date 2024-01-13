import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfessorService } from 'src/professor/professor.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './JwtContants';
import { AlunoService } from 'src/aluno/aluno.service';
import { PrismaService } from 'prisma/PrismaService';

@Module({
  imports: [
    JwtModule.register({
      privateKey: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ProfessorService, AlunoService, PrismaService],
})
export class AuthModule { }
