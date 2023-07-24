import query from './connection';

export const getTables = async (dbFile: ArrayBuffer) => {
    const queryString = 'SELECT name FROM sqlite_master WHERE type = \'table\'';
    const result = await query(dbFile, queryString);
    if (result) {
        const { columns, rows } = result;
        return (rows);
    }
};