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
  @ApiOperation({ summary: 'Create a New Curso' })
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Find all Cursos ' })
  @Get('all')
  findAll() {
    return this.cursoService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Find Curso by Id' })
  @Get('findone/:id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Aluno")
  @ApiOperation({ summary: 'Lista todos curso e aulas que um aluno tem disponivel' })
  @Get('findselfcourse/:id')
  findCursoAndAulasSelf(@Request() req, id: string) {
    return this.cursoService.findAllAulasByCourseAulo(req.user.id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Update Curso By Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Delete Curso By ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: "Visualiza todoso os alunos registrado neste curso" })
  @Roles("Professor")
  @Get("find_aluno_in_course/:id")
  listAllAlunoInCurso(@Param('id') id: string) {
    return this.cursoService.findAllAlunosCourse(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor", "Aluno")
  @ApiOperation({ summary: "Lista todas as Aulas deste Curso if Aluno Apenas se esta incrito" })
  @Get("find_aulas_course/:id")
  listAulasInCurso(@Param('id') id: string) {
    return this.cursoService.findAllAulasCourse(+id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Aprova um Aluno" })
  @Get("approve/:id:curso_id")
  ApproveAluno(@Param("id") aluno_id: string, @Param("curso_id") cursoId: string) {
    return
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Da acesso ao um Curso" })
  @Get("giveaccess/:id")
  GiveAccess(@Param("id") aluno_id: string, @Param("curso_id") cursoId: string) {
    return this.cursoService.giveAccess(+aluno_id, +cursoId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: "Remove Acesso ao Curso - ID - Aluno" })
  @Get("removeacess/:id:cursoId")
  RemoveAcess(@Param('id') aluno_id: string, @Param('cursoId') cursoId: string) {
    return this.cursoService.updateStatus(+aluno_id, +cursoId, true)
  }
}
