import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { ILoggerContext } from './logger.js';
import { IMetricsContext } from './metrics.js';
import { ITracerContext } from './tracer.js';

export * from './logger.js';
export * from './metrics.js';
export * from './tracer.js';
export * from './error.js';

export type IMiddlewareContext =
  CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithIAMAuthorizer> &
    ILoggerContext &
    IMetricsContext &
    ITracerContext;
