/*
 * @Author: Libra
 * @Date: 2024-12-27 15:30:06
 * @LastEditors: Libra
 * @Description: 用户服务
 */

import { Injectable } from '@nestjs/common';
import { BusinessException } from '../../common/exception/business.exception';
import { PaginationDto } from 'src/common/dto/pagination.dto';

const testData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
  {
    id: 3,
    name: 'Jim Doe',
    email: 'jim.doe@example.com',
  },
];

/**
 * 1. 告诉 Nest.js 这个类是可以被注入的
 * 2. 让 Nest.js 帮我们管理类的实例化和依赖关系
    // 控制器
    @Controller()
    class UserController {
      // Nest.js 会自动注入 UserService 的实例
      constructor(private userService: UserService) {}
    }
 */
@Injectable()
export class TestService {
  getHello() {
    return 'Hello World';
  }

  getJson() {
    return {
      message: 'Hello World',
    };
  }

  getReq(req: Request) {
    return {
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
    };
  }

  getQuery(query: any) {
    return query;
  }

  getParam(id: number) {
    return id;
  }

  getBody(body: any) {
    return body;
  }

  getHeaders(headers: any) {
    return headers;
  }

  getIp(ip: string) {
    return ip;
  }

  getHostParam(host: string) {
    return host;
  }

  getPatch() {
    return 'Patch';
  }

  getPut() {
    return 'Put';
  }

  getDelete() {
    return 'Delete';
  }

  getWildcard() {
    return 'Wildcard';
  }

  getStatus() {
    return 'Status';
  }

  getHeader() {
    return 'Header';
  }

  getRedirect() {
    return 'Redirect';
  }

  getException() {
    throw new BusinessException('This is a test exception');
  }

  getPagination(query: PaginationDto) {
    const { page, limit } = query;
    const start = (page - 1) * limit;
    const end = start + limit;
    return testData.slice(start, end);
  }
}
