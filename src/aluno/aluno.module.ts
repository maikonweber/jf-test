import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from 'prisma/PrismaService';
import { PrismaModule } from 'prisma/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
