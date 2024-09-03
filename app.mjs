import 'dotenv/config';

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import documents from './docs.mjs';

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

app.post('/', async (req, res) => {
    const result = await documents.addOne(req.body);

    return res.redirect('/');
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const doc = await documents.getOne(id);
    console.log(doc);
    return res.render('doc', { doc: doc });
});

app.get('/', async (req, res) => {
    return res.render('index', { docs: await documents.getAll() });
});

app.put('/', async (req, res) => {
    console.log(req.body);

    /* const result = await documents.updateOne(req.body);

    return res.redirect(`/${result.lastID}`); */
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
