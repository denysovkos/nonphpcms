const sqlite3 = require('sqlite3').verbose();
// const mssql = require('mssql');
// Replace sqllite to mssql (MS SQL Server)

const fs = require('fs');

const routes = require('../../router');

const setUpDBStorageFile = async () => {
    try {
        fs.openSync('./db/database.db', 'wx');
    } catch (err) {
        console.error(/EEXIST/.test(err.message) ? 'DB Already exists' : err.message);
    }
}

const setUpDbConnection = async (app) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
              reject();
              process.exit(1);
            }
    
            console.log('Connected to the database.');
            resolve();
        });

        app.db = db;
    })
}

const checkDBTables = async (app) => {
    const files = fs.readdirSync('./core/db/tables');

    for await (const file of files) {
        const table = require(`../../core/db/tables/${file}`)
        try {
            await table(app)
            console.log(`Table from ${file} created`)
        } catch (err) {
            console.log(err)
        }
    }

}

const setUpRoutes = async (app) => {
    await routes(app);
}

async function* init(app) {
    yield await setUpDBStorageFile()
    yield await setUpDbConnection(app)
    yield await checkDBTables(app)
    yield await setUpRoutes(app)

    console.log('All setup done, lets ROCK! \n\n')
}

module.exports = async (app) => {
    console.log('==== NON PHP CMS ====')
    for await (const step of init(app)) {
        // if need to do something on steps -> here is should be done
    }
}