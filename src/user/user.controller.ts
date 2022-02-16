import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/entity/user.entity';

import { userInfoData } from './interface/user-info.interface';
import { UserService } from './service/user.service';

// < -- Swagger Implementation Start -- >
@ApiTags('User')
@ApiBearerAuth()
// < -- Swagger Implementation End -- >
@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserInfo(@GetUser() user: User): Promise<userInfoData> {
    return this.userService.getUser(user);
  }
}
