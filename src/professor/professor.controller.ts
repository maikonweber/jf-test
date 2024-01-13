import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Professor Controller')
@Controller('professor')
export class ProfessorController {
  private readonly logger = new Logger(ProfessorController.name)
  constructor(private readonly professorService: ProfessorService) { }

  @ApiOperation({ summary: 'Create a New Professor' })
  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @ApiOperation({ summary: 'Get All Professor' })
  @Get()
  createCurso() {
    return this.professorService.findAll();
  }

  @ApiOperation({ summary: 'Get Professor by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Professor by Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @ApiOperation({ summary: 'Get Delete Professor by Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }
}
