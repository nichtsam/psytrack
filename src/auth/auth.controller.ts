import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { UserError } from 'src/user/user.error';
import { AuthError } from './auth.error';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({
    status: 201,
    description: 'Sucessfully Signed Up',
    example: { accessToken: 'token' },
  })
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto).catch((err) => {
      if (err instanceof UserError) {
        if (err.code === 'EMAIL_ALREADY_USED') {
          throw new ConflictException(err.message);
        }
      }

      throw err;
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Sucessfully Loged In',
    example: { accessToken: 'token' },
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto).catch((err) => {
      if (err instanceof AuthError) {
        if (err.code === 'UNAUTHORIZED') {
          throw new UnauthorizedException(err.message);
        }
      }
    });
  }
}
