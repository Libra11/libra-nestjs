import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('menus')
@Tree('closure-table')
export class Menu {
  @ApiProperty({ description: '菜单ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '菜单名称' })
  @Column()
  name: string;

  @ApiProperty({ description: '路由路径' })
  @Column({ nullable: true })
  path: string;

  @ApiProperty({ description: '组件路径' })
  @Column({ nullable: true })
  component: string;

  @ApiProperty({ description: '菜单图标' })
  @Column({ nullable: true })
  icon: string;

  @ApiProperty({ description: '排序' })
  @Column({ default: 0 })
  sort: number;

  @ApiProperty({ description: '是否隐藏' })
  @Column({ default: false })
  hidden: boolean;

  @ApiProperty({ description: '父级菜单' })
  @TreeParent()
  parent: Menu;

  @ApiProperty({ description: '子菜单列表' })
  @TreeChildren()
  children: Menu[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}
