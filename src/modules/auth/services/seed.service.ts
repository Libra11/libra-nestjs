import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { PermissionGroup } from '../entities/permission-group.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(PermissionGroup)
    private permissionGroupRepository: Repository<PermissionGroup>,
  ) {}

  async onModuleInit() {
    await this.createSuperAdmin();
    // 创建权限组
    // await this.createPermissionGroup('菜单管理', 'menu');
    // await this.createPermissionGroup('用户管理', 'user');
    // await this.createPermissionGroup('角色管理', 'role');
    // await this.createPermissionGroup('权限管理', 'permission');
    // await this.createPermissionGroup('权限组管理', 'permission-group');

    await this.createPermission(
      {
        name: '为角色设置权限',
        code: 'role:setPermissions',
        description: 'api为角色设置权限',
        type: 'api',
      },
      3,
    );
  }

  private async createSuperAdmin() {
    // 检查是否已存在超级管理员
    const existingSuperAdmin = await this.userRepository.findOne({
      where: { username: 'superadmin' },
    });

    if (existingSuperAdmin) {
      return;
    }

    // 创建超级管理员角色
    const superAdminRole = await this.roleRepository.save({
      code: 'super_admin',
      name: '超级管理员',
      description: '系统超级管理员',
    });

    // 创建超级管理员用户
    const hashedPassword = await bcrypt.hash('123456', 10);
    const superAdmin = await this.userRepository.save({
      username: 'superadmin',
      password: hashedPassword,
      nickname: '超级管理员',
      isActive: true,
      roles: [superAdminRole],
    });

    console.log('超级管理员创建成功:', {
      username: superAdmin.username,
      password: '123456',
    });
  }

  private async createPermissionGroup(name: string, code: string) {
    const existing = await this.permissionGroupRepository.findOne({
      where: { code },
    });
    if (existing) return existing;
    return this.permissionGroupRepository.save({
      name,
      code,
      description: `${name}相关权限组`,
    });
  }

  // 创建权限
  private async createPermission(
    permission: Partial<Permission>,
    groupId: number,
  ) {
    const existing = await this.permissionRepository.findOne({
      where: { code: permission.code },
    });
    if (existing) return existing;
    return this.permissionRepository.save({
      ...permission,
      groupId,
    });
  }
}
