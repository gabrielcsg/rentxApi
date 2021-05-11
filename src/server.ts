import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { routes } from './routes';
import swaggerFile from './swagger.json';


const server = express();

server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(routes);


server.listen(3335, () => console.log('Server running on: 3335'));
