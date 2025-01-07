/*
 * @Author: Libra
 * @Date: 2025-01-03 16:27:03
 * @LastEditors: Libra
 * @Description: 权限服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(data: Partial<Permission>) {
    const permission = this.permissionRepository.create(data);
    return this.permissionRepository.save(permission);
  }

  async findAll() {
    return this.permissionRepository.find({
      relations: ['group'],
    });
  }

  async findByIds(ids: number[]) {
    return this.permissionRepository.find({
      where: { id: In(ids) },
      relations: ['group'],
    });
  }

  async update(id: number, data: Partial<Permission>) {
    await this.permissionRepository.update(id, data);
    return this.permissionRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.permissionRepository.delete(id);
  }
}
