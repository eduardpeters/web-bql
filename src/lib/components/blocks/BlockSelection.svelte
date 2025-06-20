<script lang="ts">
	import BlockDisplay from './BlockDisplay.svelte';

	import { dbState } from '$lib/database/dbState.svelte';
	import { keywords } from '$lib/keywords/keywords';
	import { symbols } from '$lib/keywords/symbols';
	import type { BlockContent } from '$lib/types/Blocks';

	const BlockOptions = {
		Keywords: 0,
		TablesAndColumns: 1,
		Symbols: 2,
	} as const;
	type BlockOption = (typeof BlockOptions)[keyof typeof BlockOptions];

	let blocksToDisplay = $state<BlockContent[]>(keywords);
	let blocksSelected = $state<BlockOption>(BlockOptions.Keywords);

	$effect(() => {
		if (blocksSelected === BlockOptions.TablesAndColumns) {
			blocksToDisplay = dbState.tablesAndColumns;
		}
	});

	const handleSelection = (selection: BlockOption) => {
		blocksSelected = selection;
		if (blocksSelected === BlockOptions.Keywords) {
			blocksToDisplay = keywords;
		} else if (blocksSelected === BlockOptions.TablesAndColumns) {
			blocksToDisplay = dbState.tablesAndColumns;
		} else if (blocksSelected === BlockOptions.Symbols) {
			blocksToDisplay = symbols;
		}
	};
</script>

{#snippet selectionButton(title: string, isSelected: boolean, onClick: VoidFunction)}
	<button class={['option', isSelected && 'selected']} onclick={onClick}>
		{title}
	</button>
{/snippet}

<div class="container">
	<div class="selection_controls">
		{@render selectionButton('SQL Keywords', blocksSelected === BlockOptions.Keywords, () =>
			handleSelection(BlockOptions.Keywords)
		)}
		{@render selectionButton('Tables and Columns', blocksSelected === BlockOptions.TablesAndColumns, () =>
			handleSelection(BlockOptions.TablesAndColumns)
		)}
		{@render selectionButton('Numbers and Symbols', blocksSelected === BlockOptions.Symbols, () =>
			handleSelection(BlockOptions.Symbols)
		)}
	</div>
	<BlockDisplay blocks={blocksToDisplay} />
</div>

<style>
	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	.option {
		all: unset;
		background-color: #00a6fb;
		border-radius: 5px;
		box-shadow: 3px 3px 1px #006494;
		color: #eee;
		cursor: pointer;
		font-size: 0.9rem;
		padding: 10px;
	}

	.selected {
		background-color: #0582ca;
		box-shadow: none;
		transform: translateX(2px) translateY(2px);
	}

	.selection_controls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
	}
</style>
