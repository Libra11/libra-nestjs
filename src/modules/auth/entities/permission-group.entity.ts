import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './permission.entity';

@Entity('permission_groups')
export class PermissionGroup {
  @ApiProperty({ description: '权限组ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '权限组代码' })
  @Column({ length: 100, unique: true })
  code: string;

  @ApiProperty({ description: '权限组名称' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: '权限组描述' })
  @Column({ length: 200, nullable: true })
  description: string;

  @OneToMany(() => Permission, (permission) => permission.group)
  @ApiProperty({
    description: '权限列表',
    type: () => Permission,
    isArray: true,
  })
  permissions: Permission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
