import query from './connection';

export const getDbBlocks = async (dbFile: ArrayBuffer) => {
    const tables = await getTables(dbFile);
    return (await Promise.all<any>(tables?.map(async (table) => {
        const columnNames = await getColumns(dbFile, table);
        const blockColumns = columnNames?.map((name) => ({
            name: name,
            type: "column",
        }));
        return {
            name: table,
            type: "table",
            columns: blockColumns,
        };
    })));
};

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