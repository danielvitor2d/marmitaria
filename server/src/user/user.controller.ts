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
      const response = await this.userService.checkLogin(login);
      return response;
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
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
      return {
        updated: false,
        user: null,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
    }
  }
}
