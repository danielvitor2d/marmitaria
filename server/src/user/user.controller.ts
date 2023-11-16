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

  @Patch('/:id/favorite/add/:rest_id')
  async addFavorite(
    @Param('id') id: string,
    @Param('rest_id') rest_id: string,
  ) {
    const user = await this.userService.addFavorite(id, rest_id);

    return {
      success: user !== undefined,
    };
  }

  @Patch('/:id/favorite/rmv/:rest_id')
  async rmvFavorite(
    @Param('id') id: string,
    @Param('rest_id') rest_id: string,
  ) {
    const user = await this.userService.rmvFavorite(id, rest_id);

    return {
      success: user !== undefined,
    };
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

  @Get('/:id')
  async get(@Param('id') id: string) {
    try {
      const user = await this.userService.get(id);
      return {
        user: {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          pwd: user.pwd,
          favorites: user.favorites.map((fav) => fav.toString()),
        },
      };
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
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
