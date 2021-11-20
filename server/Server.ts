import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
/* istanbul ignore next */
// @ts-ignore
if (global.__coverage__) {
    require("@cypress/code-coverage/middleware/express")(app);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));

app.use(cors({
    origin: [
      'http://localhost:8080',
      'https://localhost:8080',
      '*'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

/* istanbul ignore next */
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/* istanbul ignore next */
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    const viewsDir = path.join(__dirname, '../client');
    const staticDir = path.join(__dirname, '../client');

    app.set('views', viewsDir);
    app.use(express.static(staticDir));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile('index.html', {root: viewsDir});
    });
} else {
    app.get('*', (req: Request, res: Response) => {
        res.redirect(`http://${process.env.host}:8080`)
    });
}

// Export express instance
export default app;
