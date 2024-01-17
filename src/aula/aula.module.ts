import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { PrismaService } from 'prisma/PrismaService';
import { PrismaModule } from 'prisma/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [AulaController],
  providers: [AulaService],
})
export class AulaModule { }
