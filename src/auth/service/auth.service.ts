import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignupCredentialsDto } from '../dto/signup-credentials.dto';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    setTimeout((): void => {
      this.setupTestUser();
    }, 5000);
  }

  private async setupTestUser() {
    const users = await this.userRepository.find();

    if (!users || !Array.isArray(users) || users.length === 0) {
      await this.signUp({
        username: 'test',
        password: 'testUserPass',
      });
    }
  }

  async signUp(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    const resp = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = resp;
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user: resp,
    };
  }
}
