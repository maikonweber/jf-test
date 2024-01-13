import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty()
  username: string
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private readonly authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {

    return await this.authService.loginIn(body.username);
    // return "Teste Controller"
  }
}