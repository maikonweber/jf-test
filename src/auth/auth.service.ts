import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlunoService } from 'src/aluno/aluno.service';
import { ProfessorService } from 'src/professor/professor.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly jwtService: JwtService,
        private readonly alunoService: AlunoService,
        private readonly professorService: ProfessorService) { }

    async loginIn(username) {
        this.logger.log(username)
        const professor = await this.professorService.findByUsername(username)
        this.logger.log(professor)
        if (!professor) throw new NotAcceptableException('could not find the user')
        const access_token: string = await this.jwtService.signAsync({
            username: professor.nome,
            usecase: "Professor"
        });

        return access_token
    }
}