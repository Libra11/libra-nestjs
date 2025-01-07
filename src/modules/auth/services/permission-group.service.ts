/*
 * @Author: Libra
 * @Date: 2025-01-03 17:05:18
 * @LastEditors: Libra
 * @Description: 权限组服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionGroup } from '../entities/permission-group.entity';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionGroupDto } from '../dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from '../dto/update-permission-group.dto';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectRepository(PermissionGroup)
    private permissionGroupRepository: Repository<PermissionGroup>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(data: CreatePermissionGroupDto) {
    const { permissionIds, ...groupData } = data;
    const group = this.permissionGroupRepository.create(groupData);

    if (permissionIds?.length) {
      const permissions = await this.permissionRepository.findByIds(
        permissionIds,
      );
      group.permissions = permissions;
    }

    return this.permissionGroupRepository.save(group);
  }

  async findAll() {
    return this.permissionGroupRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number) {
    return this.permissionGroupRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async update(id: number, data: UpdatePermissionGroupDto) {
    const { permissionIds, ...groupData } = data;
    const group = await this.findOne(id);
    return this.permissionGroupRepository.save({ ...group, ...groupData });
  }

  async delete(id: number) {
    return this.permissionGroupRepository.delete(id);
  }
}
