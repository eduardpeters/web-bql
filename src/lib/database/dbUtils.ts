import query from './connection';

export const getTables = async (dbFile: ArrayBuffer) => {
    const queryString = 'SELECT name FROM sqlite_master WHERE type = \'table\'';
    const result = await query(dbFile, queryString);
    if (result) {
        const tableNames = result.rows.map(name => name[0]);
        return (tableNames);
    }
};

export const getColumns = async (dbFile: ArrayBuffer, tableName: string) => {
    const queryString = `SELECT * FROM ${tableName} LIMIT 0`;
    const result = await query(dbFile, queryString);
    if (result) {
        const { columns, rows } = result;
        return (columns);
    }
}