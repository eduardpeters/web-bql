export type Dictionary<T> = { [key: string]: T };

export type BlockContent = {
    id: string,
    name: string;
    type: string;
};

export type QueryResult = {
    columns: string[];
    rows: string[];
}
