import { writable } from 'svelte/store';

export const dbFile = writable<ArrayBuffer | null>(null);

export const tablesAndColumns = writable<any>(null);
