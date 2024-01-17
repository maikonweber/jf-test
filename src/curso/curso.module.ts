import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { PrismaService } from 'prisma/PrismaService';
import { PrismaModule } from 'prisma/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule { }
