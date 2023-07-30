<script lang="ts">
    import type { BlockContent } from "$lib/appTypes";
    import { tablesAndColumns } from "$lib/stores/dbStore";
    import Block from "$lib/components/Block.svelte";

    export let blocks: BlockContent[];
</script>

<div class="keywords_holder">
    {#each blocks as block}
        <Block content={block} />
    {/each}
    {#if $tablesAndColumns}
        {#each $tablesAndColumns as table}
            <Block content={table} />
            {#each table.columns as column}
                <Block content={column} />
            {/each}
        {/each}
    {/if}
</div>

<style>
    .keywords_holder {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        border: 1px solid black;
        padding: 5px;
    }
</style>
