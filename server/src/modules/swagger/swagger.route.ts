import { Router, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "REST API Docs",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/**/*routes.*', './src/app.*'],
};

const swaggerSpec = swaggerJsdoc(options);

const docsRouter = Router();

// Docs in JSON format
docsRouter.get('/json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Swagger page
docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default docsRouter;