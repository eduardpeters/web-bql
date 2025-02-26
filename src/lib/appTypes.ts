export type Dictionary<T> = { [key: string]: T };

export enum BlockTypes {
	keyword = "KEYWORD'",
	column = "COLUMN'",
	table = 'TABLE',
	symbol = 'SYMBOL',
	number = 'NUMBER',
}

export type BlockContent = {
	id: string;
	name: string;
	type: BlockTypes;
};

export type QueryResult = {
	columns: string[];
	rows: string[];
};
