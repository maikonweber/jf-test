import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../JwtContants';
import { professor } from '@prisma/client';
import { ProfessorService } from 'src/professor/professor.service';
import { AlunoService } from 'src/aluno/aluno.service';

@Injectable()
export class JwtStrategyAluno extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger(JwtStrategyAluno.name);
    constructor(private readonly authService: AuthService, private readonly alunoService: AlunoService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<any> {
        const { usecase, username } = payload;

        if (usecase === 'Aluno') {
            const user = await this.alunoService.findByUsername(username);
            if (user) {
                return user
            }
        }

        throw new UnauthorizedException('Invalid user or usecase');
    }
}