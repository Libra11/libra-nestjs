import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionGroup } from './permission-group.entity';

@Entity('permissions')
export class Permission {
  @ApiProperty({ description: '权限ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '权限代码' })
  @Column({ length: 100, unique: true })
  code: string;

  @ApiProperty({ description: '权限名称' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: '权限描述' })
  @Column({ length: 200, nullable: true })
  description: string;

  @ApiProperty({ description: '权限类型', example: 'menu' })
  @Column({ length: 50 })
  type: string; // menu, button, api 等

  @ManyToOne(() => PermissionGroup, (group) => group.permissions)
  @JoinColumn({ name: 'group_id' })
  @ApiProperty({ description: '所属权限组' })
  group: PermissionGroup;

  @Column({ name: 'group_id' })
  groupId: number;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}
