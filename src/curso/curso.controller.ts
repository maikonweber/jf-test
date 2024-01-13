import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Cursos Controller")
@Controller('curso')
export class CursoController {
  private readonly logger = new Logger(CursoController.name)
  constructor(private readonly cursoService: CursoService) { }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a New Curso' })
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all Cursos ' })
  @Get()
  findAll() {
    return this.cursoService.findAll();
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find Curso by Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Curso By Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Curso By ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
