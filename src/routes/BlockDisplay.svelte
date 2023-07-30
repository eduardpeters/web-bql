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
        align-items: center;
        border: 1px solid #051923;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 5px;
        width: 95%;
    }
</style>
