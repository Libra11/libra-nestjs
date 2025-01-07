import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: TreeRepository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = this.menuRepository.create(createMenuDto);

    if (createMenuDto.parentId) {
      const parent = await this.menuRepository.findOne({
        where: { id: createMenuDto.parentId },
      });
      menu.parent = parent;
    }

    return this.menuRepository.save(menu);
  }

  async findAll() {
    return this.menuRepository.findTrees({
      relations: ['parent'],
    });
  }

  async findOne(id: number) {
    return this.menuRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMenuDto: Partial<Menu>) {
    const menu = await this.findOne(id);
    Object.assign(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    return this.menuRepository.remove(menu);
  }
}
