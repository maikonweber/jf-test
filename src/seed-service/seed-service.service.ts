import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class SeedServiceService {
    constructor(private readonly prismaService: PrismaService) {

    }

    async seed() {
        await this.prismaService.professor.create({
            data: {
                nome: "gilberto",
                username: "gilbertosilva"
            }
        }
        );
        await this.prismaService.aluno.create({
            data: {
                nome: "maikon",
                username: "maikonweber"
            }
        });

        await this.prismaService.aluno.create({
            data: {
                nome: "rayra",
                username: "rayraweber"
            }
        })
    }
}
