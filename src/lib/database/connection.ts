import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const query = async (dbFile: ArrayBuffer, queryString: string) => {
    const db = await initializeDB(dbFile);
    const columns: string[] = [];
    const rows: string[] = [];
    try {
        db.exec({
            sql: queryString,
            columnNames: columns,
            resultRows: rows,
        });
        return ({
            columns,
            rows,
        })
    } catch (e: unknown) {
        if (e instanceof Error)
            console.error(e.message);
        else
            console.error(String(e));
    }
    finally {
        db.close();
    }
};

const initializeDB = async (dbFile: ArrayBuffer) => {
    const sqlite3 = await sqlite3InitModule()
    try {
        const p = sqlite3.wasm.allocFromTypedArray(dbFile);
        const db = new sqlite3.oo1.DB();
        const rc = sqlite3.capi.sqlite3_deserialize(
            db.pointer, 'main', p, dbFile.byteLength, dbFile.byteLength,
            sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE);
        db.checkRc(rc);
        return db;
    } catch (e: unknown) {
        if (e instanceof Error)
            console.error(e.message);
        else
            console.error(String(e));
    }
}

export default query;