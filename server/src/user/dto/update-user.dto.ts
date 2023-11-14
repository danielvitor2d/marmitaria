import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Omit<CreateUserDto, 'pwd'>;
