import { ApiProperty } from '@nestjs/swagger';

export class CaptchaResDto {
  @ApiProperty({ description: '验证码ID' })
  id: string;

  @ApiProperty({ description: '验证码SVG图片' })
  image: string;
}
