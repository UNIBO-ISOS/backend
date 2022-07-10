import express from 'express';
import { router as fooRoute } from './components/foo/foo.routes';


const router = express.Router();

router.use(fooRoute);

export { router };