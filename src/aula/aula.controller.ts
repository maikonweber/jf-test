import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Aulas Controller")
@Controller('aula')
export class AulaController {
  private readonly logger = new Logger(AulaController.name)
  constructor(private readonly aulaService: AulaService) { }

  @ApiOperation({ summary: 'Create a New Aula ' })
  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @ApiOperation({ summary: 'Find all Aulas' })
  @Get()
  findAll() {
    return this.aulaService.findAll();
  }

  @ApiOperation({ summary: 'Find Aulas by Id ' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aulaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Aulas By Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(+id, updateAulaDto);
  }

  @ApiOperation({ summary: 'Delete Aulas By Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aulaService.remove(+id);
  }
}
