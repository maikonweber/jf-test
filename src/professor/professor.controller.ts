import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Request } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/localGuards';
import { RoleGuard } from 'src/auth/Guards/RoleGuard';
import { Roles } from 'src/auth/role.decorator';

@ApiTags('Professor Controller')
@Controller('professor')
export class ProfessorController {
  private readonly logger = new Logger(ProfessorController.name)
  constructor(private readonly professorService: ProfessorService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a New Professor' })
  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Get All Professor' })
  @Get()
  createCurso(@Request() req) {
    console.log(req.user)
    return this.professorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Get Professor by id' })
  @Get(':id')
  findOne(@Request() req) {
    return this.professorService.findOne(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Update Professor by Id' })
  @Patch('')
  update(@Request() req, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(req.user.id, updateProfessorDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("Professor")
  @ApiOperation({ summary: 'Get Delete Professor by Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }
}
