import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/Guards/RoleGuard';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/Guards/localGuards';
@ApiTags("Aulas Controller")
@Controller('aula')
export class AulaController {
  private readonly logger = new Logger(AulaController.name)
  constructor(private readonly aulaService: AulaService) { }

  @ApiOperation({ summary: 'Create a New Aula ' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Find all Aulas' })
  @Get()
  findAll() {
    return this.aulaService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor, Aluno")
  @ApiOperation({ summary: 'Find Aulas by Id ' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aulaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Update Aulas By Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(+id, updateAulaDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Delete Aulas By Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aulaService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Aluno")
  @ApiOperation({ summary: 'Vizualizar Aula' })
  @Get('/see/:id')
  seeAula() {
    return
  }


}
