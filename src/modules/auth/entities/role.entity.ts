/*
 * @Author: Libra
 * @Date: 2025-01-03 16:21:25
 * @LastEditors: Libra
 * @Description:
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({ description: '角色ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '角色代码' })
  @Column({ length: 100, unique: true })
  code: string;

  @ApiProperty({ description: '角色名称' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: '角色描述' })
  @Column({ length: 200, nullable: true })
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  @ApiProperty({
    description: '权限列表',
    type: () => Permission,
    isArray: true,
  })
  permissions: Permission[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}
