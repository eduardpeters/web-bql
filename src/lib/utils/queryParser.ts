import type { BlockContent } from "$lib/appTypes";

/*
Only block type that requires special handling is the symbol type
It is currently easier to have each non-symbol append a space before
and each symbol not to to avoid separating digits for example
*/
const parse = (queryElements: BlockContent[]): string => {
    if (queryElements.length < 1) return '';
    let queryString = queryElements[0].name;
    for (let i = 1; i < queryElements.length; i++) {
        if (queryElements[i].type !== 'symbol') {
            queryString += ' ';
        }
        queryString += queryElements[i].name;
    }
    return queryString;
}

export default parse;
