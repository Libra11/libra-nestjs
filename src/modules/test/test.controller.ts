/*
 * @Author: Libra
 * @Date: 2024-12-27 14:45:37
 * @LastEditors: Libra
 * @Description: 用户控制器
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HostParam,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { TestService } from './test.service';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ResponseData } from '../../common/decorator/response.decorator';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';
import { TestDto } from './dto/test.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorator/public.decorator';

// 路由前缀路径 test, 所以访问路径为 /test/string 和 /test/json
// @Controller('test')
@ApiTags('测试')
@Controller({ path: 'test', version: '1' })
export class TestController {
  constructor(private readonly testService: TestService) {}

  /**当请求处理程序返回 JavaScript 原始类型（例如，string、number、boolean）时，Nest 将只发送值，而不会尝试序列化它。 */
  @ApiOperation({ summary: '获取字符串', description: '返回一个简单的字符串' })
  @ApiResponseDecorator(HttpStatus.OK, null, '返回Hello World字符串')
  @Public()
  @Get('string')
  getHello() {
    return this.testService.getHello();
  }

  /**当请求处理程序返回 JavaScript 对象或数组时，它将自动序列化为 JSON。 */
  @ApiOperation({ summary: '获取JSON', description: '返回一个JSON对象' })
  @ApiResponseDecorator(HttpStatus.OK, TestDto, '返回JSON数据')
  @Public()
  @Get('json')
  getJson() {
    return this.testService.getJson();
  }

  /**@Req() req: Request 获取请求对象, 请求对象表示 HTTP 请求，并具有请求查询字符串、参数、HTTP 标头和正文的属性。在大多数情况下，没有必要手动获取这些属性。我们可以使用专用的装饰器来代替，例如 @Body（） 或 @Query（），它们是开箱即用的 */
  @ApiOperation({
    summary: '获取请求对象',
    description: '获取完整的请求对象信息',
  })
  @Public()
  @Get('req')
  getReq(@Req() req: Request) {
    return this.testService.getReq(req);
  }

  /**@Query() query: any 获取查询参数 */
  @ApiOperation({ summary: '获取查询参数', description: '获取URL中的查询参数' })
  @ApiQuery({ name: 'name', required: false, description: '用户名' })
  @ApiQuery({ name: 'age', required: false, description: '年龄' })
  @Public()
  @Get('query')
  getQuery(@Query() query: any) {
    return this.testService.getQuery(query);
  }

  /**@Param('id') id: string 获取路径参数, ParseIntPipe 将字符串转换为数字 */
  @ApiOperation({ summary: '获取路径参数', description: '获取URL中的路径参数' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @Public()
  @Get('param/:id')
  @ResponseData({ code: 200, message: '获取ID成功！' })
  getParam(@Param('id', ParseIntPipe) id: number) {
    return this.testService.getParam(id);
  }

  /**@Body() body: any 获取请求体, 需要 Post 请求 */
  @ApiOperation({
    summary: '获取请求体',
    description: '获取POST请求的请求体数据',
  })
  @ApiBody({ description: '用户数据' })
  @Public()
  @Post('body')
  @ResponseData({ code: 200, message: '获取请求体成功！' })
  getBody(@Body() body: any) {
    return this.testService.getBody(body);
  }

  /**@Header() header: any 获取请求头 */
  @ApiOperation({ summary: '获取请求头', description: '获取请求头信息' })
  @Public()
  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return this.testService.getHeaders(headers);
  }

  /**@Ip() ip: string 获取请求IP */
  @ApiOperation({ summary: '获取IP地址', description: '获取客户端IP地址' })
  @Public()
  @Get('ip')
  getIp(@Ip() ip: string) {
    return this.testService.getIp(ip);
  }

  /**@HostParam('host') host: string 获取主机参数 */
  @ApiOperation({ summary: '获取主机参数', description: '获取主机相关参数' })
  @Public()
  @Get('hostParam')
  getHostParam(@HostParam('host') host: string) {
    return this.testService.getHostParam(host);
  }

  /**@Patch() 获取 Patch 请求 */
  @ApiOperation({ summary: 'Patch请求', description: '处理Patch请求' })
  @Public()
  @Patch('patch')
  getPatch() {
    return this.testService.getPatch();
  }

  /**@Put() 获取 Put 请求 */
  @ApiOperation({ summary: 'Put请求', description: '处理Put请求' })
  @Public()
  @Put('put')
  getPut() {
    return this.testService.getPut();
  }

  /**@Delete() 获取 Delete 请求 */
  @ApiOperation({ summary: 'Delete请求', description: '处理Delete请求' })
  @Public()
  @Delete('delete')
  getDelete() {
    return this.testService.getDelete();
  }

  /**路由通配符 */
  @ApiOperation({ summary: '通配符路由', description: '演示通配符路由功能' })
  @Public()
  @Get('ab*cd')
  getWildcard() {
    return this.testService.getWildcard();
  }

  /**状态码 */
  @ApiOperation({
    summary: '自定义状态码',
    description: '返回自定义HTTP状态码',
  })
  @Public()
  @Get('status')
  @HttpCode(HttpStatus.NOT_FOUND)
  getStatus() {
    return this.testService.getStatus();
  }

  /**@Header() 设置响应头 */
  @ApiOperation({ summary: '自定义响应头', description: '设置自定义响应头' })
  @Public()
  @Get('header')
  @Header('Cache-Control', 'none')
  getHeader() {
    return this.testService.getHeader();
  }

  /**@Redirect() 重定向 */
  @ApiOperation({ summary: '重定向', description: '页面重定向示例' })
  @Public()
  @Get('redirect')
  @Redirect('https://www.baidu.com', 301)
  getRedirect() {
    return this.testService.getRedirect();
  }

  /**@Exception() 抛出异常 */
  @ApiOperation({ summary: '异常处理', description: '异常处理示例' })
  @Public()
  @Get('exception')
  getException() {
    return this.testService.getException();
  }

  /**@PaginationDto() 分页 */
  @ApiOperation({ summary: '分页', description: '分页示例' })
  @Public()
  @Get('pagination')
  getPagination(@Query() query: PaginationDto) {
    return this.testService.getPagination(query);
  }
}
