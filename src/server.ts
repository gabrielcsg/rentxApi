import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes'
import swaggerFile from './swagger.json'

import './database'
import './shared/container'

const server = express()

server.use(express.json())
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
server.use(routes)

server.listen(3333, () => console.log('Server running on: 3333'))
