import { writable } from 'svelte/store';
import type { BlockContent } from '$lib/types/Blocks';

export const dbFile = writable<ArrayBuffer | null>(null);

export const tablesAndColumns = writable<BlockContent[]>();
