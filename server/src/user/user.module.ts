import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UsersService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
