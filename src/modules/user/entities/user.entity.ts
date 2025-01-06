import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/entities/role.entity';

@Entity('users')
export class User {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ length: 100, unique: true })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ length: 100, select: false })
  password: string;

  @ApiProperty({ description: '昵称' })
  @Column({ length: 100, nullable: true })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 100, nullable: true })
  email: string;

  @ApiProperty({ description: '头像' })
  @Column({ length: 200, nullable: true })
  avatar: string;

  @ApiProperty({ description: '是否启用' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
