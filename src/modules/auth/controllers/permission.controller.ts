/*
 * @Author: Libra
 * @Date: 2025-01-03 16:27:10
 * @LastEditors: Libra
 * @Description: 权限控制器
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { Permissions } from '../../../common/decorator/permissions.decorator';
import { ApiResponseDecorator } from 'src/common/decorator/api-response.decorator';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@ApiTags('权限管理')
@ApiBearerAuth('bearer')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Permissions('permission:create')
  @ApiOperation({ summary: '创建权限' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponseDecorator(HttpStatus.OK, Permission, '创建成功')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @Permissions('permission:list')
  @ApiOperation({ summary: '获取所有权限' })
  @ApiResponseDecorator(HttpStatus.OK, Permission, '获取成功', true)
  findAll() {
    return this.permissionService.findAll();
  }

  @Patch(':id')
  @Permissions('permission:update')
  @ApiOperation({ summary: '更新权限' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Permission>,
  ) {
    return this.permissionService.update(id, data);
  }

  @Delete(':id')
  @Permissions('permission:delete')
  @ApiOperation({ summary: '删除权限' })
  @ApiResponseDecorator(HttpStatus.OK, Permission, '删除成功')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.remove(id);
  }
}
