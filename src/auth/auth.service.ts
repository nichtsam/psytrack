import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, SignupDto } from './auth.dto';
import * as argon2 from 'argon2';
import { AuthError } from './auth.error';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(dto: SignupDto) {
    return this.userService.create({
      email: dto.email,
      hash: await this.hashPassword(dto.password),
    });
  }
  async login(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user || !(await this.verifyPassword(user.hash, dto.password))) {
      throw new AuthError('UNAUTHORIZED', 'Invalid username or password');
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  private async verifyPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
