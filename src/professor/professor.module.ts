import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { PrismaService } from 'prisma/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/JwtContants';
import { PrismaModule } from 'prisma/PrismaModule';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule { }
