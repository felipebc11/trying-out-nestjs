import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService} from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards()
  @Post()
  async addUser(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.usersService.create(
      email,
      username,
      password
    );
    return { id: generatedId._id};
  }

  @UseGuards()
  @Get('findByUsername')
  async findOne(
    @Body('username') userId: string,
  ){
    return this.usersService.findOne(userId);
  }
}
