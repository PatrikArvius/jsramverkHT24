const mongoose = require('mongoose');

async function openDb() {
    const env = process.env.NODE_ENV || 'production';
    let dbURI =
        env === 'test' ? process.env.MONGOURI_TEST : process.env.MONGOURI_PROD;

    await mongoose.connect(dbURI);
    console.log(`Connected to ${env} database`);
}

async function closeDb() {
    await mongoose.connection.close();
}

module.exports = { openDb, closeDb };
