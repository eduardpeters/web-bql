<script lang="ts">
	import BlockDisplay from './BlockDisplay.svelte';

	import { tablesAndColumns } from '$lib/stores/dbStore';
	import { keywords } from '$lib/keywords/keywords';
	import { symbols } from '$lib/keywords/symbols';

	enum BlockOptions {
		Keywords,
		TablesAndColumns,
		Symbols,
	}

	let blocksToDisplay = keywords;
	let blocksSelected = BlockOptions.Keywords;

	$: {
		if ($tablesAndColumns && blocksSelected === BlockOptions.TablesAndColumns) blocksToDisplay = $tablesAndColumns;
	}

	const handleSelection = (selection: BlockOptions) => {
		blocksSelected = selection;
		if (blocksSelected === BlockOptions.Keywords) {
			blocksToDisplay = keywords;
		} else if (blocksSelected === BlockOptions.TablesAndColumns) {
			blocksToDisplay = $tablesAndColumns;
		} else if (blocksSelected === BlockOptions.Symbols) {
			blocksToDisplay = symbols;
		}
	};
</script>

<div class="container">
	<div class="selection_controls">
		<button
			class="option"
			class:selected={blocksSelected === BlockOptions.Keywords}
			on:click={() => handleSelection(BlockOptions.Keywords)}
		>
			SQL Keywords
		</button>
		<button
			class="option"
			class:selected={blocksSelected === BlockOptions.TablesAndColumns}
			on:click={() => handleSelection(BlockOptions.TablesAndColumns)}
		>
			Tables and Columns
		</button>
		<button
			class="option"
			class:selected={blocksSelected === BlockOptions.Symbols}
			on:click={() => handleSelection(BlockOptions.Symbols)}
		>
			Numbers and Symbols
		</button>
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
