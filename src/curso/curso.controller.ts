import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Request } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/localGuards';
import { Roles } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/Guards/RoleGuard';

@ApiTags("Cursos Controller")
@Controller('curso')
export class CursoController {
  private readonly logger = new Logger(CursoController.name)
  constructor(private readonly cursoService: CursoService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Cria um novo curso' })
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Busca todos os cursos' })
  @Get('all')
  findAll() {
    return this.cursoService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Busca um curso pelo seu id **Apenas disponivel para professor' })
  @Get('findone/:curso_id')
  findOne(@Param('curso_id') id: string) {
    return this.cursoService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Aluno")
  @ApiOperation({ summary: 'Lista todas informaçoes cursos do aluno(Cursos, Aulas, Progresso)' })
  @Get('find_self_course/')
  findCursoAndAulasSelf(@Request() req, id: string) {
    return this.cursoService.findAllAulasByCourseAulo(req.user.id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Atualiza um curso por id' })
  @Patch(':curso_id')
  update(@Param('curso_id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Deleta um curso por id' })
  @Delete('curso_id')
  remove(@Param('curso_id') id: string) {
    return this.cursoService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: "Visualiza todoso os alunos registrado neste curso" })
  @Roles("Professor")
  @Get("find_aluno_in_course/:curso_id")
  listAllAlunoInCurso(@Param('curso_id') id: string) {
    return this.cursoService.findAllAlunosCourse(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Lista todas as Aulas deste Curso" })
  @Get("find_aulas_course/:curso_id")
  listAulasInCurso(@Param('curso_id') id: string) {
    return this.cursoService.findAllAulasCourse(+id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Aprova um Aluno ** Apenas se auno estiver finalizado em todas aulas" })
  @Patch("approve/:aluno_id:curso_id")
  ApproveAluno(@Param("aluno_id") aluno_id: string, @Param("curso_id") cursoId: string) {
    return this.cursoService.approveAluno(+aluno_id, +cursoId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Da acesso ao um Curso e Aulas para um aluno ** Necessario haver aulas criada no curso" })
  @Patch("giveaccess/:aluno_id:curso_id")
  GiveAccess(@Param("aluno_id") aluno_id: string, @Param("curso_id") cursoId: string) {
    return this.cursoService.giveAccess(+aluno_id, +cursoId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Remove Acesso ao Curso" })
  @Patch("removeacess/:aluno_id:curso_id")
  RemoveAcess(@Param('aluno_id') aluno_id: string, @Param('curso_id') cursoId: string) {
    return this.cursoService.updateStatus(+aluno_id, +cursoId, false)
  }
}
