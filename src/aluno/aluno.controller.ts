import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Alunos Controller")
@Controller('aluno')
export class AlunoController {
  private readonly logger = new Logger(AlunoController.name)
  constructor(private readonly alunoService: AlunoService) { }
  @ApiOperation({ summary: 'Create a New Aluno' })
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @ApiOperation({ summary: 'Find all Alunos' })
  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @ApiOperation({ summary: 'Find Aluno by Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update Aluno By Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }
  @ApiOperation({ summary: 'Delete Aluno by Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}
