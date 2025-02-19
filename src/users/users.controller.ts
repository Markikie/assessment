import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users') // จัดกลุ่ม API
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto }) // ใช้ DTO กำหนด body
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
