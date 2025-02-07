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
import { Menu } from '../../menu/entities/menu.entity';

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

  @ApiProperty({ description: '权限列表' })
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ApiProperty({ description: '菜单列表' })
  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'role_menus',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
  })
  menus: Menu[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}
