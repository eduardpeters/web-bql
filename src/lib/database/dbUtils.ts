import type { BlockContent } from '$lib/appTypes';
import query from './connection';

export const getDbBlocks = async (dbFile: ArrayBuffer) => {
    const blocks: BlockContent[] = [];
    const tables = await getTables(dbFile);
    tables?.forEach(async (table) => {
        blocks.push({
            id: `${table}-t-${Math.round(Math.random() * 1000)}`,
            name: table,
            type: "table",
        });
        const columns = await getColumns(dbFile, table);
        columns?.forEach((column) => {
            blocks.push({
                id: `${column}-c-${Math.round(Math.random() * 1000)}`,
                name: column,
                type: "column",
            })
        });
    });
    console.log(blocks);
    return blocks;
}

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