import {
    Injectable,
    ExecutionContext,
    ForbiddenException,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name)
    canActivate(context: ExecutionContext) {

        const httpContext = context.switchToHttp();
        if (httpContext.getRequest) {
            const request = httpContext.getRequest();

            const authHeader = request.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new ForbiddenException('Invalid or missing Bearer token');
            }


        }

        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw err || new ForbiddenException();
        }
        console.log(user)
        const roles = user.usecase; // Assumindo que a informação de roles está no objeto do usuário

        // Se o usuário tiver a role "aluno" ou "professor", permitir o acesso
        if (roles.includes('Professor') || roles.includes("Aluno")) {
            return user;
        } else {
            throw new ForbiddenException('Access denied: Insufficient privileges');
        }


        return user;
    }
}