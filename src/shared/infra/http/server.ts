import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { routes } from './routes';
import swaggerFile from '../../../swagger.json';

import createConnection from '../typeorm';
import '../../container';
import { AppError } from '../../errors/AppError';

createConnection();
const server = express();

server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(routes);

// tratamento de erros
server.use(
  (err: Error, _request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error: - ${err.message}`,
    });
  },
);

server.listen(3333, () => console.log('Server running on: 3333'));
