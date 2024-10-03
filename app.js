require('dotenv/config');
const port = process.env.PORT || 3000;
const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');
const docs = require('./routes/docs.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const { openDb } = require('./db/database.js');
const app = express();
const { verifyToken } = require('./controllers/authentication.js');

app.disable('x-powered-by');

// don't show the log when it is test
/* if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
} */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/documents', verifyToken, docs);
app.use('/api/register', register);
app.use('/api/login', login);

openDb();

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = server;
