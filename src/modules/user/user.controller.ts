/*
 * @Author: Libra
 * @Date: 2024-12-27 14:45:37
 * @LastEditors: Libra
 * @Description: 用户控制器
 */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';
import { User } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permissions } from '../../common/decorator/permissions.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('用户')
@ApiBearerAuth('bearer')
@UseGuards(RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions('user:list')
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponseDecorator(HttpStatus.OK, User, '获取成功', true)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Permissions('user:get')
  @ApiOperation({ summary: '获取指定用户' })
  @ApiResponseDecorator(HttpStatus.OK, User, '获取成功')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Permissions('user:update')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponseDecorator(HttpStatus.OK, User, '更新成功')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions('user:delete')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponseDecorator(HttpStatus.OK, null, '删除成功')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Post()
  @Permissions('user:create')
  @ApiOperation({ summary: '创建用户' })
  @ApiResponseDecorator(HttpStatus.OK, User, '创建成功')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
