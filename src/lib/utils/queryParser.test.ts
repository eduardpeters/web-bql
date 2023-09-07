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
        type: "number",
    },
];

const testArrayThree = [
    ...testArrayTwo,
    {
        name: "0",
        type: "number",
    },
    {
        name: "2",
        type: "number",
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
        type: "number",
    },
    {
        name: "2",
        type: "number",
    },
    {
        name: "3",
        type: "number",
    },
    {
        name: "4",
        type: "number",
    },
    {
        name: "LIMIT",
        type: "keyword",
    },
    {
        name: "3",
        type: "number",
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
    expect(queryParser(testArrayFour)).toBe('SELECT * FROM thistable WHERE acolumn <= 1234 LIMIT 3');
});
