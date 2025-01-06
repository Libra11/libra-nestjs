/*
 * @Author: Libra
 * @Date: 2025-01-03 16:27:06
 * @LastEditors: Libra
 * @Description: 角色服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { In } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(data: Partial<Role>) {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async findAll() {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
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
}
