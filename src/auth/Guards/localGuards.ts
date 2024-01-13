import {
    Injectable,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
        return user;
    }
}