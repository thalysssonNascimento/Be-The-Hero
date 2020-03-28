import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import routes from './routes';

class App {
    constructor() {
        this.server = express();
        this.server.use(cors());
        this.server.use(helmet());
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
        this.server.use(errors());
    }
}

export default new App().server;
