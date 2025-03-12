import type { BlockContent } from '$lib/types/Blocks';

interface dbState {
	dbFile: ArrayBuffer | null;
	tablesAndColumns: BlockContent[];
}

export const dbState = $state<dbState>({
	dbFile: null,
	tablesAndColumns: [],
});
