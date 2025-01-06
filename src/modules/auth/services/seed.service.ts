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
}
