import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UsersService {
  constructor(private readonly redisService: RedisService) {}

  async findOne(username: string): Promise<any | undefined> {
    const client = this.redisService.getClient();
    const user = await client.hgetall(`user:${username}`);
    return user.username ? user : null;
  }

  async create(user: any): Promise<any> {
    const client = this.redisService.getClient();
    await client.hmset(`user:${user.username}`, user);
    return user;
  }
}