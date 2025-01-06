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
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';
import { Permissions } from '../../../common/decorator/permissions.decorator';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiResponseDecorator } from '../../../common/decorator/api-response.decorator';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { SetPermissionsDto } from '../dto/set-permissions.dto';

@ApiTags('角色管理')
@ApiBearerAuth('bearer')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Permissions('role:create')
  @ApiOperation({ summary: '创建角色' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponseDecorator(HttpStatus.OK, Role, '创建成功')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const { permissionIds, ...roleData } = createRoleDto;
    const role = await this.roleService.create(roleData);

    if (permissionIds?.length) {
      await this.roleService.setPermissions(role.id, permissionIds);
    }

    return this.roleService.findOne(role.id);
  }

  @Get()
  @Permissions('role:list')
  @ApiOperation({ summary: '获取所有角色' })
  @ApiResponseDecorator(HttpStatus.OK, Role, '获取成功', true)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Permissions('role:read')
  @ApiOperation({ summary: '获取角色详情' })
  @ApiResponseDecorator(HttpStatus.OK, Role, '获取成功')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @Permissions('role:update')
  @ApiOperation({ summary: '更新角色' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponseDecorator(HttpStatus.OK, Role, '更新成功')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions('role:delete')
  @ApiOperation({ summary: '删除角色' })
  @ApiResponseDecorator(HttpStatus.OK, null, '删除成功')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }

  @Post(':id/permissions')
  @Permissions('role:setPermissions')
  @ApiOperation({ summary: '设置角色权限' })
  @ApiResponseDecorator(HttpStatus.OK, Role, '设置成功')
  @ApiBody({ type: SetPermissionsDto })
  setPermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() setPermissionsDto: SetPermissionsDto,
  ) {
    return this.roleService.setPermissions(id, setPermissionsDto.permissionIds);
  }
}
