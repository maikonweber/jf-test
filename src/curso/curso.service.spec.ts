import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { PrismaService } from 'prisma/PrismaService';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';


const mockPrismaService = {
  curso: {
    create: jest.fn(),
    findMany: jest.fn(),
    
  },
  curso_aluno: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
  },
  aula_aluno: {
    findMany: jest.fn(),
  },
 
};

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CursoService>(CursoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new curso', async () => {
      const createCursoDto: CreateCursoDto = {
        nome: '',
        description: '',
        banner: ''
      };

      await service.create(createCursoDto);

      expect(mockPrismaService.curso.create).toHaveBeenCalledWith({
        data: createCursoDto,
      });
    });
  });


  describe('findAll', () => {
    it('should return an array of cursos', async () => {
      const result = [{ /* provide necessary data for the test */ }];

      mockPrismaService.curso.findMany.mockResolvedValue(result);

      const cursos = await service.findAll();

      expect(cursos).toEqual(result);
      expect(mockPrismaService.curso.findMany).toHaveBeenCalled();
    });
  });

});
