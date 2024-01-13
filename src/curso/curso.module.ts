import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { PrismaService } from 'prisma/PrismaService';

@Module({
  controllers: [CursoController],
  providers: [CursoService, PrismaService],
})
export class CursoModule { }
