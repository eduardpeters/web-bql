import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const start = (sqlite3, dbFile) => {
    console.log('Running SQLite3 version', sqlite3.version.libVersion);
    const p = sqlite3.wasm.allocFromTypedArray(dbFile);
    const db = new sqlite3.oo1.DB();
    const rc = sqlite3.capi.sqlite3_deserialize(
        db.pointer, 'main', p, dbFile.byteLength, dbFile.byteLength,
        sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE);
    db.checkRc(rc);
    console.log('Loaded transient database', db.filename);
    const columns = [];
    const results = [];
    try {
        console.log('Query data with exec()...');
        db.exec({
            sql: 'SELECT name FROM sqlite_master',
            columnNames: columns,
            resultRows: results,
        });
        console.log(columns);
        console.log(results);
        db.exec({
            sql: 'SELECT * FROM people LIMIT 5',
            columnNames: columns,
            resultRows: results,
            callback: (row) => {
                console.log(row);
            },
        });
        console.log(columns);
        console.log(results);
    } finally {
        db.close();
    }
};

const initializeDB = (dbFile) => {
    sqlite3InitModule()
        .then((sqlite3) => {
            try {
                console.log('Initialized, run demo');
                start(sqlite3, dbFile);
            } catch (e) {
                console.error(e.message);
            }
        })
}

export default initializeDB;