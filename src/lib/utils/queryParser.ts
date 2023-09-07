import type { BlockContent } from "$lib/appTypes";

const T_SYMBOL = 'symbol';
const T_NUMBER = 'number';
/*
Block types that require special handling are symbol and numbers
It is currently easier to have each non-symbol, non-number append a space before
and the symbol or number not to to avoid separating digits or operators for example
*/

const queryParser = (queryElements: BlockContent[]): string => {
    if (queryElements.length < 1) return '';
    let queryString = queryElements[0].name;
    for (let i = 1; i < queryElements.length; i++) {
        if (
            (queryElements[i].type !== queryElements[i - 1].type)
            || (queryElements[i].type !== T_SYMBOL && queryElements[i].type !== T_NUMBER)
            || (queryElements[i - 1].type !== T_SYMBOL && queryElements[i - 1].type !== T_NUMBER)
        ) {
            queryString += ' ';
        }
        queryString += queryElements[i].name;
    }
    return queryString;
}

export default queryParser;
