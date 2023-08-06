import { expect, test } from 'vitest';
import queryParser from './queryParser';

const testArrayOne = [
    {
        name: "SELECT",
        type: "keyword",
    },
    {
        name: "*",
        type: "column",
    },
    {
        name: "FROM",
        type: "keyword",
    },
    {
        name: "thistable",
        type: "table",
    },
];

const testArrayTwo = [
    {
        name: "SELECT",
        type: "keyword",
    },
    {
        name: "acolumn",
        type: "column",
    },
    {
        name: "FROM",
        type: "keyword",
    },
    {
        name: "thistable",
        type: "table",
    },
    {
        name: "LIMIT",
        type: "keyword",
    },
    {
        name: "5",
        type: "symbol",
    },
];

const testArrayThree = [
    ...testArrayTwo,
    {
        name: "0",
        type: "symbol",
    },
    {
        name: "2",
        type: "symbol",
    },
];

const testArrayFour = [
    ...testArrayOne,
    {
        name: "WHERE",
        type: "keyword",
    },
    {
        name: "acolumn",
        type: "column",
    },
    {
        name: "<",
        type: "symbol",
    },
    {
        name: "=",
        type: "symbol",
    },
    {
        name: "1",
        type: "symbol",
    },
    {
        name: "2",
        type: "symbol",
    },
    {
        name: "3",
        type: "symbol",
    },
    {
        name: "4",
        type: "symbol",
    },
    {
        name: "LIMIT",
        type: "keyword",
    },
    {
        name: "3",
        type: "symbol",
    },
]

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
    expect(queryParser(testArrayFour)).toBe('SELECT * FROM thistable WHERE acolumn <=1234 LIMIT 3');
});
