<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";

    import { tablesAndColumns } from "$lib/stores/dbStore";
    import { keywords } from "$lib/keywords/keywords";
    import { symbols } from "$lib/keywords/symbols";

    enum BlockOptions {
        Keywords,
        TablesAndColumns,
        Symbols,
    }

    let blocksToDisplay = keywords;
    let blocksSelected = BlockOptions.Keywords;

    $: {
        if (
            $tablesAndColumns &&
            blocksSelected === BlockOptions.TablesAndColumns
        )
            blocksToDisplay = $tablesAndColumns;
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
        <button on:click={() => handleSelection(BlockOptions.Keywords)}>
            SQL Keywords
        </button>
        <button on:click={() => handleSelection(BlockOptions.TablesAndColumns)}>
            Tables and Columns
        </button>
        <button on:click={() => handleSelection(BlockOptions.Symbols)}>
            Numbers and Symbols
        </button>
    </div>
    <BlockDisplay blocks={blocksToDisplay} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
