import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const query = async (dbFile, queryString) => {
    const db = await initializeDB(dbFile);
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
        console.log(queryString);
        db.exec({
            sql: queryString,
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

const initializeDB = async (dbFile) => {
    const sqlite3 = await sqlite3InitModule()
    try {
        console.log('Initialized, run demo');
        console.log('Running SQLite3 version', sqlite3.version.libVersion);
        const p = sqlite3.wasm.allocFromTypedArray(dbFile);
        const db = new sqlite3.oo1.DB();
        const rc = sqlite3.capi.sqlite3_deserialize(
            db.pointer, 'main', p, dbFile.byteLength, dbFile.byteLength,
            sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE);
        db.checkRc(rc);
        return db;
    } catch (e) {
        console.error(e.message);
    }
}

export default query;