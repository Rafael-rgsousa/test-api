import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entity/user.entity';

import { UserInfo } from '../entity/user-info.entity';
import { UserInfoRepository } from '../repository/user-info.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoRepository)
    private userInfoRepository: UserInfoRepository,
  ) {}

  async getUser(user: User): Promise<UserInfo> {
    const userInfo = await this.userInfoRepository.findOne({
      where: { id: user.user_info.id },
    });

    if (!userInfo) {
      throw new NotFoundException('User not found.');
    }
    return userInfo;
  }
}
