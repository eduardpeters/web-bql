import { BlockTypes, type BlockContent } from '$lib/types/Blocks';
import query from './connection';

export const getDbBlocks = async (dbFile: ArrayBuffer): Promise<BlockContent[]> => {
	const blocks: BlockContent[] = [];

	const tables = await getTables(dbFile);
	if (!tables) {
		return blocks;
	}

	for (let i = 0; i < tables.length; i++) {
		blocks.push({
			id: `${tables[i]}-t-${Math.round(Math.random() * 1000)}`,
			name: tables[i],
			type: BlockTypes.table,
		});
		const columns = await getColumns(dbFile, tables[i]);
		if (!columns) {
			break;
		}
		for (let j = 0; j < columns.length; j++) {
			blocks.push({
				id: `${columns[j]}-c-${Math.round(Math.random() * 1000)}`,
				name: columns[j],
				type: BlockTypes.column,
			});
		}
	}

	return blocks;
};

export const getTables = async (dbFile: ArrayBuffer): Promise<string[] | undefined> => {
	const queryString = "SELECT name FROM sqlite_master WHERE type = 'table'";

	const result = await query(dbFile, queryString);
	if (result) {
		const tableNames = result.rows.map((name) => name[0]);
		return tableNames;
	}
};

export const getColumns = async (dbFile: ArrayBuffer, tableName: string): Promise<string[] | undefined> => {
	const queryString = `SELECT * FROM ${tableName} LIMIT 0`;

	const result = await query(dbFile, queryString);
	if (result) {
		const columns = result.columns;
		return columns;
	}
};
