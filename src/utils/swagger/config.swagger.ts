import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import swaggerJSDoc from 'swagger-jsdoc';
import express, { Request, Response } from 'express';
const server = express();

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Training HDwebsoft',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const swaggerConfig = (expr: typeof server) => {
    expr.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    expr.get('/swagger.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
};
