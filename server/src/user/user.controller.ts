import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginPayload } from './interfaces/login';
import { UsersService } from './user.service';

@Controller({ path: 'users', version: '1.0' })
export class UserController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      this.logger.error(`could not create a new user due to error: ${error}`);
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

  @Post('/session')
  async login(@Body() login: LoginPayload) {
    try {
      const res = await this.userService.checkLogin(login);
      console.log(res);
      return {
        isLogged: res,
      };
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
    }
  }
}
