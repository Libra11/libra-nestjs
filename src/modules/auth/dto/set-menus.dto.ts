import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SetMenusDto {
  @ApiProperty({ description: '菜单ID列表' })
  @IsArray()
  @IsNumber({}, { each: true })
  menuIds: number[];
}
