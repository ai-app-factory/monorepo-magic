import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { ILoggerContext } from './logger.js';
import { IMetricsContext } from './metrics.js';
import { ITracerContext } from './tracer.js';
import { IDynamoDBContext } from './dynamodb.js';

export * from './logger.js';
export * from './metrics.js';
export * from './tracer.js';
export * from './error.js';
export * from './dynamodb.js';

export type IMiddlewareContext =
  CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithIAMAuthorizer> &
    IDynamoDBContext &
    ILoggerContext &
    IMetricsContext &
    ITracerContext;
