import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())

        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const { usecase } = request.user
            if (roles.includes(usecase)) {
                return true;
            }
        }

        console.log(roles, "roles")

        return false

    }

}