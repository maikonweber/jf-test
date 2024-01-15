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
  @Post('loginProfessor')
  @ApiBody({ type: LoginDto })
  async loginProfessor(@Body() body: LoginDto) {

    return await this.authService.loginIn(body.username);
    // return "Teste Controller"
  }

  @HttpCode(HttpStatus.OK)
  @Post('loginAluno')
  @ApiBody({ type: LoginDto })
  async loginAluno(@Body() body: LoginDto) {
    return await this.authService.loginAluno(body.username)

  }
}