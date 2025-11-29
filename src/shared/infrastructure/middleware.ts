import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { OpenAPIHono } from '@hono/zod-openapi';

export function setupMiddleware(app: OpenAPIHono) {
  app.use('*', logger());
  app.use('*', cors());
}