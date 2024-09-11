import 'dotenv/config';

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import docs from './routes/docs.mjs';

const app = express();

app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), 'public')));

// don't show the log when it is test
/* if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
} */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', docs);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
