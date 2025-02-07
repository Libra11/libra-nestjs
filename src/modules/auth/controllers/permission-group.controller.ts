/*
 * @Author: Libra
 * @Date: 2025-01-03 17:02:21
 * @LastEditors: Libra
 * @Description: 权限组控制器
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGroupService } from '../services/permission-group.service';
import { CreatePermissionGroupDto } from '../dto/create-permission-group.dto';
import { ApiResponseDecorator } from '../../../common/decorator/api-response.decorator';
import { PermissionGroup } from '../entities/permission-group.entity';
import { Permissions } from '../../../common/decorator/permissions.decorator';
import { UpdatePermissionGroupDto } from '../dto/update-permission-group.dto';

@ApiTags('权限组管理')
@ApiBearerAuth('bearer')
@Controller('permission-groups')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Post()
  @Permissions('permission-group:create')
  @ApiOperation({ summary: '创建权限组' })
  @ApiBody({ type: CreatePermissionGroupDto })
  @ApiResponseDecorator(HttpStatus.OK, PermissionGroup, '创建成功')
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Get()
  @Permissions('permission-group:list')
  @ApiOperation({ summary: '获取所有权限组' })
  @ApiResponseDecorator(HttpStatus.OK, PermissionGroup, '获取成功', true)
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(':id')
  @Permissions('permission-group:get')
  @ApiOperation({ summary: '获取权限组详情' })
  @ApiResponseDecorator(HttpStatus.OK, PermissionGroup, '获取成功')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionGroupService.findOne(id);
  }

  @Patch(':id')
  @Permissions('permission-group:update')
  @ApiOperation({ summary: '更新权限组' })
  @ApiResponseDecorator(HttpStatus.OK, PermissionGroup, '更新成功')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Delete(':id')
  @Permissions('permission-group:delete')
  @ApiOperation({ summary: '删除权限组' })
  @ApiResponseDecorator(HttpStatus.OK, PermissionGroup, '删除成功')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.permissionGroupService.delete(id);
  }
}
