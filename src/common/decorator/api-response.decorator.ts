/*
 * @Author: Libra
 * @Date: 2025-01-02 15:42:48
 * @LastEditors: Libra
 * @Description: 响应装饰器
 */
import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { HttpResponse } from '../interface/http-response.interface';

export const ApiResponseDecorator = <TModel extends Type<any>>(
  status: HttpStatus,
  model?: TModel,
  description?: string,
) => {
  if (!model) {
    return applyDecorators(
      ApiResponse({
        status,
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(HttpResponse) },
            {
              properties: {
                code: { type: 'number', example: status },
                message: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                path: { type: 'string' },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(
    ApiExtraModels(HttpResponse, model),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              code: { type: 'number', example: status },
              message: { type: 'string' },
              data: { $ref: getSchemaPath(model) },
              timestamp: { type: 'string', format: 'date-time' },
              path: { type: 'string' },
            },
          },
        ],
      },
    }),
  );
};
