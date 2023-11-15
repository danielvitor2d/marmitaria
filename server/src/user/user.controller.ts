import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
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
    console.log(login);
    try {
      const res = await this.userService.checkLogin(login);
      return {
        isLogged: res,
      };
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

  @Post('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const response = await this.userService.update(id, updateUserDto);
      return {
        updated: response !== undefined,
      };
    } catch (error) {
      return {
        updated: null,
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
