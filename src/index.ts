import express, { Express, Request, Response, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import util from 'util';

// import API
import { router as api } from "./api/index"

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

app.use(api);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(500).json({ error: 'Internal server error' })
}
app.use(errorHandler)

process.on('unhandledRejection', (reason, promise) => {
    const promiseString = util.inspect(promise, true);
    const reasonString = util.inspect(reason, true);
    const log = util.format('LOG: Unhandled rejection at %s reason %s', promiseString, reasonString)
    console.log(log)
})

process.on('uncaughtException', (error, origin) => {
    const errorString = util.inspect(error, true);
    const log = util.format('LOG: Caught exception: %s\n Exception origin: %s', errorString, origin)
    console.log(log)
})

app.listen(port, () => {
    console.log(`Running on ${port} (ACMEat API)`);
})