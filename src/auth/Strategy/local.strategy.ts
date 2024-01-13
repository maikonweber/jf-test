import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../JwtContants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger();
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(username: string): Promise<any> {
        const user = await this.authService.loginIn(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}