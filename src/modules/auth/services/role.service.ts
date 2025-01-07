/*
 * @Author: Libra
 * @Date: 2025-01-03 16:27:06
 * @LastEditors: Libra
 * @Description: 角色服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { In } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Menu)
    private menuRepository: TreeRepository<Menu>,
  ) {}

  async create(data: Partial<Role>) {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      relations: ['permissions', 'menus'],
    });

    // 转换每个角色的菜单为树形结构
    for (const role of roles) {
      if (role.menus?.length) {
        const menuIds = role.menus.map((menu) => menu.id);
        role.menus = await this.getMenuTree(menuIds);
      }
    }

    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'menus'],
    });

    if (role?.menus?.length) {
      const menuIds = role.menus.map((menu) => menu.id);
      role.menus = await this.getMenuTree(menuIds);
    }

    return role;
  }

  async update(id: number, data: Partial<Role>) {
    await this.roleRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.roleRepository.delete(id);
  }

  async setPermissions(id: number, permissionIds: number[]) {
    const role = await this.findOne(id);
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds),
    });
    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async setMenus(id: number, menuIds: number[]) {
    const role = await this.findOne(id);
    const menus = await this.menuRepository.findBy({
      id: In(menuIds),
    });
    role.menus = menus;
    return this.roleRepository.save(role);
  }

  // 获取树形菜单
  private async getMenuTree(menuIds: number[]) {
    // 先获取所有菜单的树形结构
    const allMenus = await this.menuRepository.findTrees();

    // 过滤出角色拥有的菜单
    const filterMenuTree = (menus: Menu[]) => {
      return menus
        .filter((menu) => menuIds.includes(menu.id))
        .map((menu) => ({
          ...menu,
          children: menu.children ? filterMenuTree(menu.children) : [],
        }))
        .filter(
          (menu) => menu.children.length > 0 || menuIds.includes(menu.id),
        );
    };

    return filterMenuTree(allMenus);
  }
}
