import 'dotenv/config';

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import docs from './routes/docs.mjs';
import openDb from './db/database.mjs';
const app = express();

app.disable('x-powered-by');

// don't show the log when it is test
/* if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
} */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/documents', docs);

openDb();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
