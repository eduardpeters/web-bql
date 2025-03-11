export const BlockTypes = {
	keyword: 'KEYWORD',
	column: 'COLUMN',
	table: 'TABLE',
	symbol: 'SYMBOL',
	number: 'NUMBER',
} as const;

export type BlockType = (typeof BlockTypes)[keyof typeof BlockTypes];

export type BlockContent = {
	id: string;
	name: string;
	type: BlockType;
};
