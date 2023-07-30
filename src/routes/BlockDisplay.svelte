<script lang="ts">
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let blocks: BlockContent[];
</script>

<div class="keywords_holder">
    {#each blocks as block}
        <Block content={block} />
        {#if block.columns}
            {#each block.columns as column}
                <Block content={column} />
            {/each}
        {/if}
    {/each}
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
