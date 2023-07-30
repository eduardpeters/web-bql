<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";

    import { tablesAndColumns } from "$lib/stores/dbStore";
    import { keywords } from "$lib/keywords/keywords";

    let blocksToDisplay = keywords;

    const handleShowKeywords = () => {
        blocksToDisplay = keywords;
    }

    const handleShowTables = () => {
        blocksToDisplay = $tablesAndColumns;
    }
</script>

<div class="container">
    <div>
        <button on:click={handleShowKeywords}>SQL Keywords</button>
        <button on:click={handleShowTables}>Tables and Columns</button>
        <button>Numbers and Symbols</button>
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
