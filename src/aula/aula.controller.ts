import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Request } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/Guards/RoleGuard';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/Guards/localGuards';
@ApiTags("Aulas Controller")
@Controller('aula')
export class AulaController {
  private readonly logger = new Logger(AulaController.name)
  constructor(private readonly aulaService: AulaService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma nova aula' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    this.logger.log("Teste")
    return this.aulaService.create(createAulaDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Buscas todas aulas ** apenas visivel pelos professores' })
  @Get()
  findAll() {
    return this.aulaService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Busca aula pelo id ** apenas visivel pelos professores' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aulaService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Update aulas pelo seu id ** apenas visivel pelos professores' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(+id, updateAulaDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Delete aulas pelo seu id ** apenas visivel pelos professores' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aulaService.remove(+id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Aluno")
  @ApiOperation({ summary: 'Assistir aulas fornece status de visualizado - caso todas aulas forem visualizadas defino o curso com finalizado' })
  @Get('/watch_aula/:aula_id')
  WatchAula(@Request() req, @Param('aula_id') aula_id: string) {
    return this.aulaService.watch_aula(+aula_id, req.user.id)
  }

}
