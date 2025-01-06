import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.permissionRepository.find();
  }

  async findByIds(ids: number[]) {
    return this.permissionRepository.findByIds(ids);
  }

  async update(id: number, data: Partial<Permission>) {
    await this.permissionRepository.update(id, data);
    return this.permissionRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.permissionRepository.delete(id);
  }
}
