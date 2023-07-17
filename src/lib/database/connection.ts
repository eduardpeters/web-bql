import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const start = (sqlite3) => {
    console.log('Running SQLite3 version', sqlite3.version.libVersion);
    const db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
    console.log('Created transient database', db.filename);

    try {
        console.log('Creating a table...');
        db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
        console.log('Insert some data using exec()...');
        for (let i = 20; i <= 25; ++i) {
            db.exec({
                sql: 'INSERT INTO t(a,b) VALUES (?,?)',
                bind: [i, i * 2],
            });
        }
        console.log('Query data with exec()...');
        db.exec({
            sql: 'SELECT * FROM t ORDER BY a LIMIT 3',
            callback: (row) => {
                console.log(row);
            },
        });
    } finally {
        db.close();
    }
};

const initializeDB = () => {
    sqlite3InitModule()
        .then((sqlite3) => {
            try {
                console.log('Initialized, run demo');
                start(sqlite3);
            } catch (e) {
                console.error(e.message);
            }
        })
}

export default initializeDB;