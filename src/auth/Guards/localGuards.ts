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
        console.log(context)
        const httpContext = context.switchToHttp();
        if (httpContext.getRequest) {
            const request = httpContext.getRequest();
            console.log(request.headers)
            const authHeader = request.headers.authorization;
            this.logger.log(authHeader)
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
        return user;
    }
}