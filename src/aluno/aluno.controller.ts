import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/localGuards';
import { RoleGuard } from 'src/auth/Guards/RoleGuard';
import { Roles } from 'src/auth/role.decorator';

@ApiTags("Alunos Controller")
@Controller('aluno')
export class AlunoController {
  private readonly logger = new Logger(AlunoController.name)
  constructor(private readonly alunoService: AlunoService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Cria um novo aluno' })
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Busca por todos aulas' })
  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Busca por um aluno pelo seu id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Atualiza um aluno pelo seu id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Exclui um aluno pelo seu id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}
