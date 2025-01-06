import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SetPermissionsDto {
  @ApiProperty({ description: '权限ID列表', type: [Number] })
  @IsArray()
  permissionIds: number[];
}
