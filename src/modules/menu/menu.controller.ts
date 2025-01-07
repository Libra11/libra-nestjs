/*
 * @Author: Libra
 * @Date: 2025-01-06 16:05:33
 * @LastEditors: Libra
 * @Description: 菜单控制器
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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Permissions } from '../../common/decorator/permissions.decorator';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';

@ApiTags('菜单管理')
@ApiBearerAuth('bearer')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Permissions('menu:create')
  @ApiOperation({ summary: '创建菜单' })
  @ApiResponseDecorator(HttpStatus.OK, Menu, '创建成功')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @Permissions('menu:list')
  @ApiOperation({ summary: '获取菜单树' })
  @ApiResponseDecorator(HttpStatus.OK, Menu, '获取成功', true)
  findAll() {
    return this.menuService.findAll();
  }

  @Patch(':id')
  @Permissions('menu:update')
  @ApiOperation({ summary: '更新菜单' })
  @ApiResponseDecorator(HttpStatus.OK, Menu, '更新成功')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @Permissions('menu:delete')
  @ApiOperation({ summary: '删除菜单' })
  @ApiResponseDecorator(HttpStatus.OK, null, '删除成功')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }

  @Get(':id')
  @Permissions('menu:get')
  @ApiOperation({ summary: '获取菜单' })
  @ApiResponseDecorator(HttpStatus.OK, Menu, '获取成功')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }
}
