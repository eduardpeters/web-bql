import { expect, test } from 'vitest';
import { BlockTypes } from '$lib/appTypes';
import queryParser from './queryParser';

const testArrayOne = [
	{
		id: 'hello',
		name: 'SELECT',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: '*',
		type: BlockTypes.column,
	},
	{
		id: 'hello',
		name: 'FROM',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: 'thistable',
		type: BlockTypes.table,
	},
];

const testArrayTwo = [
	{
		id: 'hello',
		name: 'SELECT',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: 'acolumn',
		type: BlockTypes.column,
	},
	{
		id: 'hello',
		name: 'FROM',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: 'thistable',
		type: BlockTypes.table,
	},
	{
		id: 'hello',
		name: 'LIMIT',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: '5',
		type: BlockTypes.number,
	},
];

const testArrayThree = [
	...testArrayTwo,
	{
		id: 'hello',
		name: '0',
		type: BlockTypes.number,
	},
	{
		id: 'hello',
		name: '2',
		type: BlockTypes.number,
	},
];

const testArrayFour = [
	...testArrayOne,
	{
		id: 'hello',
		name: 'WHERE',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: 'acolumn',
		type: BlockTypes.column,
	},
	{
		id: 'hello',
		name: '<',
		type: BlockTypes.symbol,
	},
	{
		id: 'hello',
		name: '=',
		type: BlockTypes.symbol,
	},
	{
		id: 'hello',
		name: '1',
		type: BlockTypes.number,
	},
	{
		id: 'hello',
		name: '2',
		type: BlockTypes.number,
	},
	{
		id: 'hello',
		name: '3',
		type: BlockTypes.number,
	},
	{
		id: 'hello',
		name: '4',
		type: BlockTypes.number,
	},
	{
		id: 'hello',
		name: 'LIMIT',
		type: BlockTypes.keyword,
	},
	{
		id: 'hello',
		name: '3',
		type: BlockTypes.number,
	},
];

test('Empty array returns empty string', () => {
	expect(queryParser([])).toBe('');
});

test('Mixture of keywords, columns, tables', () => {
	expect(queryParser(testArrayOne)).toBe('SELECT * FROM thistable');
});

test('Single symbol in the mix', () => {
	expect(queryParser(testArrayTwo)).toBe('SELECT acolumn FROM thistable LIMIT 5');
});

test('Multiple symbols ', () => {
	expect(queryParser(testArrayThree)).toBe('SELECT acolumn FROM thistable LIMIT 502');
});

test('Multiple symbols and keywords mix', () => {
	expect(queryParser(testArrayFour)).toBe('SELECT * FROM thistable WHERE acolumn <= 1234 LIMIT 3');
});
