import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginPayload } from './interfaces/login';
import { UsersService } from './user.service';

@Controller({ path: 'users', version: '1.0' })
export class UserController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly userService: UsersService) {}

  @Post('/session')
  async login(@Body() login: LoginPayload) {
    try {
      const r = await this.userService.checkLogin(login);
      return r;
    } catch (error) {
      this.logger.error(`could not login due to error: ${error}`);
      return {
        logged: false,
        user: null,
      };
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.userService.create(createUserDto);
      return {
        registered: response !== undefined,
      };
    } catch (error) {
      this.logger.error(`could not create a new user due to error: ${error}`);
      return {
        registered: null,
      };
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      this.logger.error(`could not update user due to error: ${error}`);
      return {
        updated: false,
        user: null,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
    }
  }
}
